from flask import jsonify, make_response, request
from flask_restful import Resource, reqparse

from database.config import discount, ticket_price
from database.database import db
from database.models import TicketModel, SeanceModel, MovieModel, HallModel, SeatModel
from database.schemas import TicketSchema
from handlers.employee_handlers import login_required
from handlers.messages import ApiMessages
from handlers.utilities import prepare_and_run_query


class TicketData(Resource):
    @login_required
    def get(self):
        args = self._parse_args()
        if None in [args["movie"], args["hall"], args["time"], args["date"]]:
            return make_response(jsonify({'message': ApiMessages.QUERY_PARAMS_NOT_PROVIDED.value}), 400)
        query = TicketModel.query.join(SeatModel).join(SeanceModel).join(HallModel).join(MovieModel).filter(
            MovieModel.title == args["movie"]).filter(SeanceModel.date == args["date"]).filter(
            SeanceModel.time == args["time"]).filter(HallModel.name == args["hall"])
        if args["filterRow"] is not None:
            query = query.filter(SeatModel.row == args["filterRow"])
        if args["filterNumber"] is not None:
            query = query.filter(SeatModel.number == args["filterNumber"])
        tickets, count = prepare_and_run_query(query, args={"row": "", "number": "", "price": ""})
        output = []
        for ticket in tickets:
            output_elem = TicketSchema().dump(ticket)
            output_elem.update(row=ticket.seat.row, number=ticket.seat.number)
            output.append(output_elem)
        return make_response(jsonify({'data': output, 'count': count}), 200)

    @login_required
    def post(self):
        data = request.get_json()
        request_tickets = data["tickets"]
        new_tickets = []
        for request_ticket in request_tickets:
            price = ticket_price
            if request_ticket["discount"]:
                price = price - price * discount
            ticket = TicketModel(price=round(price, 2), seatId=request_ticket["seatId"],
                                 seanceId=request_ticket["seanceId"])
            old_tickets = TicketModel.query.filter(
                (TicketModel.seanceId == ticket.seanceId) & (TicketModel.seatId == ticket.seatId)).all()
            if old_tickets:
                return make_response(jsonify({'message': ApiMessages.TICKET_ALREADY_EXIST.value}), 400)
            db.session.add(ticket)
            new_tickets.append(ticket)
        db.session.commit()
        for seance in set([ticket.seance for ticket in new_tickets]):
            count = TicketModel.query.filter(TicketModel.seanceId == seance.seanceId).count()
            seance.ticketsSold = count
        db.session.commit()
        total_price = sum([ticket.price for ticket in new_tickets])
        output = TicketSchema(many=True).dump(new_tickets)
        return make_response(jsonify({'totalPrice': total_price, 'data': output}))

    @login_required
    def delete(self):
        args = self._parse_args()
        if args['ticketId'] is None:
            return make_response(jsonify({'message': ApiMessages.ID_NOT_PROVIDED.value}), 400)
        ticket = TicketModel.query.get(args['ticketId'])
        if ticket is None:
            return make_response(jsonify({"message": ApiMessages.RECORD_NOT_FOUND.value}), 404)
        seance = ticket.seance
        seance.ticketsSold = seance.ticketsSold - 1
        db.session.delete(ticket)
        db.session.commit()
        output = TicketSchema().dump(ticket)
        return make_response(jsonify({'data': output}), 200)

    def _parse_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('ticketId')
        parser.add_argument('movie')
        parser.add_argument('date')
        parser.add_argument('time')
        parser.add_argument('hall')
        parser.add_argument('filterRow', type=int, ignore=True)
        parser.add_argument('filterNumber', type=int, ignore=True)
        return parser.parse_args()

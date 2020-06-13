from flask import jsonify, make_response, request
from flask_restful import Resource, reqparse

from database.config import discount, ticket_price
from database.database import db
from database.models import TicketModel
from database.schemas import TicketSchema
from handlers.employee_handlers import login_required
from handlers.messages import ApiMessages


class TicketData(Resource):
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
        db.session.delete(ticket)
        db.session.commit()
        output = TicketSchema().dump(ticket)
        return make_response(jsonify({'data': output}), 200)

    def _parse_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('ticketId')
        return parser.parse_args()

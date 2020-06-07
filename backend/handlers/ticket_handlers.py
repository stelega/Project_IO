from flask import jsonify, make_response
from flask_restful import Resource, reqparse

from database.database import db
from database.models import TicketModel
from database.schemas import TicketSchema
from handlers.employee_handlers import login_required


class TicketData(Resource):
    @login_required
    def post(self):
        args = self._parse_ticket_args()
        del args['ticketId']
        ticket = TicketModel(**args)
        old_tickets = TicketModel.query.filter((TicketModel.seanceId == ticket.seanceId) & (TicketModel.seatId == ticket.seatId)).all()
        if old_tickets:
            return make_response(jsonify({'message': "Ticket for given seance and seat already exists"}), 400)
        db.session.add(ticket)
        db.session.commit()
        output = TicketSchema().dump(ticket)
        seance = ticket.seance
        seance.ticketsSold += 1
        db.session.commit()
        return make_response(jsonify({'data': output}), 201)

    def _parse_ticket_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('ticketId')
        parser.add_argument('price', type=float)
        parser.add_argument('discount', type=float)
        parser.add_argument('seatId')
        parser.add_argument('seanceId')
        return parser.parse_args()

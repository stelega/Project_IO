from flask import jsonify, make_response
from flask_restful import Resource, reqparse

from database.database import db
from database.models import TicketModel
from database.schemas import TicketSchema
from .employee_handlers import login_required


class TicketData(Resource):
    @login_required
    def post(self):
        args = self._parse_ticket_args()
        del args['ticketId']
        ticket = TicketModel(**args)
        db.session.add(ticket)
        db.session.commit()
        output = TicketSchema().dump(ticket)
        return make_response(jsonify({'data': output}), 201)

    def _parse_ticket_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('ticketId')
        parser.add_argument('price', type=float)
        parser.add_argument('discount', type=float)
        parser.add_argument('seatId')
        parser.add_argument('seanceId')
        return parser.parse_args()

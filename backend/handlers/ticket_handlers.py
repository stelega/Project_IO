from flask_restful import Resource, reqparse
from flask import jsonify, make_response

from database.models import TicketModel
from database.schemas import TicketSchema
from handlers.messages import ApiMessages
from database.database import db
from .utilities import prepare_and_run_query


class TicketData(Resource):

    def post(self):
        args = self._parse_ticket_args()
        del args['ticket_id']
        ticket = TicketModel(**args)
        db.session.add(ticket)
        db.session.commit()
        output = TicketSchema().dump(ticket)
        return make_response(jsonify({'data': output}), 201)

    def _parse_ticket_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('ticket_id')
        parser.add_argument('price', type=float)
        parser.add_argument('discount', type=float)
        parser.add_argument('seat_id')
        parser.add_argument('seance_id')
        return parser.parse_args()

from flask import jsonify, make_response, request
from flask_restful import Resource, reqparse

from database.database import db
from database.models import TicketModel
from database.schemas import TicketSchema
from database.config import discount, ticket_price
from handlers.employee_handlers import login_required


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
                return make_response(jsonify({'message': "Ticket for given seance and seat already exists"}), 400)
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

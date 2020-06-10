from datetime import datetime

from flask import jsonify, make_response
from flask_restful import Resource, reqparse, inputs

from database.database import db
from database.models import HallModel, SeatModel, SeanceModel, TicketModel
from database.schemas import HallSchema
from handlers.employee_handlers import admin_required
from handlers.messages import ApiMessages
from handlers.utilities import prepare_and_run_query


class HallData(Resource):
    @admin_required
    def get(self):
        args = self._parse_hall_args()
        if args['hallId'] is not None:
            hall = HallModel.query.filter(HallModel.hallId == args['hallId']).all()
            count = len(hall)
            if not count:
                return make_response(jsonify({'message': ApiMessages.RECORD_NOT_FOUND.value}), 404)
            output = HallSchema(many=True).dump(hall)
        else:
            try:
                query = self._search_halls_query(HallModel.query)
                halls, count = prepare_and_run_query(query, args)
                output = HallSchema(many=True).dump(halls)
            except ValueError as err:
                return make_response(jsonify({'message': str(err)}), 404)
        if output is not None:
            return make_response(jsonify({'data': output, 'count': count}), 200)
        else:
            return make_response(jsonify({"message": ApiMessages.INTERNAL.value}), 500)

    @admin_required
    def post(self):
        args = self._parse_hall_args()
        del args['hallId']
        if args['name'] is None:
            return make_response(jsonify({'message': ApiMessages.HALL_NEEDS_NAME}), 400)
        hall = HallModel.query.filter_by(name=args['name']).first()
        if hall is not None:
            return make_response(jsonify({'message': ApiMessages.HALL_EXISTS.value + args['name']}), 400)
        hall = HallModel(**args)
        db.session.add(hall)
        db.session.commit()
        self._create_halls_seats(hall)
        output = HallSchema().dump(hall)
        return make_response(jsonify({'data': output}), 201)

    @admin_required
    def put(self):
        args = self._parse_hall_args()
        if args['hallId'] is not None:
            if args['name'] is not None:
                hall = HallModel.query.filter(
                    (HallModel.hallId != args['hallId']) & (HallModel.name == args['name'])).all()
                if hall:
                    return make_response(
                        jsonify({'message': ApiMessages.HALL_EXISTS.value + args['name']}),
                        400)
            remove = [k for k in args if args[k] is None]
            for k in remove:
                del args[k]
            query = HallModel.query.filter_by(hallId=args['hallId'])
            old_hall = query.all()
            if old_hall:
                old_rows = old_hall[0].rows
                old_per_row = old_hall[0].seatsPerRow
                if not self._adjust_seats(args["hallId"], old_rows, old_per_row, args["rows"], args["seatsPerRow"]):
                    return make_response(jsonify(
                        {'message': ApiMessages.CANNOT_REMOVE_SEATS.value}),
                        400)
                query.update(args)
                db.session.commit()
                hall = HallModel.query.get(args['hallId'])
                hall.numOfSeats = hall.rows * hall.seatsPerRow
                db.session.commit()
                output = HallSchema().dump(hall)
                return make_response(jsonify({'data': output}), 200)
            else:
                return make_response(jsonify({"message": ApiMessages.RECORD_NOT_FOUND.value}), 500)
        else:
            return make_response(jsonify({'message': ApiMessages.ID_NOT_PROVIDED.value}), 400)

    @admin_required
    def delete(self):
        args = self._parse_hall_args()
        if args['hallId'] is not None:
            hall = HallModel.query.get(args['hallId'])
            if hall is None:
                return make_response(jsonify({'message': ApiMessages.RECORD_NOT_FOUND.value}), 404)
            seances = SeanceModel.query.filter(SeanceModel.hallId == hall.hallId).filter(
                SeanceModel.date >= datetime.now().date()).all()
            if seances:
                return make_response(jsonify({'message': ApiMessages.CANNOT_REMOVE_HALL.value}), 400)
            db.session.delete(hall)
            db.session.commit()
            output = HallSchema().dump(hall)
            return make_response(jsonify({'data': output}), 200)
        else:
            return make_response(jsonify({'message': ApiMessages.ID_NOT_PROVIDED.value}), 404)

    def _parse_hall_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('hallId')
        parser.add_argument('name')
        parser.add_argument('rows', type=int)
        parser.add_argument('seatsPerRow', type=int)
        parser.add_argument('availability', type=inputs.boolean)
        parser.add_argument('numOfSeats', type=int)
        return parser.parse_args()

    def _search_halls_query(self, query):
        parser = reqparse.RequestParser()
        parser.add_argument('search')
        args = parser.parse_args()
        if args['search'] is not None:
            query = query.filter(HallModel.name.ilike('%{}%'.format(args['search'])))
        return query

    def _create_halls_seats(self, hall):
        seats = []
        for row in range(hall.rows):
            for number in range(hall.seatsPerRow):
                seats.append(SeatModel(number=number, row=row, hallId=hall.hallId))
        db.session.add_all(seats)
        db.session.commit()

    def _adjust_seats(self, hall_id, old_rows, old_per_row, new_rows, new_per_row):
        today = datetime.now().date()
        has_tickets = len(TicketModel.query.join(SeanceModel).filter(SeanceModel.date >= today).filter(
            SeanceModel.hallId == hall_id).all()) != 0
        if old_rows == new_rows and old_per_row == new_per_row:
            return True
        elif has_tickets and (new_rows < old_rows or new_per_row < old_per_row):
            return False
        elif (not has_tickets) and (new_rows < old_rows or new_per_row < old_per_row):
            deleted_count = SeatModel.query.filter(SeatModel.hallId == hall_id).delete()
            seats = []
            for row in range(new_rows):
                for number in range(new_per_row):
                    seats.append(SeatModel(number=number, row=row, hallId=hall_id))
            db.session.add_all(seats)
            db.session.commit()
            return True
        elif new_rows > old_rows or new_per_row > old_per_row:
            seats = []
            for row in range(old_rows):
                for number in range(old_per_row, new_per_row):
                    seats.append(SeatModel(number=number, row=row, hallId=hall_id))
            for row in range(old_rows, new_rows):
                for number in range(new_per_row):
                    seats.append(SeatModel(number=number, row=row, hallId=hall_id))
            db.session.add_all(seats)
            db.session.commit()
            return True

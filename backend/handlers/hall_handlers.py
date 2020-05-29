from flask_restful import Resource, reqparse
from flask import jsonify, make_response

from database.models import HallModel, SeatModel
from database.schemas import HallSchema
from handlers.messages import ApiMessages
from database.database import db
from .utilities import prepare_and_run_query


class HallData(Resource):
    def get(self):
        args = self._parse_hall_args()
        if args['hallId'] is not None:
            hall = HallModel.query.get(args['hallId'])
            if hall is None:
                return make_response(jsonify({'message': ApiMessages.RECORD_NOT_FOUND.value}), 404)
            count = 1
            output = HallSchema().dump(hall)
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

    def post(self):
        args = self._parse_hall_args()
        del args['hallId']
        if args['name'] is None:
            return make_response(jsonify({'message': "Name of hall must be specified"}), 404)
        hall = HallModel.query.filter_by(name=args['name']).first()
        if hall is not None:
            return make_response(jsonify({'message': "Hall with name '{}' already exists".format(args['name'])}), 404)
        hall = HallModel(**args)
        db.session.add(hall)
        db.session.commit()
        self._create_halls_seats(hall)
        output = HallSchema().dump(hall)
        return make_response(jsonify({'data': output}), 201)

    def put(self):
        args = self._parse_hall_args()
        if args['hallId'] is not None:
            if args['name'] is not None:
                hall = HallModel.query.filter_by(name=args['name']).first()
                if hall is not None:
                    return make_response(
                        jsonify({'message': "Hall with name '{}' already exists".format(args['name'])}),
                        404)
            remove = [k for k in args if args[k] is None]
            for k in remove:
                del args[k]
            hall = HallModel.query.filter_by(hallId=args['hallId']).update(args)
            if hall == 1:
                db.session.commit()
                hall = HallModel.query.get(args['hallId'])
                output = HallSchema().dump(hall)
                return make_response(jsonify({'data': output}), 200)
            else:
                return make_response(jsonify({"message": ApiMessages.RECORD_NOT_FOUND.value}), 500)
        else:
            return make_response(jsonify({'message': ApiMessages.ID_NOT_PROVIDED.value}), 404)

    def delete(self):
        args = self._parse_hall_args()
        if args['hallId'] is not None:
            hall = HallModel.query.get(args['hallId'])
            if hall is None:
                return make_response(jsonify({'message': ApiMessages.RECORD_NOT_FOUND.value}), 404)
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
        parser.add_argument('availability', type=bool)
        return parser.parse_args()

    def _search_halls_query(self, query):
        parser = reqparse.RequestParser()
        parser.add_argument('searchInName')
        args = parser.parse_args()
        if args['searchInName'] is not None:
            query = query.filter(HallModel.name.ilike('%{}%'.format(args['searchInName'])))
        return query

    def _create_halls_seats(self, hall):
        seats = []
        for row in range(hall.rows):
            for number in range(hall.seatsPerRow):
                seats.append(SeatModel(number=number, row=row, hallId=hall.hallId))
        db.session.add_all(seats)
        db.session.commit()

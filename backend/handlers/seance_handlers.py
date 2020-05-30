from flask_restful import Resource, reqparse
from flask import jsonify, make_response

from database.models import SeanceModel, MovieModel, HallModel
from database.schemas import SeanceSchema
from handlers.employee_handlers import login_required
from handlers.messages import ApiMessages
from database.database import db
from handlers.utilities import prepare_and_run_query


class SeanceData(Resource):
    def get(self):
        args = self._parse_seance_args()
        if args['seanceId'] is not None:
            seance = SeanceModel.query.get(args['seanceId'])
            if seance is None:
                return make_response(jsonify({'message': ApiMessages.RECORD_NOT_FOUND.value}), 404)
            count = 1
            output = SeanceSchema().dump(seance)
        else:
            try:
                query = self._search_seances_query(SeanceModel.query.join(MovieModel).join(HallModel))
                args['name'] = args['title'] = ''
                seances, count = prepare_and_run_query(query, args)
                output = SeanceSchema(many=True).dump(seances)
            except ValueError as err:
                return make_response(jsonify({'message': str(err)}), 404)
        if output is not None:
            return make_response(jsonify({'data': output, 'count': count}), 200)
        else:
            return make_response(jsonify({"message": ApiMessages.INTERNAL.value}), 500)

    @login_required
    def post(self):
        args = self._parse_seance_args()
        del args['seanceId']
        seance = SeanceModel(**args)
        db.session.add(seance)
        db.session.commit()
        output = SeanceSchema().dump(seance)
        return make_response(jsonify({'data': output}), 201)

    @login_required
    def put(self):
        args = self._parse_seance_args()
        if args['seanceId'] is not None:
            remove = [k for k in args if args[k] is None]
            for k in remove:
                del args[k]
            seance = SeanceModel.query.filter_by(seanceId=args['seanceId']).update(args)
            if seance == 1:
                db.session.commit()
                seance = SeanceModel.query.get(args['seanceId'])
                output = SeanceSchema().dump(seance)
                return make_response(jsonify({'data': output}), 200)
            else:
                return make_response(jsonify({"message": ApiMessages.RECORD_NOT_FOUND.value}), 500)
        else:
            return make_response(jsonify({'message': ApiMessages.ID_NOT_PROVIDED.value}), 404)

    @login_required
    def delete(self):
        args = self._parse_seance_args()
        if args['seanceId'] is not None:
            seance = SeanceModel.query.get(args['seanceId'])
            output = SeanceSchema().dump(seance)
            db.session.delete(seance)
            db.session.commit()
            return make_response(jsonify({'data': output}), 200)
        else:
            return make_response(jsonify({'message': ApiMessages.ID_NOT_PROVIDED.value}), 404)

    def _parse_seance_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('seanceId')
        parser.add_argument('time')
        parser.add_argument('date')
        parser.add_argument('hallId')
        parser.add_argument('movieId')
        parser.add_argument('ticketsSold', type=int)
        return parser.parse_args()

    def _search_seances_query(self, query):
        parser = reqparse.RequestParser()
        parser.add_argument('search')
        args = parser.parse_args()
        if args['search'] is not None:
            query = query.filter(MovieModel.title.ilike('%{}%'.format(args['search'])))
        return query

from flask_restful import Resource, reqparse
from flask import jsonify, make_response

from database.models import SeanceModel, MovieModel, HallModel
from database.schemas import SeanceSchema
from handlers.messages import ApiMessages
from database.database import db
from .utilities import prepare_and_run_query


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

    def post(self):
        args = self._parse_seance_args()
        del args['seanceId']
        seance = SeanceModel(**args)
        db.session.add(seance)
        db.session.commit()
        output = SeanceSchema().dump(seance)
        return make_response(jsonify({'data': output}), 201)

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
        parser.add_argument('searchInTitle')
        args = parser.parse_args()
        if args['searchInTitle'] is not None:
            query = query.join(MovieModel).filter(MovieModel.title.ilike('%{}%'.format(args['searchInTitle'])))
        return query

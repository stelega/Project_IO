from flask_restful import Resource, reqparse
from flask import jsonify, make_response

from database.models import MovieModel
from database.schemas import MovieSchema
from handlers.messages import ApiMessages
from database.database import db
from .utilities import prepare_and_run_query


class MovieData(Resource):
    def get(self):
        args = self._parse_movie_args()
        if args['movieId'] is not None:
            movie = MovieModel.query.get(args['movieId'])
            if movie is None:
                return make_response(jsonify({'message': ApiMessages.RECORD_NOT_FOUND.value}), 404)
            count = 1
            output = MovieSchema().dump(movie)
        else:
            try:
                query = self._search_movies_query(MovieModel.query)
                movies, count = prepare_and_run_query(query, args)
                output = MovieSchema(many=True).dump(movies)
            except ValueError as err:
                return make_response(jsonify({'message': str(err)}), 404)
        if output is not None:
            return make_response(jsonify({'data': output, 'count': count}), 200)
        else:
            return make_response(jsonify({"message": ApiMessages.INTERNAL.value}), 500)

    def post(self):
        args = self._parse_movie_args()
        del args['movieId']
        movie = MovieModel(**args)
        db.session.add(movie)
        db.session.commit()
        output = MovieSchema().dump(movie)
        return make_response(jsonify({'data': output}), 201)

    def put(self):
        args = self._parse_movie_args()
        if args['movieId'] is not None:
            remove = [k for k in args if args[k] is None]
            for k in remove:
                del args[k]
            movie = MovieModel.query.filter_by(movieId=args['movieId']).update(args)
            if movie == 1:
                db.session.commit()
                movie = MovieModel.query.get(args['movieId'])
                output = MovieSchema().dump(movie)
                return make_response(jsonify({'data': output}), 200)
            else:
                return make_response(jsonify({"message": ApiMessages.RECORD_NOT_FOUND.value}), 500)
        else:
            return make_response(jsonify({'message': ApiMessages.ID_NOT_PROVIDED.value}), 404)

    def delete(self):
        args = self._parse_movie_args()
        if args['movieId'] is not None:
            movie = MovieModel.query.get(args['movieId'])
            db.session.delete(movie)
            db.session.commit()
            output = MovieSchema().dump(movie)
            return make_response(jsonify({'data': output}), 200)
        else:
            return make_response(jsonify({'message': ApiMessages.ID_NOT_PROVIDED.value}), 404)

    def _parse_movie_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('movieId')
        parser.add_argument('title')
        parser.add_argument('director')
        parser.add_argument('releaseDate')
        parser.add_argument('closeDate')
        parser.add_argument('ageCategory')
        parser.add_argument('movieCategory')
        parser.add_argument('duration', type=int)
        return parser.parse_args()

    def _search_movies_query(self, query):
        parser = reqparse.RequestParser()
        parser.add_argument('searchInTitle')
        args = parser.parse_args()
        if args['searchInTitle'] is not None:
            query = query.filter(MovieModel.title.ilike('%{}%'.format(args['searchInTitle'])))
        return query

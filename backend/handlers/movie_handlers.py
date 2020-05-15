from flask_restful import Resource, reqparse
from flask import jsonify, make_response

from database.models import MovieModel
from database.schemas import MovieSchema
from handlers.messages import ApiMessages

from database.database import db


class MovieData(Resource):
    def get(self):
        args = _parse_movie_args()
        if args['movie_id'] is not None:
            movie = MovieModel.query.get(args['movie_id'])
            if movie is None:
                return make_response(jsonify({'error': 'Record not found'}), 404)
            output = MovieSchema().dump(movie)
        else:
            movies = MovieModel.query.all()
            output = MovieSchema(many=True).dump(movies)
        if output:
            return make_response(jsonify({'data': output}), 200)
        else:
            return make_response(jsonify({"error": 'Internal error'}), 500)

    def post(self):
        args = _parse_movie_args()
        del args['movie_id']
        movie = MovieModel(**args)
        db.session.add(movie)
        db.session.commit()
        output = MovieSchema().dump(movie)
        return make_response(jsonify({'data': output}), 201)

    def put(self):
        args = _parse_movie_args()
        if args['movie_id'] is not None:
            remove = [k for k in args if args[k] is None]
            for k in remove:
                del args[k]
            movie = MovieModel.query.filter_by(movie_id=args['movie_id']).update(args)
            db.session.commit()
            if movie == 1:
                movie = MovieModel.query.get(args['movie_id'])
                output = MovieSchema().dump(movie)
                return make_response(jsonify({'data': output}), 200)
            else:
                return make_response(jsonify({"error": ApiMessages.INTERNAL.value}), 500)
        else:
            return make_response(jsonify({'error': ApiMessages.RECORD_NOT_FOUND.value}), 404)

    def delete(self):
        args = _parse_movie_args()
        if args['movie_id'] is not None:
            movie = MovieModel.query.get(args['movie_id'])
            db.session.delete(movie)
            db.session.commit()
            output = MovieSchema().dump(movie)
            return make_response(jsonify({'data': output}), 200)
        else:
            return make_response(jsonify({'error': ApiMessages.RECORD_NOT_FOUND.value}), 404)


def _parse_movie_args():
    parser = reqparse.RequestParser()
    parser.add_argument('movie_id', type=int)
    parser.add_argument('title')
    parser.add_argument('director')
    parser.add_argument('release_date')
    parser.add_argument('age_category')
    parser.add_argument('movie_category')
    parser.add_argument('availability', type=bool)
    parser.add_argument('duration', type=int)
    return parser.parse_args()

from datetime import datetime

from flask import jsonify, make_response
from flask_restful import Resource, reqparse

from database.database import db
from database.models import MovieModel, SeanceModel, AgeCategoryModel, GenreModel
from database.schemas import MovieSchema
from handlers.employee_handlers import admin_required, login_required
from handlers.messages import ApiMessages
from handlers.utilities import prepare_and_run_query


class MovieData(Resource):
    @admin_required
    def get(self):
        args = self._parse_movie_args()
        if args['movieId'] is not None:
            movie = MovieModel.query.filter(MovieModel.movieId == args['movieId']).all()
            count = len(movie)
            if not count:
                return make_response(jsonify({'message': ApiMessages.RECORD_NOT_FOUND.value}), 404)
            output = MovieSchema(many=True).dump(movie)
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

    @admin_required
    def post(self):
        args = self._parse_movie_args()
        del args['movieId']
        movie = MovieModel(**args)
        db.session.add(movie)
        db.session.commit()
        output = MovieSchema().dump(movie)
        return make_response(jsonify({'data': output}), 201)

    @admin_required
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
                return make_response(jsonify({"message": ApiMessages.RECORD_NOT_FOUND.value}), 400)
        else:
            return make_response(jsonify({'message': ApiMessages.ID_NOT_PROVIDED.value}), 400)

    @admin_required
    def delete(self):
        args = self._parse_movie_args()
        if args['movieId'] is not None:
            movie = MovieModel.query.get(args['movieId'])
            if movie is None:
                return make_response(jsonify({'message': ApiMessages.RECORD_NOT_FOUND.value}), 404)
            seances = SeanceModel.query.filter(SeanceModel.movieId == args['movieId']).filter(
                SeanceModel.date >= datetime.now().date()).all()
            if seances:
                return make_response(jsonify({'message': ApiMessages.CANNOT_REMOVE_MOVIE_WITH_FUTURE_SEANCES}), 400)
            db.session.delete(movie)
            db.session.commit()
            output = MovieSchema().dump(movie)
            return make_response(jsonify({'data': output}), 200)
        else:
            return make_response(jsonify({'message': ApiMessages.ID_NOT_PROVIDED.value}), 400)

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
        parser.add_argument('search')
        args = parser.parse_args()
        if args['search'] is not None:
            query = query.filter(MovieModel.title.ilike('%{}%'.format(args['search'])))
        return query


class AvailableMoviesData(Resource):
    @login_required
    def get(self):
        args = self._parse_args()
        chosen_date = datetime.strptime(args["date"], "%Y-%m-%d").date()
        available_movies = MovieModel.query.filter(MovieModel.releaseDate <= chosen_date).filter(
            MovieModel.closeDate >= chosen_date).all()
        output = [{
            "movieId": movie.movieId,
            "title": movie.title
        } for movie in available_movies]
        return make_response(jsonify({"data": output}), 200)

    def _parse_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('date')
        return parser.parse_args()


class FutureMoviesData(Resource):
    @login_required
    def get(self):
        today = datetime.now().date()
        movies = MovieModel.query.filter(MovieModel.closeDate >= today).all()
        output = MovieSchema(many=True).dump(movies)
        return make_response(jsonify({"data": output}), 200)


class FutureMoviesWithSeancesTitles(Resource):
    @login_required
    def get(self):
        today = datetime.now().date()
        movies = MovieModel.query.join(SeanceModel).filter(MovieModel.closeDate >= today).filter(
            SeanceModel.date >= today).all()
        output = list(set([movie.title for movie in movies]))
        return make_response(jsonify({"data": output}), 200)


class AgeCategoryData(Resource):
    @login_required
    def get(self):
        age_categories = [category.name for category in AgeCategoryModel.query.all()]
        count = len(age_categories)
        return make_response(jsonify({'data': age_categories, 'count': count}), 200)


class GenreData(Resource):
    @login_required
    def get(self):
        genres = [genre.name for genre in GenreModel.query.all()]
        count = len(genres)
        return make_response(jsonify({'data': genres, 'count': count}), 200)

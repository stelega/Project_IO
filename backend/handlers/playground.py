#  Plik do wykonywania roznych testowych/pomocniczych operacji na serwerze/bazie poprzez wywolanie testowego endpointa
from flask_restful import Resource, reqparse
from flask import jsonify, make_response

from database.models import MovieModel
from database.schemas import MovieSchema
from handlers.messages import ApiMessages

from database.database import db


class Playground(Resource):
    def get(self):
        for i in range(100, 150):
            movie = MovieModel(title="Test Movie {}".format(i))
            db.session.add(movie)
            db.session.commit()
        return {"message": "Koniec zabawy"}

from marshmallow import fields
from database.models import *
from database.database import ma


class SeanceSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SeanceModel


class MovieSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = MovieModel

    seances = fields.Nested(SeanceSchema, many=True)

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


class HallSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = HallModel

    seats = fields.Nested(SeanceSchema, many=True)


class SeatSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SeatModel

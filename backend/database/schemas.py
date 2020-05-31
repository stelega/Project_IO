from marshmallow import fields

from database.database import ma
from database.models import *


class TicketSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = TicketModel
        include_fk = True


class SeanceSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SeanceModel
        include_fk = True

    movie = fields.Pluck(lambda: MovieSchema, 'title')
    hall = fields.Pluck(lambda: HallSchema, 'name')


class MovieSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = MovieModel


class HallSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = HallModel


class SeatSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SeatModel


class EmployeeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = EmployeeModel
        fields = ("employeeId", "name", "surname", "login", "isAdmin")

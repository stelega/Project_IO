from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


app = Flask(__name__)
app.config[
    'SQLALCHEMY_DATABASE_URI'] = "postgresql://qxbvllvcvqymqm:f4691671a6044da4462dd817ae4ad5b9681686b7ae36cd119d7150efc44c58bb@ec2-54-247-103-43.eu-west-1.compute.amazonaws.com:5432/d85bk4b0thbo18"
db = SQLAlchemy(app)
migrate = Migrate(app, db)


class EmployeeModel(db.Model):
    __tablename__ = 'employee'

    employee_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(length=80))
    surname = db.Column(db.String(length=80))
    login = db.Column(db.String(length=80))
    password = db.Column(db.String(length=80))
    is_admin = db.Column(db.Boolean)

    def __init__(self, _id=None, name=None, surname=None, login=None, password=None, is_admin=False):
        self.id = _id or id
        self.name = name
        self.surname = surname
        self.login = login
        self.password = password
        self.is_admin = is_admin

    def __repr__(self):
        return f"<User {self.name} + {self.surname}"

class AdminModel(db.Model):
    __tablename__ = 'admin'

    admin_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(length=80))
    surname = db.Column(db.String(length=80))
    login = db.Column(db.String(length=80))
    password = db.Column(db.String(length=80))
    is_admin = db.Column(db.Boolean)

    def __init__(self, _id=None, name=None, surname=None, login=None, password=None, is_admin=True):
        self.id = _id or id
        self.name = name
        self.surname = surname
        self.login = login
        self.password = password
        self.is_admin = is_admin

    def __repr__(self):
        return f"<User {self.name} + {self.surname}"


class MovieModel(db.Model):
    __tablename__ = 'movie'

    movie_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(length=120))
    director = db.Column(db.String(length=80))
    release_date = db.Column(db.Date)
    age_category = db.Column(db.String(length=40))
    movie_category = db.Column(db.String(length=80))
    availability = db.Column(db.Boolean)
    duration = db.Column(db.Integer)
    seances = db.relationship("SeanceModel", backref="movie")

    def __init__(self, _id=None, title=None, director=None, release_date=None,
                 age_category=None, movie_category=None, availability=True, duration=None):
        self.id = _id or id
        self.title = title
        self.director = director
        self.release_date = release_date
        self.age_category = age_category
        self.movie_category = movie_category
        self.availability = availability
        self.duration = duration


class HallModel(db.Model):
    __tablename__ = 'hall'

    hall_id = db.Column(db.Integer, primary_key=True)
    num_of_seats = db.Column(db.Integer)
    rows = db.Column(db.Integer)
    availability = db.Column(db.Boolean)

    seances = db.relationship("SeanceModel", backref="hall")
    seats = db.relationship("SeatModel", backref="hall")

    def __init__(self, _id=None, num_of_seats=None, availability=True):
        self.id = _id or id
        self.num_of_seats = num_of_seats
        self.availability = availability


class SeanceModel(db.Model):
    __tablename__ = 'seance'

    seance_id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.Time)
    date = db.Column(db.Date)
    hall_id = db.Column(db.Integer, db.ForeignKey('hall.hall_id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.movie_id'))
    tickets_sold = db.Column(db.Integer)
    tickets = db.relationship("TicketModel", backref="seance")

    def __init__(self, _id=None, time=None, date=None, hall_id=None,
                 movie_id=None, tickets_sold=None):
        self.id = _id or id
        self.time = time
        self.date = date
        self.hall_id = hall_id
        self.movie_id = movie_id
        self.tickets_sold = tickets_sold


class SeatModel(db.Model):
    __tablename__ = 'seat'

    seat_id = db.Column(db.Integer, primary_key=True)
    row = db.Column(db.Integer)
    hall_id = db.Column(db.Integer, db.ForeignKey('hall.hall_id'))
    tickets = db.relationship("TicketModel", backref="seat")

    def __init__(self, _id=None, row=None, hall_id=None):
        self.id = _id or id
        self.row = row
        self.hall_id = hall_id

class TicketModel(db.Model):
    __tablename__ = 'ticket'

    ticket_id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Float)
    discount = db.Column(db.Float)
    seat_id = db.Column(db.Integer, db.ForeignKey('seat.seat_id'))
    seance_id = db.Column(db.Integer, db.ForeignKey('seance.seance_id'))

    def __init__(self, _id=None, price=None, discount=None, seat_id=None, seance_id=None):
        self.id = _id or id
        self.price = price
        self.discount = discount
        self.seat_id = seat_id
        self.seance_id = seance_id












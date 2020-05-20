from database.database import db
from sqlalchemy.dialects.postgresql import UUID
import uuid


class EmployeeModel(db.Model):
    __tablename__ = 'employee'

    employee_id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
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


class MovieModel(db.Model):
    __tablename__ = 'movie'

    movie_id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    title = db.Column(db.String(length=120))
    director = db.Column(db.String(length=80))
    release_date = db.Column(db.Date)
    close_date = db.Column(db.Date)
    age_category = db.Column(db.String(length=40))
    movie_category = db.Column(db.String(length=80))
    duration = db.Column(db.Integer)
    seances = db.relationship("SeanceModel", backref="movie")

    def __init__(self, _id=None, title=None, director=None, release_date=None, close_date=None,
                 age_category=None, movie_category=None, duration=None):
        self.id = _id or id
        self.title = title
        self.director = director
        self.release_date = release_date
        self.close_date = close_date
        self.age_category = age_category
        self.movie_category = movie_category
        self.duration = duration


class HallModel(db.Model):
    __tablename__ = 'hall'

    hall_id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    name = db.Column(db.String(length=80), unique=True, nullable=True)
    num_of_seats = db.Column(db.Integer)
    rows = db.Column(db.Integer)
    seats_per_row = db.Column(db.Integer)
    availability = db.Column(db.Boolean)

    seances = db.relationship("SeanceModel", backref="hall")
    seats = db.relationship("SeatModel", backref="hall", cascade="all,delete")

    def __init__(self, _id=None, name=None, rows=None, seats_per_row=None, availability=True):
        self.id = _id or id
        self.name = name
        self.num_of_seats = rows * seats_per_row
        self.rows = rows
        self.seats_per_row = seats_per_row
        self.availability = availability


class SeanceModel(db.Model):
    __tablename__ = 'seance'

    seance_id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    time = db.Column(db.Time, nullable=False)
    date = db.Column(db.Date, nullable=False)
    hall_id = db.Column(UUID(as_uuid=True), db.ForeignKey('hall.hall_id'))
    movie_id = db.Column(UUID(as_uuid=True), db.ForeignKey('movie.movie_id'))
    tickets_sold = db.Column(db.Integer, default=0)

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

    seat_id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    number = db.Column(db.Integer)
    row = db.Column(db.Integer)
    hall_id = db.Column(UUID(as_uuid=True), db.ForeignKey('hall.hall_id'))
    tickets = db.relationship("TicketModel", backref="seat")

    def __init__(self, _id=None, number=None, row=None, hall_id=None):
        self.id = _id or id
        self.number = number
        self.row = row
        self.hall_id = hall_id


class TicketModel(db.Model):
    __tablename__ = 'ticket'
    __table_args__ = (
        db.UniqueConstraint('seat_id', 'seance_id', name='unique_ticket_seat_and_seance'),
    )
    ticket_id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    price = db.Column(db.Float)
    discount = db.Column(db.Float)
    seat_id = db.Column(UUID(as_uuid=True), db.ForeignKey('seat.seat_id'))
    seance_id = db.Column(UUID(as_uuid=True), db.ForeignKey('seance.seance_id'))

    def __init__(self, _id=None, price=None, discount=None, seat_id=None, seance_id=None):
        self.id = _id or id
        self.price = price
        self.discount = discount
        self.seat_id = seat_id
        self.seance_id = seance_id

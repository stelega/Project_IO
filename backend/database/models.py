from database.database import db
from sqlalchemy.dialects.postgresql import UUID
import uuid


class EmployeeModel(db.Model):
    __tablename__ = 'employee'

    employeeId = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    name = db.Column(db.String(length=80))
    surname = db.Column(db.String(length=80))
    login = db.Column(db.String(length=80))
    password = db.Column(db.String(length=80))
    isAdmin = db.Column(db.Boolean)

    def __init__(self, _id=None, name=None, surname=None, login=None, password=None, isAdmin=False):
        self.id = _id or id
        self.name = name
        self.surname = surname
        self.login = login
        self.password = password
        self.isAdmin = isAdmin

    def __repr__(self):
        return f"<User {self.name} + {self.surname}"


class MovieModel(db.Model):
    __tablename__ = 'movie'

    movieId = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    title = db.Column(db.String(length=120))
    director = db.Column(db.String(length=80))
    releaseDate = db.Column(db.Date)
    closeDate = db.Column(db.Date)
    ageCategory = db.Column(db.String(length=40))
    movieCategory = db.Column(db.String(length=80))
    duration = db.Column(db.Integer)
    seances = db.relationship("SeanceModel", backref="movie")

    def __init__(self, _id=None, title=None, director=None, releaseDate=None, closeDate=None,
                 ageCategory=None, movieCategory=None, duration=None):
        self.id = _id or id
        self.title = title
        self.director = director
        self.releaseDate = releaseDate
        self.closeDate = closeDate
        self.ageCategory = ageCategory
        self.movieCategory = movieCategory
        self.duration = duration


class HallModel(db.Model):
    __tablename__ = 'hall'

    hallId = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    name = db.Column(db.String(length=80), unique=True, nullable=True)
    numOfSeats = db.Column(db.Integer)
    rows = db.Column(db.Integer)
    seatsPerRow = db.Column(db.Integer)
    availability = db.Column(db.Boolean)

    seances = db.relationship("SeanceModel", backref="hall")
    seats = db.relationship("SeatModel", backref="hall", cascade="all,delete")

    def __init__(self, _id=None, name=None, rows=None, seatsPerRow=None, availability=True, numOfSeats=None):
        self.id = _id or id
        self.name = name
        self.numOfSeats = rows * seatsPerRow
        self.rows = rows
        self.seatsPerRow = seatsPerRow
        self.availability = availability


class SeanceModel(db.Model):
    __tablename__ = 'seance'

    seanceId = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    time = db.Column(db.Time, nullable=False)
    date = db.Column(db.Date, nullable=False)
    hallId = db.Column(UUID(as_uuid=True), db.ForeignKey('hall.hallId'))
    movieId = db.Column(UUID(as_uuid=True), db.ForeignKey('movie.movieId'))
    ticketsSold = db.Column(db.Integer, default=0)

    tickets = db.relationship("TicketModel", backref="seance")

    def __init__(self, _id=None, time=None, date=None, hallId=None,
                 movieId=None, ticketsSold=None):
        self.id = _id or id
        self.time = time
        self.date = date
        self.hallId = hallId
        self.movieId = movieId
        self.ticketsSold = ticketsSold


class SeatModel(db.Model):
    __tablename__ = 'seat'

    seatId = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    number = db.Column(db.Integer)
    row = db.Column(db.Integer)
    hallId = db.Column(UUID(as_uuid=True), db.ForeignKey('hall.hallId'))
    tickets = db.relationship("TicketModel", backref="seat")

    def __init__(self, _id=None, number=None, row=None, hallId=None):
        self.id = _id or id
        self.number = number
        self.row = row
        self.hallId = hallId


class TicketModel(db.Model):
    __tablename__ = 'ticket'
    __table_args__ = (
        db.UniqueConstraint('seatId', 'seanceId', name='unique_ticket_seat_and_seance'),
    )
    ticketId = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    price = db.Column(db.Float)
    seatId = db.Column(UUID(as_uuid=True), db.ForeignKey('seat.seatId'))
    seanceId = db.Column(UUID(as_uuid=True), db.ForeignKey('seance.seanceId'))

    def __init__(self, _id=None, price=None, seatId=None, seanceId=None):
        self.id = _id or id
        self.price = price
        self.seatId = seatId
        self.seanceId = seanceId


class GenreModel(db.Model):
    __tablename__ = 'genre'

    genreId = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    name = db.Column(db.String(length=80), unique=True, nullable=False)

    def __init__(self, _id=None, name=None):
        self.id = _id
        self.name = name


class AgeCategoryModel(db.Model):
    __tablename__ = 'age_category'

    ageCategoryId = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    name = db.Column(db.String(length=80), unique=True, nullable=False)

    def __init__(self, _id=None, name=None):
        self.id = _id
        self.name = name

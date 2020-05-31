import pytest
import sys
import os
import json

from passlib.hash import bcrypt

sys.path.append("..")
from database.database import db
from database.config import test_database_url
from database.models import EmployeeModel, MovieModel, HallModel, SeanceModel, SeatModel, TicketModel
from main import create_app


@pytest.fixture(scope='module')
def new_employee():
    employee = EmployeeModel(1, "Jan", "Kowalski", "jkowalski", "Passw0rd")
    return employee


@pytest.fixture(scope='module')
def new_admin():
    password = 'Passw0rd'
    admin = EmployeeModel(2, "Admin", "Admin", "admin", str(bcrypt.hash(password)), True)
    return admin


@pytest.fixture(scope='module')
def admin_token(test_client, init_database, new_admin):
    db.session.add(new_admin)
    db.session.commit()
    with test_client:
        response = test_client.post('/login',
                                    data=json.dumps(dict(login='admin',
                                                         password='Passw0rd',
                                                         type='admin')),
                                    content_type='application/json')
        data = json.loads(response.data)
        access_token = response.json.get('token', None)
        return access_token


@pytest.fixture(scope='module')
def new_movie():
    movie = MovieModel(1, "NowyFilm", "NowyRezyser", "2020-7-12", "2020-8-12", "18+", "Film akcji", 130)
    return movie


@pytest.fixture(scope='module')
def new_hall():
    hall = HallModel(1, 'NewHall', 10, 5, True)
    return hall


@pytest.fixture(scope='module')
def new_seance(new_hall, new_movie):
    seance = SeanceModel(1, "18:00:00", "2020-8-12", str(new_hall.hallId), str(new_movie.movieId), 1)
    return seance


@pytest.fixture(scope='module')
def new_seat():
    seat = SeatModel(1, 1, 1, 1)
    return seat


@pytest.fixture(scope='module')
def new_ticket():
    ticket = TicketModel(1, 18.00, 0.00, 1, 1)
    return ticket


@pytest.fixture(scope='session')
def test_client():
    flask_app = create_app(test_database_url)

    testing_client = flask_app.test_client()
    ctx = flask_app.app_context()
    ctx.push()
    yield testing_client
    ctx.pop()


@pytest.fixture(scope='session')
def init_database():
    db.create_all()
    db.session.commit()

    yield db

    db.session.remove()
    db.drop_all()

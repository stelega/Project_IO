import pytest
import sys
import os
sys.path.append(os.getcwd())
from database.database import db
from database.models import EmployeeModel, MovieModel, HallModel, SeanceModel, SeatModel, TicketModel
from main import create_app


@pytest.fixture(scope='module')
def new_employee():
    employee = EmployeeModel(1,"Jan", "Kowalski", "jkowalski", "Passw0rd")
    return employee

@pytest.fixture(scope='module')
def new_movie():
    movie = MovieModel(1, "Film", "Rezyser", "2020-5-12", "+16", "Film akcji", True, 120)
    return movie

@pytest.fixture(scope='module')
def new_hall():
    hall = HallModel(1, 40, True)
    return hall


@pytest.fixture(scope='module')
def new_seance():
    seance = SeanceModel(1, "18:00:00", "2020-5-12", 1, 1, 10)
    return seance


@pytest.fixture(scope='module')
def new_seat():
    seat = SeatModel(1, 1, 1)
    return seat

@pytest.fixture(scope='module')
def new_ticket():
    ticket = TicketModel(1, 18.00, 0.00, 1, 1)
    return ticket


@pytest.fixture(scope='module')
def test_client():
    flask_app = create_app()

    testing_client = flask_app.test_client()
    ctx = flask_app.app_context()
    ctx.push()
    yield testing_client
    ctx.pop()


@pytest.fixture(scope='module')
def init_database():
    db.create_all()
    db.session.commit()

    yield db

    db.session.remove()
    db.drop_all()

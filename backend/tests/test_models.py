import json
from database.database import db


def test_new_employee(new_employee):
    assert new_employee.id == 1
    assert new_employee.name == 'Jan'
    assert new_employee.surname == 'Kowalski'
    assert new_employee.login == 'jkowalski'
    assert new_employee.password == 'Passw0rd'
    assert not new_employee.isAdmin
    assert new_employee
    assert repr(new_employee) == "<User Jan + Kowalski"


def test_new_movie(new_movie):
    assert new_movie.id == 1
    assert new_movie.title == "NowyFilm"
    assert new_movie.director == "NowyRezyser"
    assert new_movie.releaseDate == "2020-7-12"
    assert new_movie.closeDate == "2020-8-12"
    assert new_movie.ageCategory == "18+"
    assert new_movie.movieCategory == "Film akcji"
    assert new_movie.duration == 130


def test_new_hall(new_hall):
    assert new_hall.id == 1
    assert new_hall.name == "NewHall"
    assert new_hall.rows == 10
    assert new_hall.seatsPerRow == 5
    assert new_hall.numOfSeats == 50
    assert new_hall.availability


def test_new_seance(new_seance, new_hall, new_movie):
    assert new_seance.id == 1
    assert new_seance.time == "18:00:00"
    assert new_seance.date == "2020-8-12"
    assert new_seance.hallId == str(new_hall.hallId)
    assert new_seance.movieId == str(new_movie.movieId)
    assert new_seance.ticketsSold == 1


def test_new_seat(new_seat):
    assert new_seat.id == 1
    assert new_seat.number == 1
    assert new_seat.row == 1
    assert new_seat.hallId == 1


def test_new_ticket(new_ticket):
    assert new_ticket.id == 1
    assert new_ticket.price == 18.00
    assert new_ticket.seatId == 1
    assert new_ticket.seanceId == 1


def test_registration(test_client, init_database, admin_token):
    with test_client:
        response = test_client.post('/register',
                                    data=json.dumps(dict(name='Uzytkownik1',
                                                         surname='Uzytkownik1',
                                                         login='uzytkownik',
                                                         password='Passw0rd',
                                                         isAdmin=False)),
                                    headers={'access-token': admin_token},
                                    content_type='application/json')

        result = json.loads(response.data.decode())
        assert response.status_code == 201

        data = result['data']

        assert data['name'] == 'Uzytkownik1'
        assert data['surname'] == 'Uzytkownik1'
        assert data['login'] == 'uzytkownik'
        assert not data['isAdmin']


def test_registered_with_already_registered_user(test_client, new_employee, init_database, admin_token):
    db.session.add(new_employee)
    db.session.commit()
    with test_client:
        response = test_client.post('/register',
                                    data=json.dumps(dict(name='Jan',
                                                         surname='Kowalski',
                                                         login='jkowalski',
                                                         password='Passw0rd',
                                                         isAdmin=False)),
                                    headers={'access-token': admin_token},
                                    content_type='application/json')
        data = json.loads(response.data.decode())
        assert data['message'] == "Podany użytkownik już istnieje"


def register_method(client, admin_token):
    return client.post('/register',
                       data=json.dumps(dict(name='Piotr',
                                            surname='Nowak',
                                            login='nowylogin',
                                            password='Passw0rd',
                                            isAdmin=True)),
                       headers={'access-token': admin_token},
                       content_type='application/json')


def test_registered_user_login(test_client, init_database, admin_token):
    with test_client:
        response_register = register_method(test_client, admin_token)
        data_register = json.loads(response_register.data.decode())

        response = test_client.post('/login',
                                    data=json.dumps(dict(login='nowylogin',
                                                         password='Passw0rd',
                                                         type='employee')),
                                    content_type='application/json')
        data = json.loads(response.data.decode())
        assert data['token']

import json
from database.database import db


def test_new_employee(new_employee):
    assert new_employee.id == 1
    assert new_employee.name == 'Jan'
    assert new_employee.surname == 'Kowalski'
    assert new_employee.login == 'jkowalski'
    assert new_employee.password == 'Passw0rd'
    assert not new_employee.is_admin
    assert new_employee
    assert repr(new_employee) == "<User Jan + Kowalski"


def test_new_movie(new_movie):
    assert new_movie.id == 1
    assert new_movie.title == "Film"
    assert new_movie.director == "Rezyser"
    assert new_movie.release_date == "2020-5-12"
    assert new_movie.close_date == "2020-8-12"
    assert new_movie.age_category == "+16"
    assert new_movie.movie_category == "Film akcji"
    assert new_movie.duration == 120


def test_new_hall(new_hall):
    assert new_hall.id == 1
    assert new_hall.name == "A"
    assert new_hall.rows == 5
    assert new_hall.num_of_seats == 40
    assert new_hall.availability


def test_new_seance(new_seance):
    assert new_seance.id == 1
    assert new_seance.time == "18:00:00"
    assert new_seance.date == "2020-5-12"
    assert new_seance.hall_id == 1
    assert new_seance.movie_id == 1
    assert new_seance.tickets_sold == 10


def test_new_seat(new_seat):
    assert new_seat.id == 1
    assert new_seat.row == 1
    assert new_seat.hall_id == 1


def test_new_ticket(new_ticket):
    assert new_ticket.id == 1
    assert new_ticket.price == 18.00
    assert new_ticket.discount == 0.00
    assert new_ticket.seat_id == 1
    assert new_ticket.seance_id == 1


def test_registration(test_client, init_database):
    with test_client:
        response = test_client.post('/register',
                                    data=json.dumps(dict(name='Jan',
                                                         surname='Kowalski',
                                                         login='nowylogin',
                                                         password='Passw0rd',
                                                         is_admin=False)),
                                    content_type='application/json')
        data = json.loads(response.data.decode())
        valid_registration_response = dict(new_employee_name="Jan",
                                           new_employee_surname="Kowalski")
        assert response.status_code == 200
        assert data == valid_registration_response


def test_registered_with_already_registered_user(test_client, new_employee, init_database):
    db.session.add(new_employee)
    db.session.commit()
    with test_client:
        response = test_client.post('/register',
                                    data=json.dumps(dict(name='Jan',
                                                         surname='Kowalski',
                                                         login='jkowalski',
                                                         password='Passw0rd',
                                                         is_admin=False)),
                                    content_type='application/json')
        data = json.loads(response.data.decode())
        assert data['message'] == "User already exists. You can log in."


def register_method(client):
    return client.post('/register',
                       data=json.dumps(dict(name='Jan',
                                            surname='Kowalski',
                                            login='nowylogin',
                                            password='Passw0rd',
                                            is_admin=False)),
                       content_type='application/json')


def test_registered_user_login(test_client, init_database):
    with test_client:
        response_register = register_method(test_client)
        data_register = json.loads(response_register.data.decode())

        response = test_client.post('/login',
                                    data=json.dumps(dict(login='nowylogin',
                                                         password='Passw0rd')),
                                    content_type='application/json')
        data = json.loads(response.data.decode())
        assert data['token']

import json
import sys
import os

sys.path.append(os.getcwd())
from database.database import db


def register_method(client, name, surname, login, password, is_admin):
    return client.post('/register',
                       data=json.dumps(dict(name=name,
                                            surname=surname,
                                            login=login,
                                            password=password,
                                            is_admin=is_admin)),
                       content_type='application/json')


def login_method(client, login, password):
    return client.post('/login',
                       data=json.dumps(dict(login=login,
                                            password=password)),
                       content_type='application/json')


def test_registration(test_client, init_database):
    with test_client:
        response = register_method(test_client, 'Jan', 'Kowalski', 'jkowalski', 'Passw0rd', False)
        data = json.loads(response.data)
        valid_registration_response = dict(new_employee_name="Jan",
                                           new_employee_surname="Kowalski")
        assert response.status_code == 200
        assert data == valid_registration_response


def test_registered_with_already_registered_user(test_client, new_employee, init_database):
    db.session.add(new_employee)
    db.session.commit()
    with test_client:
        response = register_method(test_client, 'Jan', 'Kowalski', 'jkowalski', 'Passw0rd', False)
        data = json.loads(response.data)
        assert data['message'] == "User already exists. You can log in."


def test_registered_user_login(test_client, init_database):
    with test_client:
        response_register = register_method(test_client, 'Jan', 'Kowalski', 'jkowalski', 'Passw0rd', False)
        data_register = json.loads(response_register.data)
        response = login_method(test_client, 'jkowalski', 'Passw0rd')
        data = json.loads(response.data.decode())

        assert data['access-token']


def test_non_registered_user_login(test_client, init_database):
    with test_client:
        response = login_method(test_client, 'WrongUser', 'WrongPassword')

        assert response.data == b"Could not verify"
        assert response.status_code == 401


def test_valid_login_get_without_admin_permission(test_client, init_database):
    with test_client:
        register_method(test_client, 'Jan', 'Kowalski', 'jkowalski', 'Passw0rd', False)
        login_response = login_method(test_client, 'jkowalski', 'Passw0rd')
        response = test_client.get('/login',
                                   headers=dict(
                                       json.loads(login_response.data)
                                   ))
        data = json.loads(response.data)
        valid_login_response = dict(login="jkowalski",
                                    is_admin=False)

        assert response.status_code == 200
        assert data == valid_login_response


def test_valid_login_get_with_admin_permission(test_client, init_database):
    with test_client:
        register_method(test_client, 'Piotr', 'Kowalski', 'pkowalski', 'Passw0rd', True)
        login_response = login_method(test_client, 'pkowalski', 'Passw0rd')
        response = test_client.get('/login',
                                   headers=dict(
                                       json.loads(login_response.data)
                                   ))
        data = json.loads(response.data.decode())
        valid_login_response = dict(login="pkowalski",
                                    is_admin=True)

        assert response.status_code == 200
        assert data == valid_login_response


def test_get_employee_data_without_admin_status(test_client, init_database):
    with test_client:
        register_method(test_client, 'Jan', 'Kowalski', 'jkowalski', 'Passw0rd', False)
        login_response = login_method(test_client, 'jkowalski', 'Passw0rd')
        employee_data_response = test_client.get('/test',
                                                 headers=dict(
                                                     json.loads(login_response.data)
                                                 ))
        data = json.loads(employee_data_response.data)

        assert data['message'] == "No access permission"


def test_get_employee_data_with_admin_status(test_client, init_database):
    with test_client:
        register_method(test_client, 'Piotr', 'Kowalski', 'pkowalski', 'Passw0rd', True)
        login_response = login_method(test_client, 'pkowalski', 'Passw0rd')
        employee_data_response = test_client.get('/test',
                                                 headers=dict(
                                                     json.loads(login_response.data)
                                                 ))
        data = json.loads(employee_data_response.data)
        valid_result = {
            "count": 1,
            "employees": [
                {
                    "employee_id": 1,
                    "name": "Piotr",
                    "surname": "Kowalski"
                }
            ]
        }
        assert data == valid_result


def test_get_employee_data_with_admin_status_with_two_user_in_db(test_client, new_employee, init_database):
    with test_client:
        register_method(test_client, 'Jan', 'Kowalski', 'jkowalski', 'Passw0rd', True)
        register_method(test_client, 'Piotr', 'Kowalski', 'pkowalski', 'Passw0rd', True)
        login_response = login_method(test_client, 'pkowalski', 'Passw0rd')
        employee_data_response = test_client.get('/test',
                                                 headers=dict(
                                                     json.loads(login_response.data)
                                                 ))
        data = json.loads(employee_data_response.data)
        valid_result = {
            "count": 2,
            "employees": [
                {
                    "employee_id": 1,
                    "name": "Jan",
                    "surname": "Kowalski"
                },
                {
                    "employee_id": 2,
                    "name": "Piotr",
                    "surname": "Kowalski"
                }
            ]
        }
        assert data == valid_result

import json
import os
import sys
import uuid

from database.database import db

sys.path.append(os.getcwd())


def add_hall(client, name, rows, seats_per_row, availability, token):
    headers = {'access-token': token}
    return client.post('/hall',
                       data=json.dumps(dict(name=name,
                                            rows=rows,
                                            seatsPerRow=seats_per_row,
                                            availability=availability)),
                       headers=headers,
                       content_type='application/json')


def get_hall(client, hallId, token):
    headers = {'access-token': token}
    return client.get('/hall',
                      data=json.dumps(dict(hallId=str(hallId))),
                      headers=headers,
                      content_type='application/json')


def test_add_hall(test_client, init_database, admin_token):
    response = add_hall(test_client, 'Hall 1', 5, 10, True, admin_token)
    valid_result = {
        "data":
            {
                "name": "Hall 1",
                'numOfSeats': 50,
                "rows": 5,
                "seatsPerRow": 10,
                "availability": True
            }
    }
    # assert response.status_code == 201
    data = json.loads(response.data)
    del data['data']['hallId']
    assert data == valid_result


def test_add_hall_with_existing_name(test_client, init_database, admin_token):
    response = add_hall(test_client, 'Hall 1', 5, 10, True, admin_token)
    assert response.status_code == 404
    data = json.loads(response.data)

    assert data['message'] == "Hall with name 'Hall 1' already exists"


def test_add_hall_without_name(test_client, init_database, admin_token):
    response = add_hall(test_client, None, 5, 10, True, admin_token)
    assert response.status_code == 404
    data = json.loads(response.data)
    assert data['message'] == "Name of hall must be specified"


def test_get_all_added_halls(test_client, init_database, admin_token):
    add_response = add_hall(test_client, 'Hall 2', 10, 10, True, admin_token)
    assert add_response.status_code == 201

    response = test_client.get('/hall',
                               headers={'access-token': admin_token})
    valid_result = [
        {'name': 'Hall 1',
         'rows': 5,
         'numOfSeats': 50,
         'seatsPerRow': 10,
         'availability': True},
        {'name': 'Hall 2',
         'numOfSeats': 100,
         'rows': 10,
         'seatsPerRow': 10,
         'availability': True
         }]

    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['count'] == 2

    del data['data'][0]['hallId']
    del data['data'][1]['hallId']
    assert data['data'] == valid_result


def test_get_hall(test_client, new_hall, init_database, admin_token):
    db.session.add(new_hall)
    db.session.commit()
    with test_client:
        response = get_hall(test_client, new_hall.hallId, admin_token)
        assert response.status_code == 200

        result = json.loads(response.data)
        data = result['data']

        assert data['name'] == new_hall.name
        assert data['numOfSeats'] == new_hall.numOfSeats
        assert data['rows'] == new_hall.rows
        assert data['seatsPerRow'] == new_hall.seatsPerRow
        assert data['availability'] == new_hall.availability


def test_update_hall(test_client, new_hall, init_database, admin_token):
    response = test_client.put('/hall',
                               data=json.dumps(dict(hallId=str(new_hall.hallId),
                                                    name='UpdatedHall',
                                                    seatsPerRow=30)),
                               headers={'access-token': admin_token},
                               content_type='application/json')
    assert response.status_code == 200
    result = json.loads(response.data)
    data = result['data']

    assert data['name'] == 'UpdatedHall'
    assert data['seatsPerRow'] == 30


def test_update_hall_with_wrong_id(test_client, new_hall, init_database, admin_token):
    response = test_client.put('/hall',
                               data=json.dumps(dict(hallId=str(uuid.uuid1()))),
                               headers={'access-token': admin_token},
                               content_type='application/json')

    data = json.loads(response.data)
    assert data['message'] == 'Record not found'


def test_delete_hall(test_client, new_hall, init_database, admin_token):
    response = test_client.delete('/hall',
                                  data=json.dumps(dict(hallId=str(new_hall.hallId))),
                                  headers={'access-token': admin_token},
                                  content_type='application/json')
    assert response.status_code == 200

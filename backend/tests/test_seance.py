import json
import os
import sys
import uuid

import pytest

from database.database import db
from uuid import UUID


def add_seance(client, time, date, hallId, movieId, ticketsSold, token):
    headers = {'access-token': token}
    return client.post('/seance',
                       data=json.dumps(dict(time=time,
                                            date=date,
                                            hallId=hallId,
                                            movieId=movieId,
                                            ticketsSold=ticketsSold)),
                       headers=headers,
                       content_type='application/json')


def get_seance(client, seanceId, token):
    headers = {'access-token': token}
    return client.get('/seance',
                      data=json.dumps(dict(seanceId=str(seanceId))),
                      headers=headers,
                      content_type='application/json')


def test_add_seance(test_client, new_hall, new_movie, init_database, admin_token):
    db.session.add(new_hall)
    db.session.add(new_movie)
    db.session.commit()
    response = add_seance(test_client, '10:00', '2020-7-14', str(new_hall.hallId), str(new_movie.movieId), 10,
                          admin_token)

    assert response.status_code == 201
    result = json.loads(response.data)
    data = result['data']

    assert data['time'] == '10:00:00'
    assert data['date'] == '2020-07-14'
    assert data['hall'] == new_hall.name
    assert data['movie'] == new_movie.title
    assert data['ticketsSold'] == 10


def test_get_all_added_seances(test_client, new_hall, new_movie, init_database, admin_token):
    response = add_seance(test_client, '21:00', '2020-7-14', str(new_hall.hallId), str(new_movie.movieId), 30,
                          admin_token)
    assert response.status_code == 201

    response = test_client.get('/seance',
                               headers={'access-token': admin_token})

    assert response.status_code == 200
    result = json.loads(response.data)
    assert result['count'] == 2


def test_get_seance(test_client, new_seance, init_database, admin_token):
    db.session.add(new_seance)
    db.session.commit()
    with test_client:
        response = get_seance(test_client, str(new_seance.seanceId), admin_token)
        assert response.status_code == 200
        result = json.loads(response.data)
        print(result)
        data = result['data'][0]

        assert data['time'] == str(new_seance.time)
        assert data['date'] == str(new_seance.date)


def test_update_seance(test_client, new_seance, init_database, admin_token):
    with test_client:
        response = test_client.put('/seance',
                                   data=json.dumps(dict(seanceId=str(new_seance.seanceId),
                                                        time='13:00:00')),
                                   headers={'access-token': admin_token},
                                   content_type='application/json')

        assert response.status_code == 200
        result = json.loads(response.data)
        data = result['data']

        assert data['time'] == "13:00:00"


def test_update_seance_with_wrong_id(test_client, init_database, admin_token):
    response = test_client.put('/seance',
                               data=json.dumps(dict(seanceId=str(uuid.uuid1()))),
                               headers={'access-token': admin_token},
                               content_type='application/json')

    data = json.loads(response.data)
    assert data['message'] == 'Record not found'


def test_delete_seance(test_client, new_seance, init_database, admin_token):
    with test_client:
        response = test_client.delete('/seance',
                                      data=json.dumps(dict(seanceId=str(new_seance.seanceId))),
                                      headers={'access-token': admin_token},
                                      content_type='application/json')
        assert response.status_code == 200
        result = json.loads(response.data)
        data = result['data']
        assert data['time'] == str(new_seance.time)
        assert data['date'] == str(new_seance.date)


def test_get_available_hours(test_client, new_movie, new_hall , init_database, admin_token):
    with test_client:
        response = test_client.get('/seance/possible_hours',
                                   data=json.dumps(dict(movieId=str(new_movie.movieId),
                                                        hallId=str(new_hall.hallId),
                                                        date='2020-07-14')),
                                   headers={'access-token': admin_token},
                                   content_type='application/json')
        data = json.loads(response.data)
        print(data)
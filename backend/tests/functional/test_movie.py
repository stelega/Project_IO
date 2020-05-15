import json
import os
import sys

sys.path.append(os.getcwd())


def add_movie(client, movie_id, title, director, release_date, age_category, movie_category, availability, duration):
    return client.post('/movie',
                       data=json.dumps(dict(movie_id=movie_id,
                                            title=title,
                                            director=director,
                                            release_date=release_date,
                                            age_category=age_category,
                                            movie_category=movie_category,
                                            availability=availability,
                                            duration=duration)),
                       content_type='application/json')


def get_movie(client, movie_id):
    return client.get('/movie',
                      data=json.dumps(dict(movie_id=movie_id)),
                      content_type='application/json')


def test_add_movie(test_client, init_database):
    response = add_movie(test_client, 1, 'Film', 'Rezyser', '2020-5-12', '16+', 'Film Akcji', True, 128)
    valid_result = {
        "data":
            {
                "movie_id": 1,
                "title": "Film",
                "director": "Rezyser",
                "release_date": '2020-05-12',
                "age_category": "16+",
                "movie_category": "Film Akcji",
                "availability": True,
                "duration": 128,
                "seances": []
            }
    }
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data == valid_result


def test_add_existing_movie(test_client, init_database):
    add_response = add_movie(test_client, 1, 'Film', 'Rezyser', '2020-5-12', '16+', 'Film Akcji', True, 128)
    add_response1 = add_movie(test_client, 1, 'Film', 'Rezyser', '2020-5-12', '16+', 'Film Akcji', True, 128)
    assert add_response.status_code == 201
    assert add_response1.status_code == 201
    data = json.loads(add_response1.data.decode())
    assert data["data"]["movie_id"] == 2


def test_get_movie_with_added_movie(test_client, init_database):
    add_response = add_movie(test_client, 1, 'Film', 'Rezyser', '2020-5-12', '16+', 'Film Akcji', 'True', 128)
    assert add_response.status_code == 201

    response = get_movie(test_client, 1)
    assert response.status_code == 200
    valid_result = {
        "data":
            {
                "movie_id": 1,
                "title": "Film",
                "director": "Rezyser",
                "release_date": '2020-05-12',
                "age_category": "16+",
                "movie_category": "Film Akcji",
                "availability": True,
                "duration": 128,
                "seances": []
            }
    }
    data = json.loads(response.data)
    assert data == valid_result


def test_get_movie_without_movie_in_db(test_client, init_database):
    response = get_movie(test_client, 1)
    assert response.status_code == 404
    data = json.loads(response.data.decode())
    assert data['error'] == 'Record not found'


def test_get_movie_with_wrong_id(test_client, init_database):
    add_response = add_movie(test_client, 1, 'Film', 'Rezyser', '2020-5-12', '16+', 'Film Akcji', 'True', 128)
    assert add_response.status_code == 201
    response = get_movie(test_client, 2)

    assert response.status_code == 404
    data = json.loads(response.data.decode())
    assert data["error"] == 'Record not found'


def test_get_all_movies(test_client, init_database):
    add_response1 = add_movie(test_client, 1, 'Film', 'Rezyser', '2020-5-12', '16+', 'Film Akcji', True, 128)
    add_response2 = add_movie(test_client, 2, 'Film1', 'Rezyser1', '2020-5-11', '16+', 'Film Akcji', True, 122)
    assert add_response1.status_code == 201
    assert add_response2.status_code == 201
    response = test_client.get('/movie')
    valid_result = {
        "data": [
            {
                "movie_id": 1,
                "title": "Film",
                "director": "Rezyser",
                "release_date": '2020-05-12',
                "age_category": "16+",
                "movie_category": "Film Akcji",
                "availability": True,
                "duration": 128,
                "seances": []
            },
            {
                "movie_id": 2,
                "title": "Film1",
                "director": "Rezyser1",
                "release_date": '2020-05-11',
                "age_category": "16+",
                "movie_category": "Film Akcji",
                "availability": True,
                "duration": 122,
                "seances": []
            },
        ]
    }
    assert response.status_code == 200
    assert json.loads(response.data) == valid_result


def test_delete_added_movie(test_client, init_database):
    add_response = add_movie(test_client, 1, 'Film', 'Rezyser', '2020-5-12', '16+', 'Film Akcji', True, 128)

    assert add_response.status_code == 201
    delete_response = test_client.delete('/movie',
                                         data=json.dumps(dict(movie_id=1)),
                                         content_type='application/json')
    assert delete_response.status_code == 200

# Add some more delete tests and put tests
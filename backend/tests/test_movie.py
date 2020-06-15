import json
import os
import sys
import uuid
from database.database import db

sys.path.append(os.getcwd())


def add_movie(client, title, director, releaseDate, closeDate, ageCategory, movieCategory, duration, token):
    headers = {'access-token': token}
    return client.post('/movie',
                       data=json.dumps(dict(title=title,
                                            director=director,
                                            releaseDate=releaseDate,
                                            closeDate=closeDate,
                                            ageCategory=ageCategory,
                                            movieCategory=movieCategory,
                                            duration=duration)),
                       headers=headers,
                       content_type='application/json')


def get_movie(client, movieId, token):
    headers = {'access-token': token}
    return client.get('/movie',
                      data=json.dumps(dict(movieId=movieId)),
                      headers=headers,
                      content_type='application/json')


def test_add_movie(test_client, init_database, admin_token):
    with test_client:
        response = add_movie(test_client, 'Film', 'Rezyser', '2020-5-12', '2020-05-30', '16+', 'Film akcji', 128,
                             admin_token)
        valid_result = {
            "data":
                {
                    "title": "Film",
                    "director": "Rezyser",
                    "releaseDate": '2020-05-12',
                    "closeDate": "2020-05-30",
                    "ageCategory": "16+",
                    "movieCategory": 'Film akcji',
                    "duration": 128,
                }
        }
        assert response.status_code == 201
        data = json.loads(response.data)
        del data['data']['movieId']
        assert data == valid_result


def test_add_existing_movie(test_client, init_database, new_movie, admin_token):
    # This should throw 404
    with test_client:
        response = add_movie(test_client, 'Film', 'Rezyser', '2020-5-12', '2020-05-30', '16+', 'Film akcji', 128,
                             admin_token)
        assert response.status_code == 201
        data = json.loads(response.data.decode())


def test_get_movie_with_added_movie(test_client, new_movie, init_database, admin_token):
    db.session.add(new_movie)
    db.session.commit()
    with test_client:
        response = get_movie(test_client, str(new_movie.movieId), admin_token)
        assert response.status_code == 200
        valid_result = [{

            "movieId": str(new_movie.movieId),
            "title": "NowyFilm",
            "director": "NowyRezyser",
            "releaseDate": '2020-07-12',
            "closeDate": "2020-08-12",
            "ageCategory": "18+",
            "movieCategory": "Film akcji",
            "duration": 130
        }]
        data = json.loads(response.data)
        assert data['data'] == valid_result


def test_get_movie_with_wrong_id(test_client, init_database, admin_token):
    with test_client:
        response = get_movie(test_client, str(uuid.uuid1()), admin_token)

        data = json.loads(response.data.decode())
        assert data["message"] == 'Rekord nie istnieje'


def test_get_all_movies(test_client, init_database, admin_token):
    with test_client:
        response = test_client.get('/movie',
                                   headers={'access-token': admin_token})

        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['count'] == 3


def test_update_valid_movie(test_client, new_movie, init_database, admin_token):
    with test_client:
        put_response = test_client.put('/movie',
                                       data=json.dumps(dict(movieId=str(new_movie.movieId),
                                                            title="Poprawiony_Film")),
                                       headers={'access-token': admin_token},
                                       content_type='application/json')
        assert put_response.status_code
        data = json.loads(put_response.data)
        assert data['data']['title'] == "Poprawiony_Film"


def test_update_non_existing_movie(test_client, init_database, admin_token):
    with test_client:
        put_response = test_client.put('/movie',
                                       data=json.dumps(dict(movieId=str(uuid.uuid1()),
                                                            title="Poprawiony_Film",
                                                            director="PoprawionyRezyser",
                                                            releaseDate='2020-07-12',
                                                            closeDate='2020-08-12',
                                                            ageCategory="16+",
                                                            movieCategory="Film akcji",
                                                            duration=130
                                                            )),
                                       headers={'access-token': admin_token},
                                       content_type='application/json')
        assert put_response.status_code == 400


def test_delete_added_movie(test_client, new_movie, init_database, admin_token):
    with test_client:
        delete_response = test_client.delete('/movie',
                                             data=json.dumps(dict(movieId=str(new_movie.movieId))),
                                             headers={'access-token': admin_token},
                                             content_type='application/json')
        assert delete_response.status_code == 200

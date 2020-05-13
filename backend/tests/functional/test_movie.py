import json
import sys
import os

sys.path.append(os.getcwd())
from database.database import db


# add assert json result
def test_add_movie_to_db(test_client, init_database):
    respone = test_client.post('/movie',
                               data=json.dumps(dict(movie_id=1,
                                                    title='Film',
                                                    director='Rezyser',
                                                    release_date='2020-5-12',
                                                    age_category='16+',
                                                    movie_category=True,
                                                    duration=128)),
                               content_type='application/json')
    assert respone.status_code == 201


def test_get_movie(test_client, init_database):
    response = test_client.get('/movie',
                               data=json.dumps(dict(movie_id=1)),
                               content_type='application/json')
    assert response.status_code == 200

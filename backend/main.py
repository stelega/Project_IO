import os, sys

sys.path.append(os.getcwd())

from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS

from database.config import database_url, origins
from routes.routes import generate_routes
from database.database import db, ma


def create_app(database_url_arg):
    app = Flask(__name__)
    cors = CORS(app, resources={r"/*": {"origins": origins}})
    app.config['DEBUG'] = True
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url_arg
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'super secret key'
    initialize_extension(app)
    return app


def initialize_extension(app):
    generate_routes(app)
    db.init_app(app)
    ma.init_app(app)
    migrate = Migrate(app, db, compare_type=True)


app = create_app(database_url)

if __name__ == '__main__':
    app.run(port=5000, debug=True, host='localhost', use_reloader=True)

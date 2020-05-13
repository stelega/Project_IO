import os, sys

sys.path.append(os.getcwd())

from flask import Flask
from flask_migrate import Migrate

from database.config import database_url
from routes.routes import generate_routes
from database.database import db, ma


def create_app():
    app = Flask(__name__)
    app.config['DEBUG'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    app.config['SECRET_KEY'] = 'super secret key'
    initialize_extension(app)
    return app


def initialize_extension(app):
    generate_routes(app)
    db.init_app(app)
    ma.init_app(app)
    migrate = Migrate(app, db)


if __name__ == '__main__':
    app = create_app()
    app.run(port=5000, debug=True, host='localhost', use_reloader=True)

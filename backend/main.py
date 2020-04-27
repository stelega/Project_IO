import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from config import database_url
from routes.routes import generate_routes


def create_app():
    app = Flask(__name__)
    app.config['DEBUG'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    db = SQLAlchemy(app)
    migrate = Migrate(app, db)
    return app


if __name__ == '__main__':
    # Create app.
    app = create_app()
    generate_routes(app)

    # Run app.
    app.run(port=5000, debug=True, host='localhost', use_reloader=True)

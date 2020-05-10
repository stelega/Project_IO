import os, sys

sys.path.append(os.getcwd())

from flask import Flask
from flask_migrate import Migrate

from database.config import database_url
from routes.routes import generate_routes
from database.database import db, ma

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db.init_app(app)
ma.init_app(app)
migrate = Migrate(app, db)
generate_routes(app)

if __name__ == '__main__':
    app.run(port=5000, debug=True, host='localhost', use_reloader=True)

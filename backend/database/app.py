from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config[
    'SQLALCHEMY_DATABASE_URI'] = "postgresql://qxbvllvcvqymqm:f4691671a6044da4462dd817ae4ad5b9681686b7ae36cd119d7150efc44c58bb@ec2-54-247-103-43.eu-west-1.compute.amazonaws.com:5432/d85bk4b0thbo18"
db = SQLAlchemy(app)
migrate = Migrate(app, db)


class EmployeeModel(db.Model):
    __tablename__ = 'employee'

    employee_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(length=80))
    surname = db.Column(db.String(length=80))
    login = db.Column(db.String(length=80))
    password = db.Column(db.String(length=80))

    def __init__(self, id):
        self.id = id

    def __repr__(self):
        return f"<User {self.name} + {self.surname}"

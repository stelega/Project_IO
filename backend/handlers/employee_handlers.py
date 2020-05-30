from flask_restful import Resource
import jwt
import datetime
from flask import request, jsonify, make_response, redirect, url_for, current_app
from database.models import EmployeeModel
from database.database import db
from functools import wraps
from passlib.hash import bcrypt


def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        token = None

        if 'access-token' in request.headers:
            token = request.headers['access-token']

        if not token:
            return make_response(jsonify({'message': 'Token is missing'}), 401)

        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'])
            current_user = EmployeeModel.query.filter_by(login=data['login']).first()
        except jwt.ExpiredSignature:
            return make_response(jsonify({'message': 'Token expired'}), 302)
        except Exception as e:
            return make_response(jsonify({"message": repr(e)}, 500))

        try:
            fun = f(*args, **kwargs)
            return fun
        except Exception as e:
            return make_response(jsonify({"message": repr(e)}, 500))

    return wrap


def admin_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        token = None

        if 'access-token' in request.headers:
            token = request.headers['access-token']

        if not token:
            return make_response(jsonify({'message': 'Token is missing'}), 401)

        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'])
            current_user = EmployeeModel.query.filter_by(login=data['login']).first()
            if not current_user.isAdmin:
                return make_response(jsonify({'message': 'No access permission'}), 403)
        except jwt.ExpiredSignature:
            print("Token expired")
            return make_response(jsonify({'message': 'Token expired'}), 302)
        except Exception as e:
            return make_response(jsonify({"message": repr(e)}, 500))

        try:
            fun = f(*args, **kwargs)
            return fun
        except Exception as e:
            return make_response(jsonify({"message": repr(e)}, 500))

    return wrap


class EmployeesData(Resource):
    @admin_required
    def get(self):
        employees = EmployeeModel.query.all()
        results = [
            {
                "employeeId": str( employee.employeeId),
                "name": employee.name,
                "surname": employee.surname,
            } for employee in employees]

        return {"count": len(results), "employees": results}


class Register(Resource):
    @admin_required
    def post(self):
        data = request.get_json()
        # check if user already exists
        employee = EmployeeModel.query.filter_by(login=data.get('login')).first()
        if not employee:
            new_employee = EmployeeModel(name=data.get('name'), surname=data.get('surname'), login=data.get('login'),
                                         password=str(bcrypt.hash(data.get('password'))), isAdmin=data.get('isAdmin'))
            db.session.add(new_employee)
            db.session.commit()
            return jsonify({'new_employee_name': new_employee.name, 'new_employee_surname': new_employee.surname})
        else:
            return make_response(jsonify({'message': 'User already exists'}, 409))


class Login(Resource):
    def post(self):
        auth = request.get_json()
        login = auth.get('login')
        password = auth.get('password')
        if not auth or not login or not password:
            return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

        time = datetime.datetime.utcnow() + datetime.timedelta(minutes=10)
        emplo_user = EmployeeModel.query.filter_by(login=login).first()

        if emplo_user and bcrypt.verify(password, emplo_user.password):
            token = jwt.encode({'login': emplo_user.login, 'exp': time}, current_app.config['SECRET_KEY'])
            return make_response(jsonify({'token': token.decode('UTF-8'), 'asAdmin': emplo_user.isAdmin}), 200)

        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    def get(self):

        token = None
        if 'access-token' in request.headers:
            token = request.headers['access-token']
        if not token:
            return make_response(jsonify({'message': 'Token is missing'}), 401)

        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'])
            current_user = EmployeeModel.query.filter_by(login=data['login']).first()
            return jsonify({'login': current_user.login, 'isAdmin': current_user.isAdmin})
        except:
            return jsonify({'message': 'Welcome on login page!'})

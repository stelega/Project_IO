import datetime
from functools import wraps

import jwt
from flask import request, jsonify, make_response, current_app
from flask_restful import Resource, reqparse
from passlib.hash import bcrypt

from database.database import db
from database.models import EmployeeModel
from database.schemas import EmployeeSchema
from handlers.messages import ApiMessages
from handlers.utilities import prepare_and_run_query


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
    def get(self):
        args = self._parse_employee_args()
        if args['employeeId'] is not None:
            employee = EmployeeModel.query.get(args['employeeId'])
            if employee is None:
                return make_response(jsonify({'message': ApiMessages.RECORD_NOT_FOUND.value}), 404)
            count = 1
            output = EmployeeSchema().dump(employee)
        else:
            try:
                query = self._search_employees_query(EmployeeModel.query)
                employee, count = prepare_and_run_query(query, args)
                output = EmployeeSchema(many=True).dump(employee)
            except ValueError as err:
                return make_response(jsonify({'message': str(err)}), 404)
        if output is not None:
            return make_response(jsonify({'data': output, 'count': count}), 200)
        else:
            return make_response(jsonify({"message": ApiMessages.INTERNAL.value}), 500)

    @admin_required
    def put(self):
        args = self._parse_employee_args()
        if args['employeeId'] is not None:
            if args['password'] is not None:
                args['password'] = str(bcrypt.hash(args['password']))
            remove = [k for k in args if args[k] is None]
            for k in remove:
                del args[k]
            employee = EmployeeModel.query.filter_by(employeeId=args['employeeId']).update(args)
            if employee == 1:
                db.session.commit()
                employee = EmployeeModel.query.get(args['employeeId'])
                output = EmployeeSchema().dump(employee)
                return make_response(jsonify({'data': output}), 200)
            else:
                return make_response(jsonify({"message": ApiMessages.RECORD_NOT_FOUND.value}), 404)
        else:
            return make_response(jsonify({'message': ApiMessages.ID_NOT_PROVIDED.value}), 404)

    @admin_required
    def delete(self):
        args = self._parse_employee_args()
        if args['employeeId'] is not None:
            employee = EmployeeModel.query.get(args['employeeId'])
            db.session.delete(employee)
            db.session.commit()
            output = EmployeeSchema().dump(employee)
            return make_response(jsonify({'data': output}), 200)
        else:
            return make_response(jsonify({'message': ApiMessages.ID_NOT_PROVIDED.value}), 404)

    def _parse_employee_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('employeeId')
        parser.add_argument('name')
        parser.add_argument('surname')
        parser.add_argument('login')
        parser.add_argument('password')
        return parser.parse_args()

    def _search_employees_query(self, query):
        parser = reqparse.RequestParser()
        parser.add_argument('search')
        args = parser.parse_args()
        if args['search'] is not None:
            query = query.filter((EmployeeModel.name.ilike('%{}%'.format(args['search'])))
                                 | (EmployeeModel.surname.ilike('%{}%'.format(args['search'])))
                                 | (EmployeeModel.login.ilike('%{}%'.format(args['search']))))
        return query


class Register(Resource):
    def post(self):
        data = request.get_json()
        # check if user already exists
        employee = EmployeeModel.query.filter_by(login=data.get('login')).first()
        if not employee:
            new_employee = EmployeeModel(name=data.get('name'), surname=data.get('surname'), login=data.get('login'),
                                         password=str(bcrypt.hash(data.get('password'))), isAdmin=data.get('isAdmin'))
            db.session.add(new_employee)
            db.session.commit()
            output = EmployeeSchema().dump(new_employee)
            return make_response(jsonify({'data': output}), 201)
        else:
            return make_response(jsonify({'message': 'User already exists'}), 409)


class Login(Resource):
    def post(self):
        auth = request.get_json()
        login = auth.get('login')
        password = auth.get('password')
        login_type = auth.get('type')
        if not auth or not login or not password or not login_type:
            return make_response({"message": "Could not verify"}, 401,
                                 {'WWW-Authenticate': 'Basic realm="Login required"'})

        emplo_user = EmployeeModel.query.filter_by(login=login).first()
        time = datetime.datetime.utcnow() + datetime.timedelta(minutes=60)

        if emplo_user and bcrypt.verify(password, emplo_user.password):
            if login_type != 'employee' and not emplo_user.isAdmin:
                return make_response(jsonify({'message': 'No access permission'}), 403)
            token = jwt.encode({'login': emplo_user.login, 'exp': time}, current_app.config['SECRET_KEY'])
            return make_response(jsonify(
                {'token': token.decode('UTF-8'), 'isAdmin': emplo_user.isAdmin, 'name': emplo_user.name,
                 'surname': emplo_user.surname}), 200)

        return make_response(jsonify({"message": "Login or password incorrect"}), 401, {'WWW-Authenticate': 'Basic realm="Login required"'})

    def get(self):

        token = None
        if 'access-token' in request.headers:
            token = request.headers['access-token']
        if not token:
            return make_response(jsonify({'message': 'Token is missing'}), 401)

        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'])
            current_user = EmployeeModel.query.filter_by(login=data['login']).first()
            return make_response(jsonify({'login': current_user.login, 'isAdmin': current_user.isAdmin}), 200)
        except:
            return make_response({'message': ApiMessages.INTERNAL}, 500)

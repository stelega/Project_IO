from flask_restful import Api
from handlers.employee_handlers import EmployeesData


def generate_routes(app):
    api = Api(app)

    api.add_resource(EmployeesData, '/test')

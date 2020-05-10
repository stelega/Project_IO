from flask_restful import Api
from handlers.employee_handlers import EmployeesData
from handlers.movie_handlers import MovieData


def generate_routes(app):
    api = Api(app)

    api.add_resource(EmployeesData, '/test')
    api.add_resource(MovieData, '/movie')

from flask_restful import Api
from handlers.employee_handlers import EmployeesData, Register, Login
from handlers.movie_handlers import MovieData


def generate_routes(app):
    api = Api(app)

    api.add_resource(EmployeesData, '/test', endpoint="test")
    api.add_resource(Register, '/register', endpoint="register")
    api.add_resource(Login, '/login', endpoint="login")
    api.add_resource(MovieData, '/movie', endpoint="movie")

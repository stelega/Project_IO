from flask_restful import Api

from handlers.employee_handlers import EmployeesData, Register, Login
from handlers.hall_handlers import HallData
from handlers.movie_handlers import MovieData, AgeCategoryData, GenreData, AvailableMoviesData, FutureMoviesData, \
    FutureMoviesWithSeancesData
from handlers.seance_handlers import SeanceData, AvailableHoursData, SeatsData, FutureMovieSeancesData
from handlers.ticket_handlers import TicketData


def generate_routes(app):
    api = Api(app)

    api.add_resource(EmployeesData, '/employee', endpoint="test")
    api.add_resource(Register, '/register', endpoint="register")
    api.add_resource(Login, '/login', endpoint="login")
    api.add_resource(MovieData, '/movie', endpoint="movie")
    api.add_resource(AvailableMoviesData, '/movie/available', endpoint="available_movies")
    api.add_resource(FutureMoviesData, '/movie/future/all', endpoint="future_movies")
    api.add_resource(FutureMoviesWithSeancesData, '/movie/future/with_seances', endpoint="future_movies_with_seances")
    api.add_resource(HallData, '/hall', endpoint="hall")
    api.add_resource(SeanceData, '/seance', endpoint="seance")
    api.add_resource(FutureMovieSeancesData, '/seance/movie_seance', endpoint="movie_seance")
    api.add_resource(TicketData, '/ticket', endpoint="ticket")
    api.add_resource(AgeCategoryData, '/category/age', endpoint="age_category")
    api.add_resource(GenreData, '/category/genre', endpoint="genre")
    api.add_resource(AvailableHoursData, '/seance/possible_hours', endpoint="possible_hours")
    api.add_resource(SeatsData, '/seance/seats', endpoint="seats")

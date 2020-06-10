from datetime import datetime, timedelta

from flask import jsonify, make_response
from flask_restful import Resource, reqparse

from database.config import close_time, open_time, cleaning_minutes, possible_seance_interval
from database.database import db
from database.models import SeanceModel, MovieModel, HallModel, SeatModel, TicketModel
from database.schemas import SeanceSchema, SeatSchema
from handlers.employee_handlers import login_required
from handlers.messages import ApiMessages
from handlers.utilities import prepare_and_run_query


class SeanceData(Resource):
    @login_required
    def get(self):
        args = self._parse_seance_args()
        if args['seanceId'] is not None:
            seance = SeanceModel.query.filter(SeanceModel.seanceId == args['seanceId']).all()
            count = len(seance)
            if not count:
                return make_response(jsonify({'message': ApiMessages.RECORD_NOT_FOUND.value}), 404)
            output = SeanceSchema(many=True).dump(seance)
        else:
            try:
                query = self._search_seances_query(SeanceModel.query.join(MovieModel).join(HallModel))
                args['name'] = args['title'] = ''
                seances, count = prepare_and_run_query(query, args)
                output = SeanceSchema(many=True).dump(seances)
            except ValueError as err:
                return make_response(jsonify({'message': str(err)}), 404)
        if output is not None:
            return make_response(jsonify({'data': output, 'count': count}), 200)
        else:
            return make_response(jsonify({"message": ApiMessages.INTERNAL.value}), 500)

    @login_required
    def post(self):
        args = self._parse_seance_args()
        del args['seanceId']
        seance = SeanceModel(**args)
        db.session.add(seance)
        db.session.commit()
        output = SeanceSchema().dump(seance)
        return make_response(jsonify({'data': output}), 201)

    @login_required
    def put(self):
        args = self._parse_seance_args()
        if args['seanceId'] is not None:
            remove = [k for k in args if args[k] is None]
            for k in remove:
                del args[k]
            seance = SeanceModel.query.filter_by(seanceId=args['seanceId']).update(args)
            if seance == 1:
                db.session.commit()
                seance = SeanceModel.query.get(args['seanceId'])
                output = SeanceSchema().dump(seance)
                return make_response(jsonify({'data': output}), 200)
            else:
                return make_response(jsonify({"message": ApiMessages.RECORD_NOT_FOUND.value}), 500)
        else:
            return make_response(jsonify({'message': ApiMessages.ID_NOT_PROVIDED.value}), 400)

    @login_required
    def delete(self):
        args = self._parse_seance_args()
        if args['seanceId'] is not None:
            seance = SeanceModel.query.get(args['seanceId'])
            if seance is None:
                return make_response(jsonify({'message': ApiMessages.RECORD_NOT_FOUND.value}), 404)
            tickets = TicketModel.query.filter(TicketModel.seanceId == seance.seanceId).all()
            if tickets:
                return make_response(jsonify({'message': ApiMessages.CANNOT_REMOVE_SEANCE_WITH_TICKETS.value}), 400)
            output = SeanceSchema().dump(seance)
            db.session.delete(seance)
            db.session.commit()
            return make_response(jsonify({'data': output}), 200)
        else:
            return make_response(jsonify({'message': ApiMessages.ID_NOT_PROVIDED.value}), 400)

    def _parse_seance_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('seanceId')
        parser.add_argument('time')
        parser.add_argument('date')
        parser.add_argument('hallId')
        parser.add_argument('movieId')
        parser.add_argument('ticketsSold', type=int)
        return parser.parse_args()

    def _search_seances_query(self, query):
        parser = reqparse.RequestParser()
        parser.add_argument('search')
        args = parser.parse_args()
        if args['search'] is not None:
            query = query.filter(MovieModel.title.ilike('%{}%'.format(args['search'])))
        return query


class AvailableHoursData(Resource):
    @login_required
    def get(self):
        args = self._parse_args()
        movie = MovieModel.query.get(args['movieId'])
        duration = movie.duration + cleaning_minutes
        picked_date = datetime.strptime(args['date'], "%Y-%m-%d")

        halls = HallModel.query.filter(HallModel.availability).all()
        output = []
        for hall in halls:
            temp_output = {"hallId": hall.hallId, "name": hall.name, "hours": []}
            temp_seances = SeanceModel.query.filter(
                (SeanceModel.date == picked_date) & (SeanceModel.hallId == hall.hallId)).all()
            seances = [{
                "start": datetime(picked_date.year, picked_date.month, picked_date.day, seance.time.hour,
                                  seance.time.minute),
                "end": (datetime(picked_date.year, picked_date.month, picked_date.day, seance.time.hour,
                                 seance.time.minute)
                        + timedelta(0, (seance.movie.duration + cleaning_minutes) * 60))} for seance in temp_seances]

            possible_time = datetime(picked_date.year, picked_date.month, picked_date.day,
                                     open_time.hour, open_time.minute, open_time.hour)
            possible_end_time = possible_time + timedelta(0, duration * 60)

            while possible_time <= datetime(picked_date.year, picked_date.month, picked_date.day,
                                            close_time.hour, close_time.minute, close_time.second):
                correct = True
                for seance in seances:
                    if seance["start"] <= possible_end_time <= seance["end"] \
                            or seance["start"] <= possible_time <= seance["end"] \
                            or (possible_time <= seance["start"] and possible_end_time >= seance["end"]):
                        correct = False
                        break
                if correct:
                    temp_output["hours"].append(possible_time.strftime("%H:%M"))
                possible_time += timedelta(0, possible_seance_interval)
                possible_end_time += timedelta(0, possible_seance_interval)
            if temp_output["hours"]:
                output.append(temp_output)
        return make_response(jsonify({'data': output}), 200)

    def _parse_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('movieId')
        parser.add_argument('date')
        return parser.parse_args()


class SeatsData(Resource):
    @login_required
    def get(self):
        args = self._parse_args()
        seance = SeanceModel.query.get(args["seanceId"])
        seats = SeatModel.query.filter(SeatModel.hallId == seance.hallId).order_by(SeatModel.row.asc(),
                                                                                   SeatModel.number.asc()).all()
        temp_output = SeatSchema(many=True).dump(seats)
        tickets = TicketModel.query.filter(TicketModel.seanceId == args["seanceId"]).all()
        taken_seats = [str(ticket.seatId) for ticket in tickets]
        for seat in temp_output:
            seat["free"] = not seat["seatId"] in taken_seats
        output = [[seat for seat in temp_output if seat["row"] == row] for row in range(seance.hall.rows)]
        return make_response(jsonify({"data": output}), 200)

    def _parse_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('seanceId')
        return parser.parse_args()


class FutureMovieSeancesData(Resource):
    @login_required
    def get(self):
        movie_id = self._parse_args()['movieId']
        today = datetime.now().date()
        if movie_id is None:
            return make_response(jsonify({'message': ApiMessages.ID_NOT_PROVIDED.value}), 400)
        seances = SeanceModel.query.filter(SeanceModel.date >= today).filter(SeanceModel.movieId == movie_id).all()
        output = SeanceSchema(many=True).dump(seances)
        return make_response(jsonify({"data": output}), 200)

    def _parse_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('movieId')
        return parser.parse_args()

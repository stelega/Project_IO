def test_new_employee(new_employee):
    assert new_employee.id == 1
    assert new_employee.name == 'Jan'
    assert new_employee.surname == 'Kowalski'
    assert new_employee.login == 'jkowalski'
    assert new_employee.password == 'Passw0rd'
    assert not new_employee.is_admin
    assert repr(new_employee) == "<User Jan + Kowalski"


def test_new_movie(new_movie):
    assert new_movie.id == 1
    assert new_movie.title == "Film"
    assert new_movie.director == "Rezyser"
    assert new_movie.release_date == "2020-5-12"
    assert new_movie.age_category == "+16"
    assert new_movie.movie_category == "Film akcji"
    assert new_movie.availability
    assert new_movie.duration == 120


def test_new_hall(new_hall):
    assert new_hall.id == 1
    assert new_hall.num_of_seats == 40
    assert new_hall.availability


def test_new_seance(new_seance):
    assert new_seance.id == 1
    assert new_seance.time == "18:00:00"
    assert new_seance.date == "2020-5-12"
    assert new_seance.hall_id == 1
    assert new_seance.movie_id == 1
    assert new_seance.tickets_sold == 10


def test_new_seat(new_seat):
    assert new_seat.id == 1
    assert new_seat.row == 1
    assert new_seat.hall_id == 1


def test_new_ticket(new_ticket):
    assert new_ticket.id == 1
    assert new_ticket.price == 18.00
    assert new_ticket.discount == 0.00
    assert new_ticket.seat_id == 1
    assert new_ticket.seance_id == 1


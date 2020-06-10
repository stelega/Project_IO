from enum import Enum


class ApiMessages(Enum):
    RECORD_NOT_FOUND = "Rekord nie istnieje"
    ID_NOT_PROVIDED = "ID rekordu nie zostalo przekazane"
    INTERNAL = "Bład wewnętrzny serwera"
    HALL_EXISTS = "Istnieje już sala o nazwie: "
    HALL_NEEDS_NAME = "Sala musi posiadać nazwę"
    CANNOT_REMOVE_SEATS = "Nie można zmniejszyć liczby rzędów/siedzeń\n - w przyszłości istnieje seans, na który " \
                          "sprzedane zostały bilety"
    CANNOT_REMOVE_HALL = "Nie można usunąć sali przypisanej do przyszłego seansu"
    USER_ALREADY_EXISTS = "Podany użytkownik już istnieje"
    COULD_NOT_VERIFY = "Nie udało się zweryfikować użytkownika"
    NO_ACCESS_PERMISSION = "Odmowa dostępu"
    LOGIN_OR_PASSWORD_INCORRECT = "Login lub hasło niepoprawne"
    TOKEN_MISSING = "Brak tokena autoryzacyjnego"
    TOKEN_EXPIRED = "Sesja wygasła"
    NOT_EXISTING_COLUMN_SORT = "Próba wykonania sortowania na nieistniejącej kolumnie: "
    TICKET_ALREADY_EXIST = "Bilet na to miejsce na ten seans już istnieje"
    CANNOT_REMOVE_SEANCE_WITH_TICKETS = "Nie można usunąć seansu na który sprzedane zostały bilety"
    CANNOT_REMOVE_MOVIE_WITH_FUTURE_SEANCES = "Nie można usunąć seansu, który ma zaplanowane seanse"


if __name__ == '__main__':
    a = "nazwa"
    print(ApiMessages.RECORD_NOT_FOUND.value + a)

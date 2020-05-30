from enum import Enum


class Genre(Enum):
    FANTASY = "Fantasy"
    DRAMA = "Dramat"
    HORROR = "Horror"
    COMEDY = "Komedia"

    @staticmethod
    def get_all_list():
        return [genre.value for genre in Genre]


class AgeCategory(Enum):
    NO_AGE_LIMIT = "Bez ograniczeń"
    SEVEN_PLUS = "7+"
    TWELVE_PLUS = "12+"
    SIXTEEN_PLUS = "16+"
    EIGHTEEN_PLUS = "18+"

    @staticmethod
    def get_all_list():
        return [category.value for category in AgeCategory]

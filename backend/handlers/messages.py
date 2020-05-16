from enum import Enum


class ApiMessages(Enum):
    RECORD_NOT_FOUND = "Record not found"
    ID_NOT_PROVIDED = "ID of record not passed"
    INTERNAL = "Internal error"

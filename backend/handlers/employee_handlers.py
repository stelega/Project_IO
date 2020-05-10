from flask_restful import Resource
from database.models import EmployeeModel


class EmployeesData(Resource):
    def get(self):
        employees = EmployeeModel.query.all()
        results = [
            {
                "employee_id": employee.employee_id,
                "name": employee.name,
                "surname": employee.surname,
            } for employee in employees]

        return {"count": len(results), "employees": results}

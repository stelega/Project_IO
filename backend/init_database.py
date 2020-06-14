from passlib.hash import bcrypt

from database.config import database_url
from database.database import db
from database.models import EmployeeModel
from main import create_app

#   WARNING
#   THIS SCRIPT SHOULD BE RUN ONCE TO CREATE DATABASE STRUCTURE IN CONNECTED DATABASE
#   AND CREATE ONE ADMIN USER FOR LATER REMOVAL
#
#   IT'S NOT RECOMMENDED TO RUN THIS SCRIPT MULTIPLE TIMES
#   AS IT WILL TRY TO CREATE SAME USER AND ERROR HANDLING IS NOT PROVIDED WITHIN SCRIPT

if __name__ == '__main__':
    app = create_app(database_url)
    with app.app_context():
        db.create_all()
        db.session.commit()
        admin = EmployeeModel(name="Super", surname="Admin", login="admin",
                              password=str(bcrypt.hash("admin")), isAdmin=True)
        db.session.add(admin)
        db.session.commit()

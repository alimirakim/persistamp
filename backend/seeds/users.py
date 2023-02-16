from werkzeug.security import generate_password_hash
from backend.models import db, User
from datetime import datetime

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(username="DemoUser",
                first_name="Demo",
                last_name="User",
                email="demo@gmail.com",
                hashed_password="pbkdf2:sha256:150000$vCX0hKgt$29bfb9894101cb9b426a40b4f4d7c4f22011aca3eb2494fc66235fe81e74762c",
                birthday=datetime(1990, 12, 25),
                color_id=11,
                icon_id=1,
                )

    db.session.add(demo)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.execute('ALTER SEQUENCE users_id_seq RESTART WITH 1')
    db.session.commit()

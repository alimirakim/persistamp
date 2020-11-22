from flask import Flask
from flask_migrate import Migrate
from app.config import Configuration
from app.models import db
from app.routes import users, programs, members, habits, rewards

app = Flask(__name__)
app.config.from_object(Configuration)
app.register_blueprint(users)
app.register_blueprint(programs)
app.register_blueprint(members)
app.register_blueprint(habits)
app.register_blueprint(rewards)
db.init_app(app)
Migrate(app, db)


@app.route("/")
def root():
    return "Persistamp!"

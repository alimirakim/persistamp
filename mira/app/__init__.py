from flask import Flask
from flask_migrate import Migrate
from app.config import Configuration
from app.models import db

app = Flask(__name__)
app.config.from_object(Configuration)
db.init_app(app)
Migrate(app, db)

@app.route("/")
def root():
    return "Persistamp!"
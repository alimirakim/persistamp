import os
from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import (db,
                     User,
                     Program,
                     Membership,
                     Activity,
                     Stamp,
                     Reward,
                     Receipt,
                     Bond,
                     Icon,
                     Color)
from .api import (user_routes,
                  auth_routes,
                  program_routes,
                  activity_routes,
                  activity_detail_routes,
                  membership_routes,
                  reward_routes,
                  stamp_routes)
from .utils import dump_data_list

from .seeds import seed_commands
from .config import Config

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    print("loading...", id)
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
# app.register_blueprint(users, url_prefix='/api/users')
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(program_routes, url_prefix="/api/programs")
app.register_blueprint(activity_routes, url_prefix="/api/activities")
app.register_blueprint(activity_detail_routes, url_prefix="/api/activity-details")
app.register_blueprint(membership_routes, url_prefix="/api/memberships")
app.register_blueprint(reward_routes, url_prefix="/api/rewards")
app.register_blueprint(stamp_routes, url_prefix="/api/stamps")

db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


@app.before_request
def redirect_https():
    # print("REQUEST", request.url)
    if os.environ.get("FLASK_ENV") == "production":
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            # if not url.endswith('/'):
            #     url += '/'
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('cookies', "sugar pumpkin")
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path:", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


@app.route("/api/options")
def options():
    """Return color and stamp options from database"""
    colors = Color.query.all()
    icons = Icon.query.all()
    icon_types = []
    for icon in icons:
        if icon.type not in icon_types:
            icon_types.append(icon.type)
    return jsonify(
        colors_data={c.id:c.to_dict() for c in colors},
        icons_data={i.id:i.to_dict() for i in icons},
        icon_types=icon_types,)

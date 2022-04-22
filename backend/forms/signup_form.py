from flask_wtf import FlaskForm
from wtforms import StringField, DateField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
from wtforms.widgets.html5 import (DateInput)
from backend.models import User
from .validators import title_char_count


def email_exists(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("User is already registered.")

def username_exists(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("User is already registered.")


class SignUpForm(FlaskForm):
    first_name = StringField(validators=[DataRequired(), title_char_count])
    last_name = StringField(validators=[DataRequired(), title_char_count])
    username = StringField(validators=[DataRequired(), username_exists, title_char_count])
    birthday = StringField()

    email = StringField(validators=[DataRequired(), email_exists])
    password = StringField(validators=[DataRequired()])

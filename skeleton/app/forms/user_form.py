from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField
from wtforms.validators import DataRequired


class UserForm(FlaskForm):
    username = StringField(validators=[DataRequired()])
    firstname = StringField(validators=[DataRequired()])
    lastname = StringField(validators=[DataRequired()])
    color = SelectField(validators=[DataRequired()], choices=range(1,30))
    stamp = SelectField(validators=[DataRequired()], choices=range(1,14))
    submit = SubmitField()
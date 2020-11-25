from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Habit


class HabitForm(FlaskForm):
    habit = StringField("habit", validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    frequency = SelectField('frequency', validators=[DataRequired()], choices=[("7", "7"), ("14", "14"), ("30", "30")])
    color = SelectField('frequency', validators=[DataRequired()], choices=[(1 , "Blue"), (2, "Green"), (3, "Pink")])
    submit = SubmitField("Create")
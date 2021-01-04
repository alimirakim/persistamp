from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField
from wtforms.validators import DataRequired



class HabitForm(FlaskForm):
    habit = StringField(validators=[DataRequired()])
    description = StringField()
    frequency = SelectField(validators=[DataRequired()], choices=range(1,8), default=7)
    color = SelectField(validators=[DataRequired()], choices=range(1,30), default=1)
    stamp = SelectField(validators=[DataRequired()], choices=range(1,14), default=3)
    submit = SubmitField()
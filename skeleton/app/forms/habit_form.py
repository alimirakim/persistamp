from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField
from wtforms.validators import DataRequired



class HabitForm(FlaskForm):
    habit = StringField("habit", validators=[DataRequired()])
    description = StringField('description')
    frequency = SelectField('frequency', validators=[DataRequired()], choices=range(1,8), default=7)
    color = SelectField('Color', validators=[DataRequired()], choices=range(1,30), default=1)
    stamp = SelectField("Stamp", validators=[DataRequired()], choices=range(1,14), default=3)
    submit = SubmitField("Create")
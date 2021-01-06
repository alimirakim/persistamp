from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField
from wtforms.validators import DataRequired
from app.utils import colors, stamps


class HabitForm(FlaskForm):
    habit = StringField(validators=[DataRequired()])
    description = StringField()
    frequency = SelectField(validators=[DataRequired()], choices=range(1,8), default=7)
    color = SelectField(validators=[DataRequired()], 
                        choices=range(1, len(colors)+1), 
                        default=1)
    stamp = SelectField(validators=[DataRequired()], 
                        choices=range(1, len(stamps)+1), 
                        default=3)
    submit = SubmitField()
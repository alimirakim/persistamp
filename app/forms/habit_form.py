from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField
from wtforms.validators import DataRequired
from app.utils import colors, icons


class HabitForm(FlaskForm):
    title = StringField(validators=[DataRequired()])
    description = StringField()
    frequency = SelectField(validators=[DataRequired()], choices=range(1,8), default=7)
    color = SelectField(validators=[DataRequired()], 
                        choices=range(1, len(colors)+1), 
                        default=1)
    icon = SelectField(validators=[DataRequired()], 
                        choices=range(1, len(icons)+1), 
                        default=3)
    submit = SubmitField()
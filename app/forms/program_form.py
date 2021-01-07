from wtforms import StringField, SelectField, SubmitField
from flask_wtf import FlaskForm
from wtforms.validators import DataRequired
from app.utils import colors, icons


class ProgramForm(FlaskForm):
    """A backend form to map form data for validation."""
    title = StringField(validators=[DataRequired()])
    description = StringField()
    color = SelectField(validators=[DataRequired()], 
                        choices=range(1, len(colors)+1), 
                        default=1)
    icon = SelectField(validators=[DataRequired()], 
                        choices=range(1, len(icons)+1), 
                        default=2)
    submit = SubmitField()
from wtforms import StringField, SelectField, SubmitField
from flask_wtf import FlaskForm
from wtforms.validators import DataRequired
from app.utils import colors, stamps


class ProgramForm(FlaskForm):
    """A backend form to map form data for validation."""
    program = StringField(validators=[DataRequired()])
    description = StringField()
    color = SelectField(validators=[DataRequired()], 
                        choices=range(1, len(colors)+1), 
                        default=1)
    stamp = SelectField(validators=[DataRequired()], 
                        choices=range(1, len(stamps)+1), 
                        default=2)
    submit = SubmitField()
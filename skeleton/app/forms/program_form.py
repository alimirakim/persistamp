from wtforms import StringField, SelectField, SubmitField
from flask_wtf import FlaskForm
from wtforms.validators import DataRequired


class ProgramForm(FlaskForm):
    """A backend form to map form data for validation."""
    program = StringField(validators=[DataRequired()])
    description = StringField()
    color = SelectField(default=1, choices=range(1, 24), validators=[DataRequired()])
    stamp = SelectField(default=2, choices=range(1, 30), validators=[DataRequired()])
    submit = SubmitField()
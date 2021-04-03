from wtforms import StringField, SelectField, BooleanField, SubmitField
from flask_wtf import FlaskForm
from wtforms.validators import DataRequired
from backend.utils import colors, icons
from .validators import title_char_count, desc_char_count


class ProgramForm(FlaskForm):
    """A backend form to map form data for validation."""
    title = StringField(validators=[DataRequired(), title_char_count])
    description = StringField(validators=[desc_char_count])
    cid = SelectField(validators=[DataRequired()], 
                        choices=range(1, len(colors)+1), 
                        default=1)
    iid = SelectField(validators=[DataRequired()], 
                        choices=range(1, len(icons)+1), 
                        default=2)
    has_shop = BooleanField()
    submit = SubmitField()
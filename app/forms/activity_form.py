from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SelectField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.utils import colors, icons
from .validators import title_char_count, desc_char_count


class ActivityForm(FlaskForm):
    title = StringField(validators=[DataRequired(), title_char_count])
    description = StringField(validators=[desc_char_count])
    frequency = SelectField(validators=[DataRequired()], choices=range(1,8), default=7)
    cid = SelectField(validators=[DataRequired()], 
                        choices=range(1, len(colors)+1), 
                        default=1)
    iid = SelectField(validators=[DataRequired()], 
                        choices=range(1, len(icons)+1), 
                        default=3)
    stampValue = IntegerField(default=1)
    submit = SubmitField()
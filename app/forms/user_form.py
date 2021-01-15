from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField
from wtforms.validators import DataRequired
from app.utils import colors, icons


def validateDate():
    """Check that the string is a valid date."""
    pass

class UserForm(FlaskForm):
    username = StringField(validators=[DataRequired()])
    firstname = StringField(default="N/A")
    lastname = StringField(default="N/A")
    birthday = StringField()
    cid = SelectField(validators=[DataRequired()], 
                        choices=range(1, len(colors)+1), 
                        default=8)
    iid = SelectField(validators=[DataRequired()], 
                        choices=range(1, len(icons)+1), 
                        default=473)
    submit = SubmitField()
from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField
from wtforms.validators import DataRequired
from app.utils import colors, stamps


class UserForm(FlaskForm):
    username = StringField(validators=[DataRequired()])
    firstname = StringField(validators=[DataRequired()])
    lastname = StringField(validators=[DataRequired()])
    color = SelectField(validators=[DataRequired()], 
                        choices=range(1, len(colors)+1), 
                        default=1)
    stamp = SelectField(validators=[DataRequired()], 
                        choices=range(1, len(stamps)+1), 
                        default=1)
    submit = SubmitField()
from wtforms import StringField, IntegerField, SelectField, SubmitField
from wtforms.validators import DataRequired
from flask_wtf import FlaskForm
from app.utils import colors, stamps


class RewardForm(FlaskForm):
    """Backend form to map form inputs for validation."""
    reward = StringField(validators=[DataRequired()])
    description = StringField()
    color = SelectField(validators=[DataRequired()], 
                        choices=range(1, len(colors)+1), 
                        default=1)
    stamp = SelectField(validators=[DataRequired()], 
                        choices=range(1, len(stamps)+1), 
                        default=4)
    submit = SubmitField()
    limit = IntegerField(default=-1)
    quantity = IntegerField(default=1)
    submit = SubmitField()
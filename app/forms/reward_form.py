from wtforms import StringField, IntegerField, SelectField, validators
from wtforms.validators import DataRequired
from flask_wtf import FlaskForm
from app.utils import colors, icons


class RewardForm(FlaskForm):
    """Backend form to map form inputs for validation."""
    title = StringField(validators=[DataRequired()])
    description = StringField()
    cid = SelectField(validators=[DataRequired()], 
                        choices=range(1, len(colors)+1), 
                        default=1)
    iid = SelectField(validators=[DataRequired()], 
                        choices=range(1, len(icons)+1), 
                        default=4)
    cost = IntegerField(default=5)
    limit = IntegerField(default=-1, validators=[validators.optional()])
    quantity = IntegerField(default=-1, validators=[validators.optional()])
from wtforms import StringField, IntegerField, SelectField, SubmitField
from wtforms.validators import DataRequired
from flask_wtf import FlaskForm


class RewardForm(FlaskForm):
    """Backend form to map form inputs for validation."""
    reward = StringField(validators=[DataRequired()])
    description = StringField()
    color = SelectField(validators=[DataRequired()], choices=range(1,30), default=1)
    stamp = SelectField(validators=[DataRequired()], choices=range(1, 30), default=4) 
    cost = IntegerField(validators=[DataRequired()], default=7)
    limit = IntegerField(default=-1)
    quantity = IntegerField(default=1)
    submit = SubmitField()
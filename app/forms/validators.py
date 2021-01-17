from wtforms.validators import ValidationError


def title_char_count(form, field):
    if len(field.data) > 25:
        raise ValidationError("Too long. Max of 25 characters.")


def desc_char_count(form, field):
    if len(field.data) > 250:
        raise ValidationError("Too long. Max of 250 characters.")

"""empty message

Revision ID: 35f5750e2f37
Revises: 6e06cb974576
Create Date: 2021-01-13 03:41:34.465807

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '35f5750e2f37'
down_revision = '6e06cb974576'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('habits', sa.Column('private', sa.Boolean(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('habits', 'private')
    # ### end Alembic commands ###

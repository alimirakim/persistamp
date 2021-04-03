"""empty message

Revision ID: a1a4688899b0
Revises: 8a5cb98975f0
Create Date: 2021-03-23 08:30:56.257033

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a1a4688899b0'
down_revision = '8a5cb98975f0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('activities', sa.Column('description', sa.String(length=250), nullable=True))
    op.add_column('activities', sa.Column('title', sa.String(length=25), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('activities', 'title')
    op.drop_column('activities', 'description')
    # ### end Alembic commands ###
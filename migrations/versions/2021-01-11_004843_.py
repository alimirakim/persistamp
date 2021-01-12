"""empty message

Revision ID: e9afcd44ae02
Revises: f442d50488ba
Create Date: 2021-01-11 00:48:43.210613

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e9afcd44ae02'
down_revision = 'f442d50488ba'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('habits', sa.Column('title', sa.String(length=50), nullable=False))
    op.drop_column('habits', 'habit')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('habits', sa.Column('habit', sa.VARCHAR(length=50), autoincrement=False, nullable=False))
    op.drop_column('habits', 'title')
    # ### end Alembic commands ###
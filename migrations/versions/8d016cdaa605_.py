"""empty message

Revision ID: 8d016cdaa605
Revises: 86b26e06804f
Create Date: 2021-02-01 04:26:45.789957

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8d016cdaa605'
down_revision = '86b26e06804f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('redeemed', sa.Column('color_id', sa.Integer(), nullable=True))
    op.add_column('redeemed', sa.Column('cost', sa.Integer(), nullable=False))
    op.add_column('redeemed', sa.Column('description', sa.String(length=250), nullable=True))
    op.add_column('redeemed', sa.Column('icon_id', sa.Integer(), nullable=False))
    op.add_column('redeemed', sa.Column('program_id', sa.Integer(), nullable=True))
    op.add_column('redeemed', sa.Column('title', sa.String(length=50), nullable=False))
    op.alter_column('redeemed', 'reward_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.create_foreign_key(None, 'redeemed', 'programs', ['program_id'], ['id'])
    op.create_foreign_key(None, 'redeemed', 'colors', ['color_id'], ['id'])
    op.create_foreign_key(None, 'redeemed', 'icons', ['icon_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'redeemed', type_='foreignkey')
    op.drop_constraint(None, 'redeemed', type_='foreignkey')
    op.drop_constraint(None, 'redeemed', type_='foreignkey')
    op.alter_column('redeemed', 'reward_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.drop_column('redeemed', 'title')
    op.drop_column('redeemed', 'program_id')
    op.drop_column('redeemed', 'icon_id')
    op.drop_column('redeemed', 'description')
    op.drop_column('redeemed', 'cost')
    op.drop_column('redeemed', 'color_id')
    # ### end Alembic commands ###

"""empty message

Revision ID: f2f59cf7481d
Revises: 8d016cdaa605
Create Date: 2021-02-07 14:48:01.081185

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'f2f59cf7481d'
down_revision = '8d016cdaa605'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('receipts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('activity_id', sa.Integer(), nullable=True),
    sa.Column('reward_id', sa.Integer(), nullable=True),
    sa.Column('program_id', sa.Integer(), nullable=True),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.Column('description', sa.String(length=250), nullable=True),
    sa.Column('color_id', sa.Integer(), nullable=False),
    sa.Column('icon_id', sa.Integer(), nullable=False),
    sa.Column('value', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['color_id'], ['colors.id'], ),
    sa.ForeignKeyConstraint(['icon_id'], ['icons.id'], ),
    sa.ForeignKeyConstraint(['program_id'], ['programs.id'], ),
    sa.ForeignKeyConstraint(['reward_id'], ['rewards.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('redeemed')
    op.add_column('activities', sa.Column('interval', sa.Integer(), nullable=True))
    op.add_column('activities', sa.Column('stamp_value', sa.Integer(), nullable=True))
    op.add_column('programs', sa.Column('activity_ids_order', postgresql.ARRAY(sa.Integer()), nullable=False))
    op.add_column('programs', sa.Column('reward_ids_order', postgresql.ARRAY(sa.Integer()), nullable=False))
    op.drop_column('programs', 'rew_ids_order')
    op.drop_column('programs', 'aids_order')
    op.add_column('users', sa.Column('points', sa.Integer(), nullable=False))
    op.add_column('users', sa.Column('program_ids_order', postgresql.ARRAY(sa.Integer()), nullable=False))
    op.add_column('users', sa.Column('reward_ids_order', postgresql.ARRAY(sa.Integer()), nullable=False))
    op.drop_column('users', 'pids_order')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('pids_order', postgresql.ARRAY(sa.INTEGER()), autoincrement=False, nullable=True))
    op.drop_column('users', 'reward_ids_order')
    op.drop_column('users', 'program_ids_order')
    op.drop_column('users', 'points')
    op.add_column('programs', sa.Column('aids_order', postgresql.ARRAY(sa.INTEGER()), autoincrement=False, nullable=True))
    op.add_column('programs', sa.Column('rew_ids_order', postgresql.ARRAY(sa.INTEGER()), autoincrement=False, nullable=True))
    op.drop_column('programs', 'reward_ids_order')
    op.drop_column('programs', 'activity_ids_order')
    op.drop_column('activities', 'stamp_value')
    op.drop_column('activities', 'interval')
    op.create_table('redeemed',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('reward_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.Column('color_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('cost', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('description', sa.VARCHAR(length=250), autoincrement=False, nullable=True),
    sa.Column('icon_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('program_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('title', sa.VARCHAR(length=50), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['color_id'], ['colors.id'], name='redeemed_color_id_fkey'),
    sa.ForeignKeyConstraint(['icon_id'], ['icons.id'], name='redeemed_icon_id_fkey'),
    sa.ForeignKeyConstraint(['program_id'], ['programs.id'], name='redeemed_program_id_fkey'),
    sa.ForeignKeyConstraint(['reward_id'], ['rewards.id'], name='redeemed_reward_id_fkey'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='redeemed_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='redeemed_pkey')
    )
    op.drop_table('receipts')
    # ### end Alembic commands ###

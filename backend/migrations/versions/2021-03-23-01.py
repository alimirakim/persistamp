"""empty message

Revision ID: 8a5cb98975f0
Revises: f2f59cf7481d
Create Date: 2021-03-23 08:00:53.068688

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '8a5cb98975f0'
down_revision = 'f2f59cf7481d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('colors',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('hex', sa.String(length=7), nullable=False),
    sa.Column('title', sa.String(length=50), nullable=True),
    sa.Column('mode', sa.String(length=50), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('hex'),
    sa.UniqueConstraint('title')
    )
    op.create_table('icons',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.Column('type', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('title')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=25), nullable=False),
    sa.Column('first_name', sa.String(length=25), nullable=False),
    sa.Column('last_name', sa.String(length=25), nullable=True),
    sa.Column('email', sa.String(length=320), nullable=False),
    sa.Column('color_id', sa.Integer(), nullable=True),
    sa.Column('icon_id', sa.Integer(), nullable=False),
    sa.Column('birthday', sa.Date(), nullable=True),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('private', sa.Boolean(), nullable=False),
    sa.Column('program_ids_order', postgresql.ARRAY(sa.Integer()), nullable=False),
    sa.Column('reward_ids_order', postgresql.ARRAY(sa.Integer()), nullable=False),
    sa.Column('points', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['color_id'], ['colors.id'], ),
    sa.ForeignKeyConstraint(['icon_id'], ['icons.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('bonds',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user1_id', sa.Integer(), nullable=False),
    sa.Column('user2_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user1_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user2_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('programs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=25), nullable=False),
    sa.Column('description', sa.String(length=250), nullable=True),
    sa.Column('is_private', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('creator_id', sa.Integer(), nullable=False),
    sa.Column('icon_id', sa.Integer(), nullable=False),
    sa.Column('color_id', sa.Integer(), nullable=True),
    sa.Column('activity_ids_order', postgresql.ARRAY(sa.Integer()), nullable=False),
    sa.Column('reward_ids_order', postgresql.ARRAY(sa.Integer()), nullable=False),
    sa.ForeignKeyConstraint(['color_id'], ['colors.id'], ),
    sa.ForeignKeyConstraint(['creator_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['icon_id'], ['icons.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('activities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('stamp_value', sa.Integer(), nullable=False),
    sa.Column('frequency', sa.Integer(), nullable=True),
    sa.Column('interval', sa.Integer(), nullable=True),
    sa.Column('quota', sa.Integer(), nullable=True),
    sa.Column('expiry', sa.DateTime(), nullable=True),
    sa.Column('bonus', sa.Integer(), nullable=True),
    sa.Column('creator_id', sa.Integer(), nullable=True),
    sa.Column('program_id', sa.Integer(), nullable=True),
    sa.Column('color_id', sa.Integer(), nullable=False),
    sa.Column('icon_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('is_private', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['color_id'], ['colors.id'], ),
    sa.ForeignKeyConstraint(['creator_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['icon_id'], ['icons.id'], ),
    sa.ForeignKeyConstraint(['program_id'], ['programs.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('memberships',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('program_id', sa.Integer(), nullable=False),
    sa.Column('member_id', sa.Integer(), nullable=False),
    sa.Column('stamper_id', sa.Integer(), nullable=True),
    sa.Column('points', sa.Integer(), nullable=False),
    sa.Column('joined_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['member_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['program_id'], ['programs.id'], ),
    sa.ForeignKeyConstraint(['stamper_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('rewards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(length=50), nullable=False),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.Column('description', sa.String(length=250), nullable=True),
    sa.Column('cost', sa.Integer(), nullable=False),
    sa.Column('limit_per_member', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('creator_id', sa.Integer(), nullable=True),
    sa.Column('program_id', sa.Integer(), nullable=True),
    sa.Column('color_id', sa.Integer(), nullable=True),
    sa.Column('icon_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['color_id'], ['colors.id'], ),
    sa.ForeignKeyConstraint(['creator_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['icon_id'], ['icons.id'], ),
    sa.ForeignKeyConstraint(['program_id'], ['programs.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('receipts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.Column('description', sa.String(length=250), nullable=True),
    sa.Column('value', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('color_id', sa.Integer(), nullable=False),
    sa.Column('icon_id', sa.Integer(), nullable=False),
    sa.Column('activity_id', sa.Integer(), nullable=True),
    sa.Column('reward_id', sa.Integer(), nullable=True),
    sa.Column('program_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['activity_id'], ['activities.id'], ),
    sa.ForeignKeyConstraint(['color_id'], ['colors.id'], ),
    sa.ForeignKeyConstraint(['icon_id'], ['icons.id'], ),
    sa.ForeignKeyConstraint(['program_id'], ['programs.id'], ),
    sa.ForeignKeyConstraint(['reward_id'], ['rewards.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('stamps',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('status', sa.String(), nullable=False),
    sa.Column('activity_id', sa.Integer(), nullable=False),
    sa.Column('membership_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['activity_id'], ['activities.id'], ),
    sa.ForeignKeyConstraint(['membership_id'], ['memberships.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('stamps')
    op.drop_table('receipts')
    op.drop_table('rewards')
    op.drop_table('memberships')
    op.drop_table('activities')
    op.drop_table('programs')
    op.drop_table('bonds')
    op.drop_table('users')
    op.drop_table('icons')
    op.drop_table('colors')
    # ### end Alembic commands ###

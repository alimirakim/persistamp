from flask.cli import AppGroup
from .colors import seed_colors, undo_colors
from .icons import seed_icons, undo_icons
from .users import seed_users, undo_users
from .programs import seed_programs, undo_programs
from .activities import seed_activities, undo_activities
from .memberships import seed_memberships, undo_memberships
from .stamps import seed_stamps, undo_stamps
from .rewards import seed_rewards, undo_rewards

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_icons()
    seed_colors()
    seed_users()
    seed_programs()
    seed_activities()
    seed_memberships()
    seed_stamps()
    seed_rewards()
    
    
# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_rewards()
    undo_stamps()
    undo_memberships()
    undo_activities()
    undo_programs()
    undo_users()
    undo_colors()
    undo_icons()
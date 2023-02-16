from backend.models import db, Membership
from datetime import datetime

def seed_memberships():

    member_demo1 = Membership(
        program_id=1, member_id=1, stamper_id=1, points=27, joined_at=datetime(2022, 1, 1)
    )
    member_demo2 = Membership(
        program_id=2, member_id=1, stamper_id=1, points=15, joined_at=datetime(2022, 1, 15)
    )
    member_demo3 = Membership(
        program_id=3, member_id=1, stamper_id=1, points=3, joined_at=datetime(2022, 1, 30)
    )


    members = [member_demo1, member_demo2, member_demo3]
    for member in members:
        db.session.add(member)

    db.session.commit()

def undo_memberships():
    db.session.execute('TRUNCATE memberships CASCADE;')
    db.session.execute('ALTER SEQUENCE memberships_id_seq RESTART WITH 1')
    db.session.commit()

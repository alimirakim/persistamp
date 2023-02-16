from backend.models import db, Program
from datetime import date

def seed_programs():

    program_one = Program(title="Work",
                          description="bring home the bacon",
                          has_shop=True,
                          color_id=1,
                          creator_id=1,
                          icon_id=28,
                          created_at=date(2022, 1, 1),
                          )
    program_two = Program(title="Social",
                          description="family and friends",
                          has_shop=True,
                          color_id=23,
                          creator_id=1,
                          icon_id=8,
                          created_at=date(2022, 1, 15),
                          )
    program_three = Program(title="Chores and errands",
                            description="just do it",
                            has_shop=True,
                            color_id=12,
                            creator_id=1,
                            icon_id=6,
                            created_at=date(2022, 1, 30),
                            )

    programs = [program_one, program_two, program_three,]

    for program in programs:
        db.session.add(program)

    db.session.commit()

def undo_programs():
    db.session.execute('TRUNCATE programs CASCADE;')
    db.session.execute('ALTER SEQUENCE programs_id_seq RESTART WITH 1')
    db.session.commit()

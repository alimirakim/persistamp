from flask import Blueprint, render_template, redirect, jsonify, request
from sqlalchemy.orm import joinedload
from app.models import db, Program, User, Member
from app.schemas import program_schema, user_schema, color_schema, stamp_schema
from app.forms import ProgramForm
from flask_login import current_user

program_routes = Blueprint("programs", __name__, url_prefix="/programs")


# TESTED Returns a program json
@program_routes.route("/<int:pid>")
def program_details(pid):
    """Get a program's details by id."""
    program = Program.query.filter(Program.id == pid).one()
    return jsonify(program_schema.dump(program))
    
    
# TESTED Functions, creates new program.
@program_routes.route("/create", methods=["POST"])
def create_program():
    """Create a new program."""
    form = ProgramForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        program = Program(
            program=form.data['program'],
            description=form.data['description'],
            color_id=form.data['color'],
            stamp_id=form.data['stamp'],
            creator_id=request.json['userId'],
        )
        db.session.add(program)
        db.session.commit()
        
        member = Member(program_id=program.id,
                        member_id=request.json['userId'],
                        stamper_id=request.json['userId'],)
        db.session.add(member)
        db.session.commit()

        program_data = program_schema.dump(program)
        program_data["color"] = color_schema.dump(program.color)
        program_data["stamp"] = stamp_schema.dump(program.stamp)
        program_data["creator"] = user_schema.dump(program.creator)
        ("\n\nPROGRAM DUMP", program_data)
        
        updated_user = user_schema.dump(current_user)
        
        return jsonify(program=program_data, updated_user=updated_user)
    return "D: No program made"


# TESTED Functions
@program_routes.route("/edit/<int:pid>", methods=["PATCH"])
def edit_program(pid):
    """Edit a program's details."""
    form = ProgramForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate():
        program = Program.query.options(joinedload(Program.color), joinedload(Program.stamp), joinedload(Program.creator)).get(pid)
        program.program = form.data['program']
        program.description = form.data['description']
        program.color_id = form.data['color']
        program.stamp_id = form.data['stamp']
        
        db.session.commit()
        program_data = program_schema.dump(program)
        program_data["color"] = color_schema.dump(program.color)
        program_data["stamp"] = stamp_schema.dump(program.stamp)
        program_data["creator"] = user_schema.dump(program.creator)

        print("\nEDITED PROGRAM", program_data)
        return jsonify(program_data)
    return "Failure D: Edit program not!"


@program_routes.route("/<int:pid>", methods=["DELETE"])
def delete_program(pid):
    """Delete a program by id."""
    program = Program.query.get(pid)
    db.session.delete(program)
    db.session.commit()
    updated_user = user_schema.dump(current_user)
    return updated_user


# TODO How do I filter this?
# Untested
@program_routes.route("/<int:pid>/stampers")
def program_stampers(pid):
    """Get a list of a program's stampers and their details."""
    stampers = User.query.filter().all()
    return jsonify(dump_data_list(stampers, user_schema))


# TODO How the heckers
# Untested
@program_routes.route("/<int:pid>/stampers/<int:uid>")
def program_stamper_members(pid, uid):
    """Get a stamper's details and a list of the members they stamp for."""
    stamper = User.query.filter().one()
    return jsonify(user_schema.dump(stamper))
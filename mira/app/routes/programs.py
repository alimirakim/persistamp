from flask import Blueprint, render_template, redirect
from app.models import Program, User, Member
from app.schemas import program_schema, user_schema, member_schema

programs = Blueprint("programs", __name__, url_prefix="/programs")


# PROGRAMS
@programs.route("/", methods=["POST"])
def create_program():
    """Create a new program."""
    # program = Program(program=program,
    #                   description=,
    #                   color=,
    #                   stamp_id=,
    #                   creator_id=,)
    # db.session.add(program)
    db.session.commit()
    program_data = program_schema.dump(program)
    return jsonify(program_data)
    
  
@programs.route("/<int:pid>")
def program_details(pid):
    """Get a program's details by id."""
    program = Program.query.filter(Program.id == pid).one()
    return jsonify(program_schema.dump(program))
  

@programs.route("/<int:pid>", methods=["PATCH"])
def edit_program(pid):
    """Edit a program's details."""
    program = Program.query.filter(Program.id == pid).one()
    # program.program = 
    # program.description = 
    # program.color = 
    # program.stamp_id = 
    # program.creator_id = 
    db.session.commit()
    return jsonify(program_schema.dump(program))


# TODO Does this need cascade delete?
@programs.route("/<int:pid>", methods=["DELETE"])
def delete_program(pid):
    """Delete a program by id."""
    program = Program.query.filter(Program.id == pid).one()
    db.session.delete(program)
    return "Program successfully deleted!"


# TODO How do I filter this?
@programs.route("/<int:pid>/stampers")
def program_stampers(pid):
    """Get a list of a program's stampers and their details."""
    stampers = User.query.filter().all()
    return jsonify(dump_data_list(stampers, user_schema))


# TODO How the heckers
@programs.route("/<int:pid>/stampers/<int:uid>")
def program_stamper_members(pid, uid):
    """Get a stamper's details and a list of the members they stamp for."""
    stamper = User.query.filter().one()
    return jsonify(user_schema.dump(stamper))
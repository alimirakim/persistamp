from flask import Blueprint, render_template, redirect, jsonify, request
from app.models import db, Program, User, Member
from app.schemas import program_schema, user_schema, member_schema

program_routes = Blueprint("programs", __name__, url_prefix="/programs")


# TESTED Returns a program json
@program_routes.route("/<int:pid>")
def program_details(pid):
    """Get a program's details by id."""
    program = Program.query.filter(Program.id == pid).one()
    return jsonify(program_schema.dump(program))
    
    
# TESTED Functions, creates new program.
@program_routes.route("/", methods=["POST"])
def create_program():
    """Create a new program."""
    data = request.json
    program = Program(program=data["program"], creator_id=data["creator_id"])
    
    if "description" in data.keys():
        program.description = data["description"]
    if "color" in data.keys():
        program.color = data["color"]
    if "stamp_id" in data.keys():
        program.stamp_id = data["stamp_id"]
        
    db.session.add(program)
    db.session.commit()
    return jsonify(program_schema.dump(program))


# TESTED Functions
@program_routes.route("/<int:pid>", methods=["PATCH"])
def edit_program(pid):
    """Edit a program's details."""
    data = request.json
    program = Program.query.filter(Program.id == pid).one()
    
    if "program" in data.keys():
        program.program = data["program"]
    if "description" in data.keys():
        program.description = data["description"]
    if "color" in data.keys():
        program.color = data["color"]
    if "stamp_id" in data.keys():
        program.stamp_id = data["stamp_id"]
        
    db.session.commit()
    return jsonify(program_schema.dump(program))


# TODO Does this need cascade delete?
# TESTED Functions
@program_routes.route("/<int:pid>", methods=["DELETE"])
def delete_program(pid):
    """Delete a program by id."""
    program = Program.query.filter(Program.id == pid).one()
    db.session.delete(program)
    db.session.commit()
    return "Program successfully deleted!"


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
from flask import Blueprint, render_template, redirect, jsonify, request
from sqlalchemy.orm import joinedload
from flask_login import current_user
from app.models import db, Program, User, Membership
from app.schemas import program_schema, user_schema, color_schema, icon_schema
from app.forms import ProgramForm
from app.utils import queryUserFullData, validation_errors_to_error_messages
from pprint import pprint

program_routes = Blueprint("programs", __name__, url_prefix="/programs")


# TESTED Returns a program json
@program_routes.route("/<int:pid>")
def program_details(pid):
    """Get a program's details by id."""
    program = Program.query.filter(Program.id == pid).one()
    return program.to_dict()
    
    
# TESTED Functions, creates new program.
@program_routes.route("/create", methods=["POST"])
def create_program():
    """Create a new program."""
    form = ProgramForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        program = Program(
            title=form.data["title"],
            description=form.data['description'],
            color_id=form.data['cid'],
            icon_id=form.data["iid"],
            creator_id=request.json['userId'],
            has_shop=form.data["hasShop"],
        )
        db.session.add(program)
        db.session.commit()
        
        membership = Membership(program_id=program.id,
                        member_id=request.json['userId'],
                        stamper_id=request.json['userId'],)
        db.session.add(membership)
        db.session.commit()

        # programs_data, activities_data, stamps_data, user_data, past_week = queryUserFullData(current_user.id)
        print("\nprogram...")
        pprint(program)
        return program.to_dict_for_user(current_user.id)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# TESTED Functions
@program_routes.route("/edit/<int:pid>", methods=["PATCH"])
def edit_program(pid):
    """Edit a program's details."""
    form = ProgramForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("\n\nEDIT PROGRAM ROUTE", form.data)
    
    if form.validate():
        program = Program.query.options(joinedload(Program.color), joinedload(Program.icon), joinedload(Program.creator)).get(pid)
        program.title = form.data['title']
        program.description = form.data['description']
        program.color_id = form.data['cid']
        program.icon_id = form.data["iid"]
        
        db.session.commit()

        return program.to_dict_for_user(current_user.id)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@program_routes.route("/<int:pid>", methods=["DELETE"])
def delete_program(pid):
    """Delete a program by id."""
    program = Program.query.get(pid)
    db.session.delete(program)
    db.session.commit()
    updated_user = queryUserFullData(current_user.id)
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
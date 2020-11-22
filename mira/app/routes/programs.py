from flask import Blueprint, render_template, redirect

programs = Blueprint("programs", __name__, url_prefix="/programs")



# PROGRAMS
@programs.route("/", methods=["POST"])
def create_program():
    """Create a new program."""
    pass
  
@programs.route("/<int:pid>")
def program():
    """Get a program's details by id."""
    pass
  

@programs.route("/<int:pid>", methods=["PATCH"])
def edit_program():
    """Edit a program's details."""
    pass 


@programs.route("/<int:pid>", methods=["DELETE"])
def delete_program():
    """Delete a program by id."""
    pass


# PROGRAM STAMPERS
@programs.route("/<int:pid>/stampers")
def program_stampers():
    """Get a list of a program's stampers and their details."""
    pass


@programs.route("/<int:pid>/stampers/<int:uid>")
def program_stamper_members():
    """Get a stamper's details and a list of the members they stamp for."""
    pass

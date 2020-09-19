from flask import Blueprint, render_template

REACT_BLUEPRINT = Blueprint("/", __name__, static_folder="static", template_folder="templates")

@REACT_BLUEPRINT.route("/")
def react():
    return render_template("index.html")
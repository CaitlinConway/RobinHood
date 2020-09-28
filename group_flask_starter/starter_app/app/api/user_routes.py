
from flask import Blueprint, jsonify, request, session, redirect, url_for
from app.models import User
from passlib.hash import sha256_crypt


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def index():
    response = User.query.all()
    return {"users": [user.to_dict() for user in response]}


@user_routes.route("/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter(User.email == data["email"] and
                             sha256_crypt.verify(data.password, User.password)).one()
    if user:
        session["userId"] = user.id
        print(f"success, {user.id, user.email}")
        return {"id": user.id, "email": user.email}

    return "error, user not found"


@user_routes.route("/logout", methods=["DELETE"])
def logout():
    if "userId" in session:
        session.pop('userId', None)
        return redirect(url_for("react_root"))
    return "error, already logged out"

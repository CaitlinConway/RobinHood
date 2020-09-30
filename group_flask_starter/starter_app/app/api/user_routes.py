
from flask import Blueprint, jsonify, request, session, redirect, url_for
from app.models import User, db, Watchlist
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


@user_routes.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    user = User.query.filter(User.email == data["email"]).first()
    if user:
        return {"error": "This user account already exists."}
    if (len(data["password"]) < 8):
        return {"error": "Password must be at least 8 characters."}
    elif data:
        newWatchlist = Watchlist(name=data["email"])
        db.session.add(newWatchlist)
        db.session.commit()
        createdWatchlist = Watchlist.query.filter(Watchlist.name == data["email"]).first()
        newUser = User(email=data["email"],
                       password=sha256_crypt.hash(data["password"]),
                       firstName=data["firstName"],
                       lastName=data["lastName"],
                       balance=(data["balance"] if "balance" in data else 0),
                       watchlist=createdWatchlist)
        db.session.add(newUser)
        db.session.commit()
        created = User.query.filter(User.email == data["email"]).first()
        return {"id": created.id, "email": created.email}

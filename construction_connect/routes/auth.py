from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from datetime import timedelta

from ..models import db, User      

auth_bp = Blueprint("auth_bp", __name__)
 
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    username = data.get("username")
    email    = data.get("email")
    password = data.get("password")
    role     = data.get("role", "apprentice")

    if not (username and email and password):
        return {"error": "Missing required fields"}, 400
    if User.query.filter_by(email=email).first():
        return {"error": "Email already registered"}, 409

    hashed_pw = generate_password_hash(password)
    user = User(username=username, email=email, password=hashed_pw, role=role)
    db.session.add(user)
    db.session.commit()
    return {"message": "User registered"}, 201


#  Login 
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email    = data.get("email")
    password = data.get("password")

    if not (email and password):
        return {"error": "Email and password required"}, 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return {"error": "Invalid credentials"}, 401

    token = create_access_token(identity=user.id, expires_delta=timedelta(hours=3))
    return {
        "message": "Login successful",
        "access_token": token,
        "user": {"id": user.id, "username": user.username, "role": user.role},
    }, 200

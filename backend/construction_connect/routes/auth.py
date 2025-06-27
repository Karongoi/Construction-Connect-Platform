from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from ..models import db, User

auth_bp = Blueprint("auth_bp", __name__)


# Register Route

@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json() or {}
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        role = data.get("role", "Apprentice")

        if not (username and email and password):
            return jsonify({"error": "Missing required fields"}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"error": "Email already registered"}), 409

        user = User(username=username, email=email, role=role)
        user.set_password(password)

        db.session.add(user)
        db.session.commit()

        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        print("REGISTER ERROR:", e)
        return jsonify({"error": str(e)}), 500



# Login Route with Debug Logs

@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json() or {}
        email = data.get("email")
        password = data.get("password")

        print("LOGIN STEP 1: Got data:", data)

        user = User.query.filter_by(email=email).first()

        print("LOGIN STEP 2: Fetched user:", user)

        if not user:
            print("LOGIN STEP 3: No user found with that email.")
            return jsonify({"error": "Invalid credentials"}), 401

        if not user.check_password(password):
            print("LOGIN STEP 4: Password incorrect.")
            return jsonify({"error": "Invalid credentials"}), 401

        print("LOGIN STEP 5: Credentials valid. Creating token...")
        token = create_access_token(identity=user.id, expires_delta=timedelta(hours=3))
        print("LOGIN STEP 6: Token created successfully.")

        return jsonify({
            "message": "Login successful",
            "access_token": token,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role
            }
        }), 200

    except Exception as e:
        print("LOGIN ERROR:", e)
        return jsonify({"error": str(e)}), 500



# Get Authenticated User

@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def get_current_user():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)

        if not user:
            return jsonify({"error": "User not found"}), 404

        return jsonify({
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role,
            }
        }), 200

    except Exception as e:
        print("ME ERROR:", e)
        return jsonify({"error": str(e)}), 500

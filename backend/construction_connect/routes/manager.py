from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from construction_connect.models import db, User, Answer, Question

manager_bp = Blueprint("manager_bp", __name__)

# Helper: check if current user is a manager
def is_manager():
    user = User.query.get(get_jwt_identity())
    return user and user.role == "Manager"

#  Get all users (Manager only)
@manager_bp.route("/manager/users", methods=["GET"])
@jwt_required()
def get_all_users():
    if not is_manager():
        return jsonify({"error": "Access denied"}), 403

    users = User.query.all()
    return jsonify([
        {
            "id": u.id,
            "username": u.username,
            "email": u.email,
            "role": u.role
        }
        for u in users
    ]), 200

#  Promote/Demote a user (Manager only)
@manager_bp.route("/manager/users/<int:user_id>/role", methods=["PATCH"])
@jwt_required()
def update_user_role(user_id):
    if not is_manager():
        return jsonify({"error": "Access denied"}), 403

    data = request.get_json()
    new_role = data.get("role")
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    user.role = new_role
    db.session.commit()
    return jsonify({"message": f"User role updated to {new_role}"}), 200

#  Delete an answer (Manager only)
@manager_bp.route("/manager/answers/<int:answer_id>", methods=["DELETE"])
@jwt_required()
def delete_answer(answer_id):
    if not is_manager():
        return jsonify({"error": "Access denied"}), 403

    answer = Answer.query.get(answer_id)
    if not answer:
        return jsonify({"error": "Answer not found"}), 404

    db.session.delete(answer)
    db.session.commit()
    return jsonify({"message": "Answer deleted"}), 200

#  Platform summary dashboard (Manager only)
@manager_bp.route("/manager/dashboard", methods=["GET"])
@jwt_required()
def dashboard():
    if not is_manager():
        return jsonify({"error": "Access denied"}), 403

    return jsonify({
        "total_users": User.query.count(),
        "total_questions": Question.query.count(),
        "total_answers": Answer.query.count(),
    }), 200

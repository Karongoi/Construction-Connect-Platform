from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from construction_connect.models import db, User, Answer, Question
from construction_connect.helpers import is_manager
from flask_cors import cross_origin

manager_bp = Blueprint("manager_bp", __name__)


# USER MANAGEMENT


@manager_bp.route("/users", methods=["GET"])
@jwt_required()
@cross_origin(origin='https://construction-connect-platform-1.onrender.com/')
def get_all_users():
    if not is_manager():
        return jsonify({"error": "Access denied"}), 403

    users = User.query.all()
    return jsonify([
        {"id": u.id, "username": u.username, "email": u.email, "role": u.role}
        for u in users
    ]), 200

@manager_bp.route("/users/<int:user_id>/role", methods=["PATCH"])
@jwt_required()
@cross_origin(origin='https://construction-connect-platform-1.onrender.com/')
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


# ANSWER MODERATION


@manager_bp.route("/answers/<int:answer_id>", methods=["DELETE"])
@jwt_required()
@cross_origin(origin='https://construction-connect-platform-1.onrender.com/')
def delete_answer(answer_id):
    if not is_manager():
        return jsonify({"error": "Access denied"}), 403

    answer = Answer.query.get(answer_id)
    if not answer:
        return jsonify({"error": "Answer not found"}), 404

    db.session.delete(answer)
    db.session.commit()
    return jsonify({"message": "Answer deleted"}), 200


# DASHBOARD & STATS


@manager_bp.route("/dashboard", methods=["GET"])
@jwt_required()
@cross_origin(origin='https://construction-connect-platform-1.onrender.com/')
def dashboard():
    if not is_manager():
        return jsonify({"error": "Access denied"}), 403

    return jsonify({
        "total_users": User.query.count(),
        "total_questions": Question.query.count(),
        "total_answers": Answer.query.count(),
    }), 200

@manager_bp.route("/user-stats", methods=["GET"])
@jwt_required()
@cross_origin(origin='https://construction-connect-platform-1.onrender.com/')
def user_stats():
    if not is_manager():
        return jsonify({"error": "Access denied"}), 403

    users = User.query.all()
    stats = []
    for user in users:
        stats.append({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role,
            "questions_count": len(user.questions),
            "answers_count": len(user.answers)
        })

    return jsonify(stats), 200


# QUESTION MODERATION


@manager_bp.route("/moderate/questions", methods=["GET"])
@jwt_required()
@cross_origin(origin='https://construction-connect-platform-1.onrender.com/')
def get_all_questions_for_moderation():
    if not is_manager():
        return jsonify({"error": "Access denied"}), 403

    answered = request.args.get("answered")
    if answered is not None:
        is_answered = answered.lower() == "true"
        questions = Question.query.filter_by(is_answered=is_answered).order_by(Question.created_at.desc()).all()
    else:
        questions = Question.query.order_by(Question.created_at.desc()).all()

    return jsonify([
        {
            "id": q.id,
            "title": q.title,
            "body": q.body,
            "tags": q.tags,
            "user_id": q.user_id,
            "asked_by": q.user.username if q.user else "Unknown",
            "created_at": q.created_at.isoformat() if q.created_at else None,
            "is_answered": q.is_answered
        }
        for q in questions
    ]), 200

@manager_bp.route("/moderate/questions/<int:question_id>", methods=["DELETE"])
@jwt_required()
@cross_origin(origin='https://construction-connect-platform-1.onrender.com/')
def delete_question(question_id):
    if not is_manager():
        return jsonify({"error": "Access denied"}), 403

    question = Question.query.get(question_id)
    if not question:
        return jsonify({"error": "Question not found"}), 404

    db.session.delete(question)
    db.session.commit()
    return jsonify({"message": f"Question ID {question_id} deleted"}), 200

@manager_bp.route("/moderate/questions/<int:question_id>/mark-answered", methods=["PATCH", "OPTIONS"])
@jwt_required(optional=True)
@cross_origin(origin='https://construction-connect-platform-1.onrender.com/', methods=["PATCH", "OPTIONS"], allow_headers=["Content-Type", "Authorization"])
def mark_question_as_answered(question_id):
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight OK"}), 200

    if not is_manager():
        return jsonify({"error": "Access denied"}), 403

    question = Question.query.get(question_id)
    if not question:
        return jsonify({"error": "Question not found"}), 404

    question.is_answered = True
    db.session.commit()
    return jsonify({"message": f"Question {question_id} marked as answered"}), 200

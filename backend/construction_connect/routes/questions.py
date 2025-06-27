from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from construction_connect.models import db, Question, User
from construction_connect.helpers import is_manager

questions_bp = Blueprint(
    "questions_bp",
    __name__,
    url_prefix="/questions",  # <-- define it here
    strict_slashes=False      # <-- prevent redirect issues
)

# POST a new question
@questions_bp.route("/", methods=["POST"])
@jwt_required()
def post_question():
    user_id = get_jwt_identity()
    data = request.get_json()

    q = Question(
        title=data.get("title"),
        body=data.get("body"),
        tags=data.get("tags", ""),
        user_id=user_id
    )
    db.session.add(q)
    db.session.commit()

    return {
        "message": "Question posted",
        "id": q.id
    }, 201

# GET all questions
@questions_bp.route("/", methods=["GET"])
@jwt_required()
def get_questions():
    questions = Question.query.order_by(Question.created_at.desc()).all()

    return jsonify([
        {
            "id": q.id,
            "title": q.title,
            "body": q.body,
            "tags": q.tags,
            "user_id": q.user_id,
            "asked_by": q.user.username if q.user else "Unknown",
            "created_at": q.created_at.isoformat()
        }
        for q in questions
    ]), 200

# DELETE a question
@questions_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_question(id):
    if not is_manager():
        return jsonify({"error": "Access denied. Manager only."}), 403

    question = Question.query.get(id)
    if not question:
        return jsonify({"error": "Question not found"}), 404

    db.session.delete(question)
    db.session.commit()
    return jsonify({"message": "Question deleted"}), 200

# UPDATE a question
@questions_bp.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update_question(id):
    if not is_manager():
        return jsonify({"error": "Access denied. Manager only."}), 403

    question = Question.query.get(id)
    if not question:
        return jsonify({"error": "Question not found"}), 404

    data = request.get_json()
    question.title = data.get("title", question.title)
    question.body = data.get("body", question.body)
    question.tags = data.get("tags", question.tags)

    db.session.commit()
    return jsonify({"message": "Question updated"}), 200

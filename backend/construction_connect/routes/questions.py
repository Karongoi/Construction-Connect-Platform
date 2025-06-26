from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from construction_connect.models import db, Question, User

questions_bp = Blueprint("questions_bp", __name__)

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

# GET all questions (with optional JWT protection)
@questions_bp.route("/", methods=["GET"])
@jwt_required()  # 🔐 Remove this line if you want it public
def get_questions():
    questions = Question.query.order_by(Question.created_at.desc()).all()

    return jsonify([
        {
            "id": q.id,
            "title": q.title,
            "body": q.body,
            "user_id": q.user_id,
            "asked_by": q.user.username,  # Ensure `user` relationship is loaded
            "created_at": q.created_at.isoformat()
        }
        for q in questions
    ]), 200

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import db, Question

questions_bp = Blueprint("questions_bp", __name__)

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
    return {"message": "Question posted", "id": q.id}, 201

@questions_bp.route("/", methods=["GET"])
def get_questions():
    questions = Question.query.all()
    return jsonify([
        {"id": q.id, "title": q.title, "body": q.body, "user_id": q.user_id}
        for q in questions
    ])

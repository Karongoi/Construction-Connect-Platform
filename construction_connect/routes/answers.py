from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import db, Answer, Question

answers_bp = Blueprint("answers_bp", __name__)

@answers_bp.route("/<int:question_id>", methods=["POST"])
@jwt_required()
def post_answer(question_id):
    user_id = get_jwt_identity()
    data = request.get_json()

    question = Question.query.get(question_id)
    if not question:
        return {"error": "Question not found"}, 404

    answer = Answer(
        body=data.get("body"),
        user_id=user_id,
        question_id=question_id
    )
    db.session.add(answer)
    db.session.commit()
    return {"message": "Answer posted"}, 201

@answers_bp.route("/<int:question_id>", methods=["GET"])
def get_answers(question_id):
    answers = Answer.query.filter_by(question_id=question_id).all()
    return jsonify([
        {"id": a.id, "body": a.body, "user_id": a.user_id}
        for a in answers
    ])

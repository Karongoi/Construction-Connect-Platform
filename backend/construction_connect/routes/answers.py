from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from construction_connect.models import db, Answer, Question

answers_bp = Blueprint("answers_bp", __name__)

# POST: Create an answer
@answers_bp.route("/<int:question_id>", methods=["POST"])
@jwt_required()
def post_answer(question_id):
    user_id = get_jwt_identity()
    data = request.get_json()

    question = Question.query.get(question_id)
    if not question:
        return jsonify({"error": "Question not found"}), 404

    answer = Answer(
        body=data.get("body"),
        user_id=user_id,
        question_id=question_id
    )
    db.session.add(answer)
    db.session.commit()

    return jsonify({
        "message": "Answer posted",
        "answer": {
            "id": answer.id,
            "body": answer.body,
            "user_id": answer.user_id,
            "question_id": answer.question_id,
            "created_at": answer.created_at.isoformat() if answer.created_at else None
        }
    }), 201

# GET: All answers for a question
@answers_bp.route("/<int:question_id>", methods=["GET"])
def get_answers(question_id):
    answers = Answer.query.filter_by(question_id=question_id).order_by(Answer.created_at.desc()).all()

    return jsonify([
        {
            "id": a.id,
            "body": a.body,
            "user_id": a.user_id,
            "question_id": a.question_id,
            "created_at": a.created_at.isoformat() if a.created_at else None
        }
        for a in answers
    ]), 200

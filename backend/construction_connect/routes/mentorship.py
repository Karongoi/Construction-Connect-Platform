from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from construction_connect.models import db, User, MentorshipRequest, Mentorship

mentorship_bp = Blueprint("mentorship_bp", __name__)



# Apprentice sends mentorship request

@mentorship_bp.route("/request", methods=["POST"])
@jwt_required()
def request_mentorship():
    data = request.get_json()
    current_user_id = get_jwt_identity()

    mentor_id = data.get("mentor_id")
    if not mentor_id:
        return jsonify({"error": "mentor_id is required"}), 400

    if int(mentor_id) == current_user_id:
        return jsonify({"error": "You cannot request mentorship from yourself"}), 400

    mentor = User.query.get(mentor_id)
    if not mentor or mentor.role != "Journeyman":
        return jsonify({"error": "Selected user is not a valid Journeyman"}), 404

    existing = MentorshipRequest.query.filter_by(
        apprentice_id=current_user_id,
        mentor_id=mentor_id
    ).first()

    if existing:
        return jsonify({"message": "Mentorship request already exists"}), 200

    request_entry = MentorshipRequest(
        apprentice_id=current_user_id,
        mentor_id=mentor_id,
        status="pending"
    )

    db.session.add(request_entry)
    db.session.commit()

    return jsonify({
        "message": "Mentorship request sent",
        "request_id": request_entry.id
    }), 201



# Apprentice views sent mentorship requests

@mentorship_bp.route("/requests/sent", methods=["GET"])
@jwt_required()
def view_sent_requests():
    current_user_id = get_jwt_identity()
    sent_requests = MentorshipRequest.query.filter_by(apprentice_id=current_user_id).all()

    result = []
    for r in sent_requests:
        mentor = User.query.get(r.mentor_id)
        result.append({
            "id": r.id,
            "mentor_id": r.mentor_id,
            "mentor_name": mentor.username if mentor else "Unknown",
            "status": r.status,
            "created_at": r.created_at.isoformat()
        })

    return jsonify(result), 200



# Journeyman views received mentorship requests

@mentorship_bp.route("/requests/received", methods=["GET"])
@jwt_required()
def view_received_requests():
    current_user_id = get_jwt_identity()
    received_requests = MentorshipRequest.query.filter_by(mentor_id=current_user_id).all()

    result = []
    for r in received_requests:
        apprentice = User.query.get(r.apprentice_id)
        result.append({
            "id": r.id,
            "apprentice_id": r.apprentice_id,
            "apprentice_name": apprentice.username if apprentice else "Unknown",
            "status": r.status,
            "created_at": r.created_at.isoformat()
        })

    return jsonify(result), 200



# Journeyman responds to mentorship request

@mentorship_bp.route("/requests/<int:request_id>", methods=["PATCH"])
@jwt_required()
def respond_to_request(request_id):
    current_user_id = get_jwt_identity()
    data = request.get_json()
    action = data.get("action")

    mentorship_request = MentorshipRequest.query.get(request_id)

    if not mentorship_request or mentorship_request.mentor_id != current_user_id:
        return jsonify({"error": "Request not found or unauthorized"}), 404

    if action == "accept":
        mentorship_request.status = "approved"

        # Automatically create mentorship entry
        mentorship = Mentorship(
            apprentice_id=mentorship_request.apprentice_id,
            mentor_id=current_user_id,
            status="active"
        )
        db.session.add(mentorship)

    elif action == "reject":
        mentorship_request.status = "rejected"
    else:
        return jsonify({"error": "Invalid action"}), 400

    db.session.commit()
    return jsonify({"message": f"Mentorship request {action}ed"}), 200

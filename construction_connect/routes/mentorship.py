from flask import Blueprint

mentorship_bp = Blueprint('mentorship', __name__)

@mentorship_bp.route('/', methods=['GET'])
def index():
    return {"message": "Mentorship endpoint works!"}
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

mentorship_bp = Blueprint('mentorship_bp', __name__)

@mentorship_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    user_id = get_jwt_identity()
    return jsonify(message=f"Welcome to the mentorship dashboard, user #{user_id}")

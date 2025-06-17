from flask import Blueprint

mentorship_bp = Blueprint('mentorship', __name__)

@mentorship_bp.route('/', methods=['GET'])
def index():
    return {"message": "Mentorship endpoint works!"}

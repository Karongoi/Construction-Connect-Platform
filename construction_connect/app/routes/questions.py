from flask import Blueprint

questions_bp = Blueprint('questions', __name__)

@questions_bp.route('/', methods=['GET'])
def index():
    return {"message": "Questions endpoint works!"}

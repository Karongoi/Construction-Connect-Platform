from flask import Blueprint

answers_bp = Blueprint('answers', __name__)

@answers_bp.route('/', methods=['GET'])
def index():
    return {"message": "Answers endpoint works!"}

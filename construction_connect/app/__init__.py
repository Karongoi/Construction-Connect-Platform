from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from .config import Config

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # register blueprints
    from .routes.auth import auth_bp
    from .routes.questions import questions_bp
    from .routes.answers import answers_bp
    from .routes.mentorship import mentorship_bp

    app.register_blueprint(auth_bp,       url_prefix="/auth")
    app.register_blueprint(questions_bp,  url_prefix="/questions")
    app.register_blueprint(answers_bp,    url_prefix="/answers")
    app.register_blueprint(mentorship_bp, url_prefix="/mentorship")

    # ensure models are imported 
    from . import models        

    return app

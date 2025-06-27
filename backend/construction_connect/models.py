from . import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password_hash = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), nullable=False)
    trade_interests = db.Column(db.String(200))
    skill_level = db.Column(db.String(50))

    questions = db.relationship("Question", backref="user", lazy=True, cascade="all, delete-orphan")
    answers = db.relationship("Answer", backref="user", lazy=True, cascade="all, delete-orphan")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Question(db.Model):
    __tablename__ = "questions"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    body = db.Column(db.Text, nullable=False)
    tags = db.Column(db.String(200))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    is_answered = db.Column(db.Boolean, default=False)  # used for moderation

    answers = db.relationship("Answer", backref="question", lazy=True, cascade="all, delete-orphan")


class Answer(db.Model):
    __tablename__ = "answers"
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey("questions.id"), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())


class Mentorship(db.Model):
    __tablename__ = "mentorships"
    id = db.Column(db.Integer, primary_key=True)
    apprentice_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    mentor_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    status = db.Column(db.String(20), default="pending")

    apprentice = db.relationship("User", foreign_keys=[apprentice_id], backref="requested_mentorships")
    mentor = db.relationship("User", foreign_keys=[mentor_id], backref="mentorship_requests")


class MentorshipRequest(db.Model):
    __tablename__ = "mentorship_requests"
    id = db.Column(db.Integer, primary_key=True)
    apprentice_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    mentor_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    status = db.Column(db.String(50), default="pending")
    created_at = db.Column(db.DateTime, server_default=db.func.now())

from flask_jwt_extended import get_jwt_identity
from construction_connect.models import User

def get_current_user():
    """Returns the currently logged-in user object"""
    user_id = get_jwt_identity()
    return User.query.get(user_id)

def is_manager():
    """Returns True if user is a Manager or Site Manager"""
    user = get_current_user()
    return user and user.role.lower() in ["manager", "site manager"]

def is_site_manager():
    """Returns True if user is a Site Manager"""
    user = get_current_user()
    return user and user.role.lower() == "site manager"

def is_apprentice():
    """Returns True if user is an Apprentice"""
    user = get_current_user()
    return user and user.role.lower() == "apprentice"

def is_journeyman():
    """Returns True if user is a Journeyman"""
    user = get_current_user()
    return user and user.role.lower() == "journeyman"

# services/auth_service.py
from app.models.user import User
from app.utils.database import db  
from flask import session
from werkzeug.security import generate_password_hash, check_password_hash

def register_user(username, email, password, confirm_password):
    if not all([username, email, password, confirm_password]):
        return {"error": "All fields are required"}, 400

    if password != confirm_password:
        return {"error": "Passwords do not match"}, 400

    if User.query.filter_by(email=email).first():
        return {"error": "Email already registered"}, 400

    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    # ✅ Set session
    session['user_id'] = user.id
    session['username'] = user.username
    session['email'] = user.email

    return {"message": "User registered successfully"}, 201


def login_user(email, password):
    if not all([email, password]):
        return {"error": "Email and password are required"}, 400

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        session['user_id'] = user.id
        session['username'] = user.username
        session['email'] = user.email

        return {
            "message": "Login successful",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
        }, 200
    else:
        return {"error": "Invalid email or password"}, 401

def logout_user():
    session.clear()
    return {"message": "Logged out successfully"}, 200

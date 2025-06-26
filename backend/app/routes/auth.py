from flask import Blueprint, request, jsonify, session
from app.services.auth_service import register_user, login_user, logout_user

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    response, status_code = register_user(
        data.get('username'),
        data.get('email'),
        data.get('password'),
        data.get('confirmPassword')
    )
    return jsonify(response), status_code

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    response, status_code = login_user(
        data.get('email'),
        data.get('password')
    )
    return jsonify(response), status_code

@auth_bp.route('/logout', methods=['POST'])
def logout():
    response, status_code = logout_user()
    return jsonify(response), status_code

@auth_bp.route('/me', methods=['GET'])
def get_current_user():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "Not logged in"}), 401

    return jsonify({
        "id": session['user_id'],
        "username": session['username'],
        "email": session['email']
    }), 200

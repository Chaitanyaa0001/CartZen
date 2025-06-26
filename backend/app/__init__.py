# app/__init__.py

from flask import Flask
from flask_cors import CORS
from app.utils.database import db  
from config import Config
import os


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, origins=[app.config['FRONTEND_ORIGIN']], supports_credentials=True)
    
    db.init_app(app)

    # Import models to register them
    from app.models.user import User
    from app.models.product import Product
    # from app.models.product import Product

    # Register blueprints
    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    from app.routes.products import products_bp
    app.register_blueprint(products_bp)

    from app.routes.chatbot import chatbot_bp
    app.register_blueprint(chatbot_bp)



    # Add other blueprints like chat_bp here if needed
    return app

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.services.userService import UserService

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)



@api.route('/log_in', methods=['POST'])
def log_in():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"error": "Email y contraseña son obligatorios"}), 400

        user = UserService.log_in(email, password)

        if not user:
            return jsonify({"error": "Credenciales incorrectas"}), 401


        return jsonify({
            "message": "Inicio de sesión exitoso",
           
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/sign_up', methods=['POST'])
def sign_up():
    try:
        user_data = request.get_json()

        required_fields = ["nick", "user_name", "email", "birth_date", "password"]
        if not all(field in user_data for field in required_fields):
            return jsonify({"error": "Faltan campos obligatorios"}), 400

        if UserService.existe(user_data):
            return jsonify({"error": "El usuario ya está registrado"}), 409

        UserService.crear_usuario(user_data)

        return jsonify({"message": "Registro exitoso"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/about_us', methods=['GET'])
def about_us():
    try:
        return jsonify({
            "company": "Tamachochi",
            "description": "Creadores del proyecto Tamachochi."
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/home', methods=['GET']) 
def home():
    try:
      
        return jsonify({
            "welcome": "Bienvenido a nuestra API",
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

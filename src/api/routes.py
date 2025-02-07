from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity,create_access_token
from api.models import db, User
from api.utils import generate_sitemap, APIException
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

        if not user.id:
            return jsonify({"error": "ID de usuario no válido"}), 500
        
        access_token = UserService.get_token(user)

        return jsonify({
            "message": "Inicio de sesión exitoso",
            "token": access_token ,
            "user_id":user.id
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/sign_up', methods=['POST'])
def sign_up():
    try:
        user_data = request.get_json()
        required_fields = ["user_name", "email", "password_hash"]
        if not all(field in user_data for field in required_fields):
            return jsonify({"error": "Faltan campos obligatorios"}), 400

        if UserService.existe(user_data):
            return jsonify({"error": "El usuario ya está registrado"}), 409

        UserService.crear_usuario(user_data)

        return jsonify({"message": "Registro exitoso"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/user_profile', methods=['GET'])
@jwt_required()
def profile():
    try:
        print(f"Iniciando")  
        user_id = get_jwt_identity()  
        print(f" {user_id}")  
        user = UserService.get_user_by_id(user_id)  

        if not user:
            print("Usuario no encontrado. ") 
            return jsonify({"error": "Usuario no encontrado"}), 404  

        print(f"Usuario encontrado: {user.user_name}, {user.email}")  

        return jsonify({
            "user_name": user.user_name,
            "email": user.email
        }), 200  

    except Exception as e:
        print(f"Error en el endpoint de perfil: {e}") 
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

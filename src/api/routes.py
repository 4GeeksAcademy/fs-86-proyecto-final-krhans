from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from api.models import db, User
from api.utils import generate_sitemap, APIException
from api.services.userService import UserService
from api.services.routineService import RoutineService
from api.services.workoutService import WorkoutService
from api.services.trainingService import TrainingService
from api.services.workoutCompletionService import WorkoutCompletionService
from api.services.userImageService import UserImageService
from sqlalchemy.exc import SQLAlchemyError
import os

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
            "token": access_token,
            "user": user.serialize()
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

        UserService.create_user(user_data)

        return jsonify({"message": "Registro exitoso"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
@api.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    try:
        user_id = get_jwt_identity()  
        user = UserService.get_user_by_id(user_id)  

        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404

        if not user.is_active:
            return jsonify({"msg": "El usuario ya estaba inactivo"}), 200  

        updated_user = UserService.desactivate_user(user_id)  

        if not updated_user:
            return jsonify({"error": "Error al cerrar sesión"}), 500

        return jsonify({
            "message": "Sesión cerrada correctamente",
            "is_active": updated_user.is_active
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@api.route('/user_profile', methods=['GET', 'PUT'])
@jwt_required()
def user_profile():
    try:
        user_id = get_jwt_identity()  
        user = UserService.get_user_by_id(user_id)  
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404
        if request.method == 'GET':
            profile_data = user.profile.serialize() if user.profile else None
            user_image = user.user_image.serialize() if user.user_image else None
            return jsonify({
                "user_name": user.user_name,
                "email": user.email,
                "is_active": user.is_active,
                "profile": profile_data, 
                "user_image": user_image
            }), 200  

        elif request.method == 'PUT':
            data = request.get_json()
    
            if not data:
                return jsonify({"error": "Datos no proporcionados"}), 400
            updated_user = UserService.update_user(user_id, data)
            if not updated_user:
                return jsonify({"error": "Error al actualizar el perfil"}), 500
            profile_data = updated_user.profile.serialize() if updated_user.profile else None
            user_image = user.user_image.serialize() if user.user_image else None
            return jsonify({
                "message": "Perfil actualizado correctamente",
                "user_name": updated_user.user_name,
                "email": updated_user.email,
                "is_active": updated_user.is_active,
                "profile": profile_data,
                "user_image": user_image
            }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route("/user_profile/image", methods=["PUT"])
@jwt_required()
def update_profile_image():
    try:
        user_id = get_jwt_identity()
        user = UserService.get_user_by_id(user_id)

        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404

        if "image_url" not in request.json:
            return jsonify({"error": "No se ha enviado una URL de imagen"}), 400

        image_url = request.json["image_url"]

        if not image_url:
            return jsonify({"error": "URL de imagen vacía"}), 400

        img_updated = UserImageService.update_img(user_id, image_url)
        
        if not img_updated:
            return jsonify({"error": "Error al actualizar la imagen de perfil"}), 500
       
        return jsonify({
            "message": "Imagen de perfil actualizada",
            "user_image": image_url  
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



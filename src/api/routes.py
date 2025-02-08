from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity,create_access_token
from api.models import db, User
from api.utils import generate_sitemap, APIException
from api.services.userService import UserService
from api.services.routineService import RoutineService
from api.services.workoutService import WorkoutService
from api.services.trainingService import TrainingService
from api.services.workoutCompletionService import WorkoutCompletionService
from sqlalchemy.exc import SQLAlchemyError


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

        UserService.create_user(user_data)

        return jsonify({"message": "Registro exitoso"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@api.route('/user_profile', methods=['GET', 'POST'])
@jwt_required()
def user_profile():
    try:
        user_id = get_jwt_identity()  
        user = UserService.get_user_by_id(user_id)  

        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404  

        if request.method == 'GET':
           
            profile_data = user.profile.serialize() if user.profile else None
            return jsonify({
                "user_name": user.user_name,
                "email": user.email,
                "profile": profile_data 
            }), 200  

        elif request.method == 'POST':
            data = request.get_json()

            if not data:
                return jsonify({"error": "Datos no proporcionados"}), 400  

            updated_user = UserService.update_user(user_id, data)
            
            if not updated_user:
                return jsonify({"error": "Error al actualizar el perfil"}), 500
            
            profile_data = updated_user.profile.serialize() if updated_user.profile else None
            return jsonify({
                "message": "Perfil actualizado correctamente",
                "user_name": updated_user.user_name,
                "email": updated_user.email,
                "profile": profile_data
            }), 200  

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@api.route('/routines', methods=['GET', 'POST'])
@jwt_required()
def handle_routines():
    user_id = get_jwt_identity()
    try:
        if request.method == 'POST':
            data = request.get_json()
            required_fields = ["routine", "workout", "trainings"]

            if not all(field in data for field in required_fields):
                return jsonify({"error": "Faltan campos obligatorios"}), 400

            routine_data = data.get('routine')
            workout_data = data.get('workout')
            training_data = data.get('trainings')

            session = db.session

            try:
                routine = RoutineService.create_routine(routine_data, user_id)

                workout_ids = [] 
                for workout in workout_data:
                    created_workout = WorkoutService.create_workout(workout, user_id, routine.id)
                    workout_ids.append(created_workout.id)

                    for training in training_data:
                        if training['workout_id'] == created_workout.id:
                            TrainingService.create_training(training, user_id, created_workout.id)

                    WorkoutCompletionService.create_workout_completion(user_id, created_workout.id)

                session.commit()

                return jsonify({
                    "message": "Rutina creada exitosamente",
                    "routine_id": routine.id,
                    "workout_ids": workout_ids
                }), 201

            except SQLAlchemyError as e:
                session.rollback()
                return jsonify({"error": f"Error de base de datos: {str(e)}"}), 500

        elif request.method == 'GET':
            routines = RoutineService.get_routine_list(user_id)
            
            return jsonify([{
                "id": routine.id,
                "name": routine.name,
                "description": routine.description,
                "days_per_week": routine.days_per_week
            } for routine in routines]), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500








# @api.route('/complete_workout', methods=['POST'])
# def complete_workout():
#     # Suponiendo que recibimos el ID del workout y el ID del usuario
#     user_id = request.json.get('user_id')
#     workout_id = request.json.get('workout_id')
    
#     # Obtener la instancia del workout y del usuario
#     workout = Workout.query.get(workout_id)
#     user = User.query.get(user_id)
    
#     if not workout or not user:
#         return jsonify({"message": "Workout o usuario no encontrados"}), 404
    
#     # Verificar si el workout ya está marcado como completado
#     workout_completion = WorkoutCompletion.query.filter_by(user_id=user.id, workout_id=workout.id).first()
    
#     if workout_completion:
#         workout_completion.completed = True
#         workout_completion.date_completed = date.today()  # Establecer la fecha actual al marcar como completado
#     else:
#         # Crear un nuevo registro si no existe
#         workout_completion = WorkoutCompletion(
#             user_id=user.id,
#             workout_id=workout.id,
#             completed=True,
#             date_completed=date.today()  # Establecer la fecha actual
#         )
    
#     db.session.add(workout_completion)
#     db.session.commit()
    
#     return jsonify({"message": "Workout marcado como completado"}), 200




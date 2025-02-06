
from api.repositories.user_repository import UserRepository
from flask_jwt_extended import create_access_token
from datetime import timedelta
from argon2 import PasswordHasher

ph = PasswordHasher()


class UserService:
    @staticmethod
    def existe(user_data):
        return UserRepository.user_exists(user_data["email"])

    @staticmethod
    def crear_usuario(user_data):
        try:
            user_data["password_hash"] = ph.hash(user_data["password_hash"])
            return UserRepository.create_user(user_data)
        except Exception as e:
            raise e

    @staticmethod
    def log_in(email, password):
        user = UserRepository.get_user_by_email(email)
        
        if not user:
            return None
         
        if user.check_password(password): 
            return user
        return None

    @staticmethod
    def get_token(user):
        expires = timedelta(hours=10)
        access_token = create_access_token(identity=str(user.id), expires_delta=expires) 
        return access_token

    @staticmethod
    def get_user_by_id(user_id):
        return UserRepository.get_user_by_id(user_id) or None

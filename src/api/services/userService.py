
from api.repositories.user_repository import UserRepository
from flask_jwt_extended import create_access_token
from datetime import timedelta

class UserService:
    @staticmethod
    def existe(user_data):
        return UserRepository.user_exists(user_data["email"])

    @staticmethod
    def crear_usuario(user_data):
        try:
            return UserRepository.create_user(user_data)
        except Exception as e:
            raise e

    @staticmethod
    def log_in(email, password):
        user = UserRepository.get_user_by_email(email)
        
        if not user or password != user.password:
            return None
        
        return user

    @staticmethod
    def get_token(user):
        
        expires = timedelta(hours=1)
        access_token = create_access_token(identity=user.id, expires_delta=expires)
        return access_token
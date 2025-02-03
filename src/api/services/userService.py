
from api.repositories.user_repository import UserRepository

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
        if not user or user.password != password:
            return None 
        return user  
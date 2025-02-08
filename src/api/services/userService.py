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
    def create_user(user_data):
        try:
            user_data["password_hash"] = ph.hash(user_data["password_hash"])
            
            new_user = UserRepository.create_user(user_data)
            UserRepository.create_profile(new_user.id)  # Asegurándonos de pasar el user_id
            
            return new_user
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

    @staticmethod
    def update_user(user_id, data):
        try:
            user = UserRepository.get_user_by_id(user_id)
            if not user:
                return None  

            if "user_name" in data:
                user.user_name = data["user_name"]
            if "email" in data:
                user.email = data["email"]
            if "password_hash" in data:
                user.password_hash = ph.hash(data["password_hash"])  

            if "profile" in data:
                profile_data = data["profile"]
                if user.profile:  
                    if "edad" in profile_data:
                        user.profile.edad = profile_data["edad"]
                    if "phone_number" in profile_data:
                        user.profile.phone_number = profile_data["phone_number"]
                    if "gender" in profile_data:
                        user.profile.gender = profile_data["gender"]
                    if "description" in profile_data:
                        user.profile.description = profile_data["description"]
                else:
                    UserRepository.create_profile(user.id) 

            UserRepository.save(user) 
            return user  

        except Exception as e:
            raise e

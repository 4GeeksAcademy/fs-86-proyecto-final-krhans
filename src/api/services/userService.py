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
            UserRepository.create_profile(new_user.id) 
            
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
            if "is_active" in data:
                user.is_active =  data["is_active"]

            profile = UserRepository.get_profile_by_id(user_id)
            print("perfil: ",profile.age)
            if "profile" in data:
                profile_data = data["profile"]

                if profile is not None:  
                    if "age" in profile_data:
                        profile.age = profile_data["age"]
                    if "phone_number" in profile_data:
                        profile.phone_number = profile_data["phone_number"]
                    if "gender" in profile_data:
                        profile.gender = profile_data["gender"]
                    if "description" in profile_data:
                        profile.description = profile_data["description"]
              
            UserRepository.save(user)
            UserRepository.save(profile)  
            return user  

        except Exception as e:
            raise e


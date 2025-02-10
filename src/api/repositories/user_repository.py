
from api.models import db, User,UserProfile

class UserRepository:
    @staticmethod
    def get_user_by_email(email):
        return User.query.filter_by(email=email).first()
    @staticmethod
    def create_user(user_data):
        try:
            new_user = User(
                user_name=user_data["user_name"],
                email=user_data["email"],
                password_hash=user_data["password_hash"],
                is_active=True
            )
            db.session.add(new_user)
            db.session.commit()
            return new_user
        except Exception as e:
            db.session.rollback()
            raise e
    @staticmethod
    def user_exists(email):
        return User.query.filter_by(email=email).first() is not None
    @staticmethod
    def get_user_by_id(user_id):
        return User.query.filter_by(id=user_id).first() or None

    @staticmethod
    def get_profile_by_id(user_id):
         return UserProfile.query.filter_by(user_id=user_id).first() or None
    
    @staticmethod
    def create_profile(user_id):
        try:
            new_profile = UserProfile(user_id=user_id)
            db.session.add(new_profile)
            db.session.commit()
            return new_profile
        except Exception as e:
            db.session.rollback()
            raise e
        

    @staticmethod
    def save(user):
        db.session.commit()













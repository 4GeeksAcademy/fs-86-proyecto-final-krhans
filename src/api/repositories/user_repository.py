
from api.models import db, User

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
                password=user_data["password"], 
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
    def get_user_by_email(email):
        return User.query.filter_by(email=email).first()

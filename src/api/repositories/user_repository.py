
from api.models import db, User

class UserRepository:
    @staticmethod
    def get_user_by_email(email):
        return User.query.filter_by(email=email).first()

    @staticmethod
    def create_user(user_data):
        try:
            new_user = User(
                nick=user_data["nick"],
                user_name=user_data["user_name"],
                email=user_data["email"],
                phone_number=user_data.get("phone_number", ""),
                city=user_data.get("city", ""),
                sex=user_data.get("sex", ""),
                birth_date=user_data["birth_date"],
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

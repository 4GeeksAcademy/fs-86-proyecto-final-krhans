from api.models import db, UserImage

class UserImageRepository:
    @staticmethod
    def get_user_by_id(user_id):
        return UserImage.query.filter_by(user_id=user_id).first() or None

    @staticmethod
    def create_user_image(user_id, filename):
        try:
            new_user_image = UserImage(
                user_id=user_id,
                img=filename  
            )
            db.session.add(new_user_image)
            db.session.commit()
            return new_user_image
        except Exception as e:
            db.session.rollback()
            raise e

    
    @staticmethod
    def save(user):
        db.session.commit()
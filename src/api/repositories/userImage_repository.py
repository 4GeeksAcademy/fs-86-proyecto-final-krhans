from api.models import db, UserImage

class UserImageRepository:
    @staticmethod
    def get_user_by_id(user_id):
        return UserImage.query.filter_by(user_id=user_id).first() or None

    @staticmethod
    def create_user_image(user_id,filepaht):
        try:
            new_userImage = UserImage(
                user_id=user_id,
               img=filepaht
            )
            db.session.add(new_userImage)
            db.session.commit()
            return new_userImage
        except Exception as e:
            db.session.rollback()
            raise e
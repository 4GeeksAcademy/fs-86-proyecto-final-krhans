from api.repositories.userImage_repository import UserImageRepository

class UserImageService:
    @staticmethod
    def get_user_by_id(user_id):
        try:
            return UserImageRepository.get_user_by_id(user_id) or None
        except Exception as e:
            raise e
        
    @staticmethod
    def create_user_image(user_id,filepath):
        try:
            new_user_img = UserImageRepository.create_user_image(user_id,filepath)
            return new_user_img
        except Exception as e:
            raise e

        

from api.repositories.training_repository import TrainingRepository

class TrainingService:
    @staticmethod
    def create_training(training_data):
        try:  
            new_training = TrainingRepository.Create_training(training_data)
            return new_training
        except Exception as e:
            raise e
            

           
            

   

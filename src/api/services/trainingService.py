from api.repositories.training_repository import TrainingRepository

class TrainingService:
    @staticmethod
    def create_training(training_data,workout_id):
        try:  
            new_training = TrainingRepository.create_training(training_data,workout_id)
            return new_training
        except Exception as e:
            raise e
            
    

           
            

   

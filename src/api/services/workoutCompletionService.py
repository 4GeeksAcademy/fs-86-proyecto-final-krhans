from api.repositories.workoutCompletion_repository import WorkoutCompletionRepository

class WorkoutCompletionService:
    @staticmethod
    def create_workout_completion(user_id,workout_id):
        try:  
            new_workout = WorkoutCompletionRepository.create_workout_completion(user_id,workout_id)
            return new_workout
        except Exception as e:
            raise e
            

           
            


       
   

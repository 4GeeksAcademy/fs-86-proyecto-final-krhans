from api.repositories.workoutCompletion_repository import WorkoutCompletionRepository

class WorkoutCompletionService:
    @staticmethod
    def create_workout_completion(user_id,workout_id):
        try:  
            new_workout = WorkoutCompletionRepository.create_workout_completion(user_id,workout_id)
            return new_workout
        except Exception as e:
            raise e
            

    @staticmethod
    def get_workout_completion_list(user_id):
        try:
            workout_list=WorkoutCompletionRepository.get_workout_completion_list(user_id) 
            return workout_list or []
        except Exception as e:
            raise e
           
    @staticmethod
    def get_workout_completion_by_id(user_id,workout_id,workout_completion_id):
        try:
            workout_completion=WorkoutCompletionRepository.get_workout_completion_by_id(workout_completion_id) 
            return workout_completion or []
        except Exception as e:
            raise e
       
   

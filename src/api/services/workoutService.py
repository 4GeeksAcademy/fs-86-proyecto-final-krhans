from api.repositories.workout_repository import WorkoutRepository

class WorkoutService:
    @staticmethod
    def create_workout(workout_data,user_id,routine_id):
        try:  
            new_workout = WorkoutRepository.create_workout(workout_data,user_id,routine_id)
            return new_workout
        except Exception as e:
            raise e
            
    @staticmethod
    def get_workout_list(user_id):
        try:
            workout_list=WorkoutRepository.get_workout_list(user_id) 
            return workout_list or []
        except Exception as e:
            raise e
           
            
    @staticmethod
    def get_workout_by_id(user_id,workout_id):
        try:
            workout=WorkoutRepository.get_workout_by_id(user_id,workout_id) 
            return workout or []
        except Exception as e:
            raise e
           

       
   

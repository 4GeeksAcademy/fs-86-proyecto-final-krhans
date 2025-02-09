from api.repositories.workout_repository import WorkoutRepository

class WorkoutService:
    @staticmethod
    def create_workout(workout_data,user_id,routine_id):
        try:  
            new_workout = WorkoutRepository.create_workout(workout_data,user_id,routine_id)
            return new_workout
        except Exception as e:
            raise e
            

           
            


       
   

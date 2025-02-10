from api.models import db, WorkoutCompletion

class WorkoutCompletionRepository:
    @staticmethod
    def create_workout_completion(user_id,workout_id):
        try:
            new_workoutCompletion = WorkoutCompletion(
                user_id=user_id,
                workout_id=workout_id,
                completed=False,
                description_mood="",
                date_completed=None
              
            )
            db.session.add(new_workoutCompletion)
            db.session.flush() #El commit se hace en la session creada en la ruta
            return new_workoutCompletion
        except Exception as e:
            db.session.rollback()
            raise e


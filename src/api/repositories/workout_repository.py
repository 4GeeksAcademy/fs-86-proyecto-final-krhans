from api.models import db, Workout

class WorkoutRepository:
    @staticmethod
    def create_workout(workout_data,user_id,routine_id):
        try:
            new_routine = Workout(
                user_id=user_id,
                routine_id=routine_id,
                fitness_level=workout_data["fitness_level"],
                category=workout_data["category"],
                goal=workout_data["goal"],
                difficulty=workout_data["difficulty"],
                is_active=True
            )
            db.session.add(new_routine)
            db.session.flush() #El commit se hace en la session creada en la ruta
            return new_routine
        except Exception as e:
            db.session.rollback()
            raise e
        
    @staticmethod
    def get_workout_list(user_id):
        return Workout.query.filter_by(user_id=user_id).all() or None

    @staticmethod
    def get_workout_by_id(user_id,workout_id):
        return Workout.query.filter_by(user_id=user_id,id=workout_id).all() or None
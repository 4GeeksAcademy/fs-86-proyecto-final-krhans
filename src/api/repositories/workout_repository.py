from api.models import db, Workout
from datetime import datetime

class WorkoutRepository:
    @staticmethod
    def create_workout(workout_data,user_id,routine_id):
        
        try:
            if workout_data.get("day"):
                try:
                    day = datetime.strptime(workout_data["day"], "%Y-%m-%d").date()
                except ValueError:
                    return {"error": "Formato de fecha no válido. Usa 'YYYY-MM-DD'."}, 400


            new_routine = Workout(
                user_id=user_id,
                routine_id=routine_id,
                fitness_level=workout_data["fitness_level"],
                category=workout_data["category"],
                goal=workout_data["goal"],
                difficulty=workout_data["difficulty"],
                day = workout_data["day"],
                percent_completed=0
            )

           
            
            db.session.add(new_routine)
            db.session.flush()
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
    
    @staticmethod
    def update_workout(user_id,workout_id, data):

        existing_workout = Workout.query.filter_by(user_id=user_id,id=workout_id).first()
        if not existing_workout:
            return None

        existing_workout.percent_completed = data["percent_completed"]
      
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise Exception(f"Error al actualizar el workout: {str(e)}")
        
        return existing_workout

from api.models import db, Routine

class RoutineRepository:
    @staticmethod
    def create_routine(routine_data,user_id):
        try:
            new_routine = Routine(
                name=routine_data["name"],
                description=routine_data["description"],
                days_per_week=routine_data["days_per_week"], 
                user_id=user_id
            )
            db.session.add(new_routine)
            db.session.flush() #El commit se hace en la session creada en la ruta
            return new_routine
        except Exception as e:
            db.session.rollback()
            raise e


    @staticmethod
    def get_routine_list(user_id):
        return Routine.query.filter_by(user_id=user_id).all() or None
    
    @staticmethod
    def get_routine_by_id(routine_id,user_id):
        return Routine.query.filter_by(id=routine_id,user_id=user_id).first() or None
    
    @staticmethod
    def update_routine(routine_id, new_routine):

        existing_routine = Routine.query.filter_by(id=routine_id).first()
        if not existing_routine:
            return None

        existing_routine.name = new_routine["name"]
        existing_routine.description = new_routine["description"]
        existing_routine.days_per_week = new_routine["days_per_week"]

        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise Exception(f"Error al actualizar la rutina: {str(e)}")
        
        return existing_routine

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
            # db.session.commit() #El commit se hace en la session creada en la ruta
            return new_routine
        except Exception as e:
            db.session.rollback()
            raise e


    @staticmethod
    def get_routine_list(user_id):
        return Routine.query.filter_by(user_id=user_id).all() or None
        
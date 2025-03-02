from api.repositories.routine_repository import RoutineRepository

class RoutineService:
    @staticmethod
    def create_routine(routine_data,user_id):
        try:  
            new_routine = RoutineRepository.create_routine(routine_data,user_id)
            return new_routine
        except Exception as e:
            raise e
            
    @staticmethod
    def get_routine_list(user_id):
        try:
            routine_list=RoutineRepository.get_routine_list(user_id) 
            return routine_list or []
        except Exception as e:
            raise e
           
    @staticmethod
    def get_routine_by_id(routine_id,user_id):
        routine = RoutineRepository.get_routine_by_id(routine_id,user_id)
        
        if not routine:
            return None
        return routine

    @staticmethod
    def update_routine(routine_id, user_id, data):
        routine = RoutineRepository.get_routine_by_id(routine_id, user_id)
        if not routine:
            return None

        try:
            RoutineRepository.update_routine(routine_id,data)
            return routine
        except Exception as e:
            return {"error": f"Error al actualizar la rutina: {str(e)}"}
        

        

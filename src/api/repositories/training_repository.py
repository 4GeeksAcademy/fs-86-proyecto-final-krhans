from api.models import db, Training
from datetime import datetime


class TrainingRepository:
    @staticmethod
    def create_training(training_data, workout_id):
      
        name = training_data.get("name")
        is_completed = training_data.get("is_completed")
        mode = training_data.get("mode")
        duration = training_data.get("duration")
        repetitions = training_data.get("repetitions")
        sets = training_data.get("sets")
        rest = training_data.get("rest")
        day = training_data["day"]
      

        def convertir_a_segundos(tiempo):
            if isinstance(tiempo, str) and " " in tiempo:
                value, unit = tiempo.split()
                value = int(value)
                if "horas" in unit or "hr" in unit:
                    return value * 3600
                elif "minutos" in unit or "min" in unit:
                    return value * 60
                elif "segundos" in unit or "seg" in unit:
                    return value
                else:
                    return None 
            elif isinstance(tiempo, (int, float)):
                return int(tiempo)  
            return None 

        if duration is not None:
            duration = convertir_a_segundos(duration)
            if duration is None:
                return {"error": "Unidad de duración no válida."}, 400


        if rest is not None:
            rest = convertir_a_segundos(rest)
            if rest is None:
                return {"error": "Unidad de descanso no válida."}, 400

        if mode == "reps":
            if repetitions is None or sets is None or rest is None:
                return {"error": "Faltan campos obligatorios para entrenamientos basados en repeticiones"}, 400
        elif mode == "duration":
            if duration is None:
                return {"error": "Falta el campo 'duration' para entrenamientos por tiempo"}, 400

        if day is not None:
            try:
                day = datetime.strptime(day, "%Y-%m-%d").date()
                
            except ValueError:
                return {"error": "Formato de fecha no válido. Usa 'YYYY-MM-DD'."}, 400
        
        training = Training(
            name=name,
            is_completed=is_completed,
            mode=mode,
            duration=duration,
            repetitions=repetitions,
            sets=sets,
            rest=rest,
            day=day,
            workout_id=workout_id
        )
        db.session.add(training)

        try:
            db.session.flush()
            return training
        except Exception as e:
            db.session.rollback()
            return {"error": f"Error inesperado: {str(e)}"}, 500



        

    @staticmethod
    def get_training_list(user_id, workout_id):
        try:
            return Training.query.filter_by(user_id=user_id,workout_id=workout_id).all()or None
        except Exception as e:
            return {"error": f"Error inesperado: {str(e)}"}, 500


    @staticmethod
    def update_training(workout_id,training_id,training):
        
        existing_training = Training.query.filter_by(workout_id=workout_id,id=training_id).first()
    
        if not existing_training:
            return None

        existing_training.is_completed =True

        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise Exception(f"Error al actualizar el entrenamiento: {str(e)}")
        return existing_training
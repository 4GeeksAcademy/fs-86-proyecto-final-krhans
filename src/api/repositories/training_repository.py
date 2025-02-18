from api.models import db, Training

class TrainingRepository:
    @staticmethod
    def create_training(training_data, workout_id):
        name = training_data.get("name")
        mode = training_data.get("mode", "duration") 
        
        duration = training_data.get("duration")
        repetitions = training_data.get("repetitions")
        sets = training_data.get("sets")
        rest = training_data.get("rest")

        if mode == "reps":
            if repetitions is None or sets is None or rest is None:
                return {"error": "Faltan campos obligatorios para entrenamientos basados en repeticiones"}, 400
        elif mode == "duration":
            if duration is None:
                return {"error": "Falta el campo 'duration' para entrenamientos por tiempo"}, 400

        training = Training(
            name=name,
            mode=mode,
            duration=duration,
            repetitions=repetitions,
            sets=sets,
            rest=rest,
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



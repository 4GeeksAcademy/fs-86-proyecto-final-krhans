from api.models import db, Training

class TrainingRepository:
    @staticmethod
    def Create_training(training_data):
        try:
            new_routine = Training(
                name=training_data["name"],
                mode=training_data["mode"],
                duration=training_data["duration"],
                repetitions=training_data["repetitions"],
                sets=training_data["sets"],
                rest=training_data["rest"],
              
            )
            db.session.add(new_routine)
              # db.session.commit() #El commit se hace en la session creada en la ruta
            return new_routine
        except Exception as e:
            db.session.rollback()
            raise e



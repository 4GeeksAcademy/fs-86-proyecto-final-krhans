from flask_sqlalchemy import SQLAlchemy
from argon2 import PasswordHasher
from datetime import date
from sqlalchemy import Numeric

db = SQLAlchemy()
ph = PasswordHasher()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False, default=False)

    profile = db.relationship('UserProfile', uselist=False, back_populates='user', cascade="all, delete-orphan")
    routines_list = db.relationship('Routine', back_populates='user', lazy=True)
    workout_completions = db.relationship('WorkoutCompletion', back_populates='user', lazy=True, cascade="all, delete-orphan")
    workouts = db.relationship('Workout', back_populates='user', lazy=True, cascade="all, delete-orphan") 
    user_image = db.relationship('UserImage', uselist=False, back_populates='user', cascade="all, delete-orphan")


    def set_password(self, password):
        self.password_hash = ph.hash(password)

    def check_password(self, password):
        try:
            return ph.verify(self.password_hash, password)
        except:
            return False  

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "email": self.email,
            "is_active": self.is_active,
            "profile": self.profile.serialize() if self.profile else None,
            "user_image": self.user_image.serialize() if self.user_image else None
        }


class UserProfile(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    age = db.Column(db.Integer, nullable=True)
    phone_number = db.Column(db.String, nullable=True)  
    gender = db.Column(db.String, nullable=True)
    description = db.Column(db.String, nullable=True)

    user = db.relationship('User', back_populates='profile')

    def __repr__(self):
        return f'<UserProfile {self.user_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "age": self.age,
            "phone_number": self.phone_number,
            "gender": self.gender,
            "description": self.description
    }

class Routine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(256), nullable=True)
    days_per_week = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    user = db.relationship('User', back_populates='routines_list', lazy=True)
    workouts = db.relationship('Workout', back_populates='routine', lazy=True)
    

    def __repr__(self):
        return f'<Routine {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "days_per_week": self.days_per_week,
            "user_id": self.user_id,
            "workouts": [workout.serialize() for workout in self.workouts]
    }


class Workout(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    routine_id = db.Column(db.Integer, db.ForeignKey('routine.id'), nullable=False)
    fitness_level = db.Column(db.String, nullable=True)  
    category = db.Column(db.String, nullable=False)   
    goal = db.Column(db.String, nullable=False)  
    difficulty = db.Column(db.String)  
    percent_completed = db.Column(db.Integer, nullable=False, default=True)

    trainings = db.relationship('Training', back_populates='workout', lazy=True, cascade="all, delete-orphan")
    workout_completions = db.relationship('WorkoutCompletion', back_populates='workout', lazy=True, cascade="all, delete-orphan")
    user = db.relationship('User', back_populates='workouts')
    routine = db.relationship('Routine', back_populates='workouts') 
    

    def __repr__(self):
        return f'<Workout {self.id} - {self.goal}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "routine_id": self.routine_id,
            "fitness_level": self.fitness_level,
            "category": self.category,
            "goal": self.goal,
            "difficulty": self.difficulty,
            "percent_completed": self.percent_completed,
            "trainings": [training.serialize() for training in self.trainings],
            "completions": [completion.serialize() for completion in self.workout_completions]
        }
class Training(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False) 
    is_completed = db.Column(db.Boolean, nullable=False, default=False)
    mode = db.Column(db.String, nullable=False, default='duration')  
    duration = db.Column(Numeric(10, 2), nullable=True)
    repetitions = db.Column(db.Integer, nullable=True)  
    sets = db.Column(db.Integer, nullable=True)  
    rest = db.Column(db.Integer, nullable=True)  
    day = db.Column(db.Date, nullable=False)  # Asegúrate de agregar el campo day

    workout_id = db.Column(db.Integer, db.ForeignKey('workout.id'), nullable=False)
    workout = db.relationship('Workout', back_populates='trainings')

    def __repr__(self):
        return f'<Training {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "is_completed": self.is_completed,
            "mode": self.mode,
            "duration": float(self.duration) if self.duration else None,
            "repetitions": self.repetitions,
            "sets": self.sets,
            "rest": self.rest,
            "day": self.day.isoformat() if self.day else None,  # Serializa la fecha
            "workout_id": self.workout_id
        }


class WorkoutCompletion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    workout_id = db.Column(db.Integer, db.ForeignKey('workout.id'), nullable=False)
    completed = db.Column(db.Boolean, nullable=False, default=False)
    description_mood=db.Column(db.String,nullable=True)
    date_completed = db.Column(db.Date, nullable=True, default=None)

    user = db.relationship('User', back_populates='workout_completions', lazy=True)
    workout = db.relationship('Workout', back_populates='workout_completions')

    def __repr__(self):
        return f'<WorkoutCompletion {self.user_id} - {self.workout_id} - {self.completed}>'
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "workout_id": self.workout_id,
            "completed": self.completed,
            "description_mood": self.description_mood,
            "date_completed": self.date_completed.isoformat() if self.date_completed else None
        }


class UserImage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)
    img = db.Column(db.String, nullable=True)  

    user = db.relationship('User', back_populates='user_image')

    def __repr__(self):
        return f'<UserImage {self.user_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "img": self.img
        }
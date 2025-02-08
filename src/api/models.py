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
            "is_active": self.is_active
        }


class UserProfile(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user_img = db.Column(db.String, nullable=True)
    age = db.Column(db.Integer, nullable=True)
    phone_number = db.Column(db.String, nullable=True)  
    gender = db.Column(db.String, nullable=True)
    description = db.Column(db.String, nullable=True)

    user = db.relationship('User', back_populates='profile')

    def __repr__(self):
        return f'<UserProfile {self.user_id}>'


class Routine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(256), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    user = db.relationship('User', back_populates='routines_list', lazy=True)

    def __repr__(self):
        return f'<Routine {self.name}>'


class Workout(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    fitness_level = db.Column(db.String, nullable=True)  
    category = db.Column(db.String, nullable=False)   
    goal = db.Column(db.String, nullable=False)  
    difficulty = db.Column(db.String)  
    is_active = db.Column(db.Boolean(), nullable=False, default=True)

    trainings = db.relationship('Training', back_populates='workout', lazy=True, cascade="all, delete-orphan")
    workout_completions = db.relationship('WorkoutCompletion', back_populates='workout', lazy=True, cascade="all, delete-orphan")
    user = db.relationship('User', back_populates='workouts')

    def __repr__(self):
        return f'<Workout {self.id} - {self.goal}>'


class Training(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)  
    mode = db.Column(db.String, nullable=False, default='duration')  

    duration = db.Column(Numeric(10, 2), nullable=True)
    repetitions = db.Column(db.Integer, nullable=True)  
    sets = db.Column(db.Integer, nullable=True)  
    rest = db.Column(db.Integer, nullable=True)  


    workout_id = db.Column(db.Integer, db.ForeignKey('workout.id'), nullable=False)
    workout = db.relationship('Workout', back_populates='trainings')

    def __repr__(self):
        return f'<Training {self.name}>'

    def is_using_duration(self):
        """Check if the training uses duration."""
        return self.mode == 'duration'

    def is_using_series(self):
        """Check if the training uses series."""
        return self.mode == 'series'


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

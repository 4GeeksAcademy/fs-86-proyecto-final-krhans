from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nick = db.Column(db.String(120), unique=True, nullable=False)
    user_name = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone_number = db.Column(db.String(120), nullable=True)
    city = db.Column(db.String(120), nullable=True)
    sex = db.Column(db.String(20), nullable=True)  
    birth_date = db.Column(db.String(10), nullable=False)  # Formato YYYY/MM/DD 
    password = db.Column(db.String(80), nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False, default=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "nick": self.nick,
            "user_name": self.user_name,
            "email": self.email,
            "phone_number": self.phone_number,
            "city": self.city,
            "sex": self.sex,
            "birth_date": self.birth_date,
            "is_active": self.is_active
        }

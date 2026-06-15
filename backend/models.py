from flask_sqlalchemy import SQLAlchemy
from datetime import datetime  # if not already imported

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(50), nullable=False)

class MenteeProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    certifications = db.Column(db.Text)
    skills = db.Column(db.Text)
    location = db.Column(db.String(100))
    salary = db.Column(db.Integer)
    role = db.Column(db.String(100))
    resume_path = db.Column(db.String(255))

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(120), nullable=False)
    skills_required = db.Column(db.Text, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    salary = db.Column(db.Integer, nullable=False)
    distance_km = db.Column(db.Float, nullable=False)


class Interview(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mentee_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    company = db.Column(db.String(120), nullable=False)
    interview_time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    expected_duration = db.Column(db.Integer)  # in minutes, optional
    required_documents = db.Column(db.Text)
    status = db.Column(db.String(50), default='Scheduled')

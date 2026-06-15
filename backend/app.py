from flask import Flask
from flask_cors import CORS
from models import db

app = Flask(__name__)
app.config.from_object('config.Config')
db.init_app(app)
CORS(app)

# Import models so SQLAlchemy registers their metadata
from models import User, MenteeProfile, Job, Interview

# Import routes
from routes import auth, dashboard, jobs, interview, resume, mentor, chat
app.register_blueprint(auth.bp)
app.register_blueprint(dashboard.bp)
app.register_blueprint(jobs.bp)
app.register_blueprint(interview.bp)
app.register_blueprint(resume.bp)
app.register_blueprint(mentor.bp)
app.register_blueprint(chat.bp)

# Automatically create database tables and seed with mock data
with app.app_context():
    db.create_all()
    if not Job.query.first():
        job1 = Job(company='Tata Advanced Systems', role='Security Supervisor', skills_required='security management, vigilance, leadership', location='Pune', salary=650000, distance_km=12.5)
        job2 = Job(company='Bharat Electronics Limited', role='Defense Analyst', skills_required='analysis, intelligence, strategic planning', location='Bangalore', salary=900000, distance_km=5.0)
        job3 = Job(company='DRDO', role='Strategic Consultant', skills_required='advisory, strategy, project management', location='Hyderabad', salary=1020000, distance_km=8.2)
        job4 = Job(company='Larsen & Toubro', role='Operations Manager', skills_required='operations, management, coordination', location='Mumbai', salary=850000, distance_km=15.0)
        job5 = Job(company='Indian Railways', role='Logistics Officer', skills_required='logistics, supply chain, transportation', location='Delhi', salary=780000, distance_km=10.0)
        db.session.add_all([job1, job2, job3, job4, job5])
        db.session.commit()

if __name__ == '__main__':
    app.run(debug=True)

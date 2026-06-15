from flask import Blueprint, request, jsonify
from models import db, MenteeProfile
from flask import Blueprint, render_template

bp = Blueprint('dashboard', __name__)

@bp.route('/')
def home():
    return "Welcome to the Retired Military Job Portal!"

@bp.route('/upload_profile', methods=['POST'])
def upload_profile():
    data = request.form
    file = request.files['file']
    import os
    os.makedirs('uploads', exist_ok=True)
    path = f'uploads/{file.filename}'
    file.save(path)

    profile = MenteeProfile(
        user_id=data['user_id'],
        skills=data['skills'],
        location=data['location'],
        salary=data['salary'],
        role=data['role'],
        resume_path=path
    )
    db.session.add(profile)
    db.session.commit()
    return jsonify({'message': 'Profile saved'})

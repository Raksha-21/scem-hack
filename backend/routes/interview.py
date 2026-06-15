from flask import Blueprint, request, jsonify
from models import db, Interview
from datetime import datetime

bp = Blueprint('interview', __name__)

@bp.route('/book_interview', methods=['POST'])
def book():
    data = request.json
    
    # Parse the time string to a datetime object
    time_str = data.get('time')
    if time_str:
        try:
            # Try parsing ISO 8601 string
            interview_time = datetime.fromisoformat(time_str.replace('Z', '+00:00'))
        except Exception:
            try:
                # Try parsing format: "YYYY-MM-DD HH:MM:SS"
                interview_time = datetime.strptime(time_str, "%Y-%m-%d %H:%M:%S")
            except Exception:
                # Default to current time if parsing fails
                interview_time = datetime.utcnow()
    else:
        interview_time = datetime.utcnow()

    interview = Interview(
        mentee_id=data['user_id'],
        company=data['company'],
        interview_time=interview_time,
        status='Scheduled',
        required_documents="ID Proof, Resume, Certificates"
    )
    db.session.add(interview)
    db.session.commit()
    return jsonify({'message': 'Interview booked'})

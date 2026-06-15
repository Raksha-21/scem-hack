import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import matplotlib.pyplot as plt
from joblib import load
from models import Job  # Your SQLAlchemy model

# Optional: Load trained ML model (only if exists)
try:
    ml_model = load("ai_engine/job_match_model.joblib")
except:
    ml_model = None


def match_jobs(mentee_skills, preferred_location, expected_salary, expected_role):
    # Step 1: Load jobs from DB that match basic filters
    jobs = Job.query.filter_by(location=preferred_location).filter(Job.salary >= expected_salary).all()
    if not jobs:
        return {"matches": [], "message": "No jobs found for your criteria"}

    job_data = pd.DataFrame([{
        "company": job.company,
        "role": job.role,
        "skills_required": job.skills_required,
        "location": job.location,
        "salary": job.salary,
        "distance_km": job.distance_km
    } for job in jobs])

    # Step 2: Combine skills + role + location for richer input
    job_data["combined"] = job_data["skills_required"] + " " + job_data["role"] + " " + job_data["location"]
    input_combined = mentee_skills + " " + expected_role + " " + preferred_location

    # Step 3: TF-IDF Similarity Score
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(job_data["combined"].tolist() + [input_combined])
    similarity_scores = cosine_similarity(tfidf_matrix[-1:], tfidf_matrix[:-1])[0]
    job_data["similarity"] = similarity_scores

    # Step 4: Optional ML Filtering (if model loaded)
    if ml_model:
        job_data["ml_match"] = ml_model.predict(job_data["combined"])
        job_data = job_data[job_data["ml_match"] == 1]

    if job_data.empty:
        return {"matches": [], "message": "No jobs matched after AI filtering"}

    # Step 5: Sort by similarity
    job_data = job_data.sort_values(by="similarity", ascending=False)

    # Step 6: Create and save bar chart
    import os
    os.makedirs("static", exist_ok=True)
    plt.figure(figsize=(8, 4))
    plt.bar(job_data["role"], job_data["salary"], color="steelblue")
    plt.xlabel("Job Roles")
    plt.ylabel("Salaries")
    plt.title("Recommended Roles vs Salaries")
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig("static/roles_vs_salaries.png")
    plt.close()

    # Step 7: Return results
    return {
        "matches": job_data[["company", "role", "salary", "location", "distance_km"]].to_dict(orient="records"),
        "chart": "/static/roles_vs_salaries.png"
    }

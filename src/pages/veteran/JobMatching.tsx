// components/JobMatching.tsx
import React, { useState } from 'react';

const JobMatching = () => {
  const [form, setForm] = useState({
    role: '',
    location: '',
    city: '',
    state: '',
    pin: '',
    expectedSalary: '',
  });

  const [appliedJobs, setAppliedJobs] = useState<any[]>([]);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [notification, setNotification] = useState('');
  const [matchedJobs, setMatchedJobs] = useState<any[]>([]);

  const [applicant, setApplicant] = useState({
    name: '',
    place: '',
    age: '',
    email: '',
    phone: '',
  });

  const dummyJobs = [
    { id: 1, company: 'Tata Advanced Systems', role: 'Security Supervisor', location: 'Pune', salary: '6.5 LPA' },
    { id: 2, company: 'Bharat Electronics Limited', role: 'Defense Analyst', location: 'Bangalore', salary: '9 LPA' },
    { id: 3, company: 'DRDO', role: 'Strategic Consultant', location: 'Hyderabad', salary: '10.2 LPA' },
    { id: 4, company: 'Larsen & Toubro', role: 'Operations Manager', location: 'Mumbai', salary: '8.5 LPA' },
    { id: 5, company: 'Indian Railways', role: 'Logistics Officer', location: 'Delhi', salary: '7.8 LPA' },
  ];

  const handleInput = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleApplicantInput = (e: any) => {
    setApplicant({ ...applicant, [e.target.name]: e.target.value });
  };

  const handleApply = (job: any) => {
    if (appliedJobs.length >= 5) {
      setNotification('You can apply for only 5 jobs');
      return;
    }
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const confirmApplication = () => {
    const newApplication = {
      ...selectedJob,
      applicant,
      interviewTime: '10:00 AM, 12th June 2025',
      expectedArrival: '9:45 AM',
      documents: 'Resume',
    };
    setAppliedJobs([...appliedJobs, newApplication]);
    setShowApplicationForm(false);
    setNotification("Successfully booked an interview with "+selectedJob.company);
    setApplicant({ name: '', place: '', age: '', email: '', phone: '' });
  };

  const findJobs = () => {
    const roleKeyword = form.role.toLowerCase();
    const matches = dummyJobs.filter((job) =>
      job.role.toLowerCase().includes(roleKeyword)
    );
    setMatchedJobs(matches);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Find a Civilian Job</h2>

      {notification && (
        <div className="bg-green-100 text-green-800 p-4 mb-4 rounded border border-green-300">
          {notification}
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Your Applications</h3>
        {appliedJobs.length === 0 ? (
          <p className="text-gray-500">You haven't applied to any jobs yet.</p>
        ) : (
          appliedJobs.map((job, index) => (
            <div key={index} className="border p-4 mb-3 rounded bg-gray-50 shadow">
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Role:</strong> {job.role}</p>
              <p><strong>Time:</strong> {job.interviewTime}</p>
              <p><strong>Arrival:</strong> {job.expectedArrival}</p>
              <p><strong>Documents:</strong> {job.documents}</p>
            </div>
          ))
        )}
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input name="role" placeholder="Preferred Job Role" value={form.role} onChange={handleInput} className="border p-2 rounded w-full" />
        <input name="location" placeholder="Preferred Location" value={form.location} onChange={handleInput} className="border p-2 rounded w-full" />
        <input name="city" placeholder="City" value={form.city} onChange={handleInput} className="border p-2 rounded w-full" />
        <input name="state" placeholder="State" value={form.state} onChange={handleInput} className="border p-2 rounded w-full" />
        <input name="pin" placeholder="PIN Code" value={form.pin} onChange={handleInput} className="border p-2 rounded w-full" />
        <input name="expectedSalary" placeholder="Expected Salary (e.g., 8 LPA)" value={form.expectedSalary} onChange={handleInput} className="border p-2 rounded w-full" />
      </form>

      <button
        onClick={findJobs}
        className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition mb-6"
      >
        Find Jobs
      </button>

      <div>
        <h3 className="text-lg font-semibold mb-3">Matching Jobs</h3>
        {matchedJobs.length === 0 && (
          <p className="text-gray-500">No jobs matched your search.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchedJobs.map((job) => (
            <div key={job.id} className="border p-4 rounded bg-gray-100 shadow-sm">
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Role:</strong> {job.role}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <button
                onClick={() => handleApply(job)}
                className="mt-3 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {showApplicationForm && selectedJob && (
        <div className="mt-8 border p-5 rounded shadow bg-gray-50">
          <h3 className="text-xl font-semibold mb-4">Application Form</h3>
          <input name="name" placeholder="Full Name" value={applicant.name} onChange={handleApplicantInput} className="border p-2 rounded mb-3 w-full" />
          <input name="place" placeholder="Place" value={applicant.place} onChange={handleApplicantInput} className="border p-2 rounded mb-3 w-full" />
          <input name="age" placeholder="Age" value={applicant.age} onChange={handleApplicantInput} className="border p-2 rounded mb-3 w-full" />
          <input name="email" placeholder="Email Address" value={applicant.email} onChange={handleApplicantInput} className="border p-2 rounded mb-3 w-full" />
          <input name="phone" placeholder="Contact Number" value={applicant.phone} onChange={handleApplicantInput} className="border p-2 rounded mb-4 w-full" />
          <button onClick={confirmApplication} className="bg-blue-700 text-white px-5 py-2 rounded hover:bg-blue-800">
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default JobMatching;
import { useState } from 'react';
import ResumeUpload from './components/ResumeUpload';
import SkillList from './components/SkillList';
import JobMatches from './components/JobMatches';

function App() {
  const [skills, setSkills] = useState([]);
  const [jobs, setJobs] = useState([]);

  const handleUploadSuccess = (data) => {
    setSkills(data.skills || []);
    setJobs(data.jobs || []);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            AI Smart CV Scan
          </h1>
          <p className="text-gray-600 text-lg">
            Analyze your resume against job descriptions with AI-powered insights
          </p>
        </div>
        <ResumeUpload onUploadSuccess={handleUploadSuccess} />
        <SkillList skills={skills} />
        <JobMatches jobs={jobs} />
      </div>
    </div>
  );
}

export default App;

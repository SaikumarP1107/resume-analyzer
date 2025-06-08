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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">AI Resume Analyzer</h1>
      <ResumeUpload onUploadSuccess={handleUploadSuccess} />
      <SkillList skills={skills} />
      <JobMatches jobs={jobs} />
    </div>
  );
}

export default App;

import { useState } from 'react';

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!file || !jobDesc) {
      setError('Please upload a resume and paste a job description.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDesc);

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('https://api-toolkit.onrender.com/score', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Server error');

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to score resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload Resume + Job Description</h2>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <textarea
        rows={6}
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        placeholder="Paste job description here..."
        className="w-full p-2 border rounded mb-4"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Scoring...' : 'Analyze'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {result && (
        <div className="mt-6 bg-gray-50 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Score: {result.score} / 100</h3>

          <div className="mb-2">
            <strong>Matched Skills:</strong>
            <ul className="list-disc ml-5">
              {result.matchedSkills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="mb-2">
            <strong>Missing Skills:</strong>
            <ul className="list-disc ml-5 text-red-600">
              {result.missingSkills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>

          <div>
            <strong>Suggestions:</strong>
            <ul className="list-disc ml-5 text-green-700">
              {result.suggestions.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;

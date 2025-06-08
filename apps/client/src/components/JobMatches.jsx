function JobMatches({ jobs }) {
  if (!jobs.length) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Top Job Matches</h3>
      <ul className="mt-2 space-y-2">
        {jobs.map((job, idx) => (
          <li key={idx} className="border p-3 rounded shadow-sm">
            <strong>{job.title}</strong> at {job.company}
            <div className="text-sm text-gray-600">
              Match Score: {job.matchScore}%
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobMatches;

function JobMatches({ jobs }) {
  if (!jobs.length) return null;

  return (
    <div className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl p-6 mb-8">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800">Top Job Matches</h3>
      </div>
      <div className="space-y-4">
        {jobs.map((job, idx) => (
          <div key={idx} className="bg-white/80 border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-200 transform hover:scale-102">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-bold text-lg text-gray-800 mb-1">{job.title}</h4>
                <p className="text-gray-600 mb-3">at {job.company}</p>
                <div className="flex items-center">
                  <div className="flex items-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-3 py-1">
                    <svg className="w-4 h-4 text-purple-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-purple-700">
                      {job.matchScore}% Match
                    </span>
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-200"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-purple-500"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray={`${job.matchScore}, 100`}
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-700">{job.matchScore}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobMatches;

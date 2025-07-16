function SkillList({ skills }) {
  if (!skills.length) return null;

  return (
    <div className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl p-6 mb-8">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800">Extracted Skills</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <span 
            key={idx} 
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-teal-100 text-green-800 border border-green-200 hover:from-green-200 hover:to-teal-200 transition-all duration-200 transform hover:scale-105"
          >
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillList;

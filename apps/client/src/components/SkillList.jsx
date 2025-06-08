function SkillList({ skills }) {
  if (!skills.length) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Extracted Skills</h3>
      <ul className="list-disc list-inside mt-2">
        {skills.map((skill, idx) => (
          <li key={idx}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

export default SkillList;

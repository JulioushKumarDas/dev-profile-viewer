import React, { useState } from 'react';
import { useDeveloper } from '../context/DeveloperContext';
import profileConfig from '../config/profileConfig.json';

const CommitVisualization: React.FC = () => {
  const { commitHistory } = useDeveloper();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const getColor = (count: number) => {
    if (count === 0) return 'bg-gray-700';
    if (count < 2) return 'bg-green-900';
    if (count < 5) return 'bg-green-700';
    if (count < 10) return 'bg-green-500';
    return 'bg-green-400';
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">
          {profileConfig.contributionSection.title}
        </h2>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="bg-gray-700 text-white rounded px-3 py-2 text-sm"
        >
          {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {commitHistory.length > 0 ? (
        <div className="overflow-x-auto">
          <div className="inline-grid gap-1" style={{ gridTemplateColumns: 'repeat(53, 1fr)' }}>
            {commitHistory.map((day, idx) => (
              <div
                key={idx}
                title={`${day.count} commits on ${day.date}`}
                className={`w-3 h-3 rounded ${getColor(day.count)}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-center py-8">No commit data available</p>
      )}

      <div className="mt-6 text-center">
        <a href="#" className="text-blue-400 hover:underline text-sm">
          {profileConfig.contributionSection.learnMore}
        </a>
      </div>
    </div>
  );
};

export default CommitVisualization;

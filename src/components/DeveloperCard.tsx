import React from 'react';
import { FiMapPin, FiMail, FiGlobe, FiTwitter, FiUsers } from 'react-icons/fi';
import { useDeveloper } from '../context/DeveloperContext';

interface DeveloperCardProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({ selectedYear, onYearChange }) => {
  const { developerData } = useDeveloper();

  if (!developerData) return null;

  return (
    <aside className="w-full">
      <div className="bg-gray-800 rounded-lg p-6 sticky top-20">
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <img
            src={developerData.avatar_url}
            alt={developerData.name}
            className="rounded-full border-2 border-gray-700"
          />
        </div>

        {/* Name and Login */}
        <h1 className="text-2xl font-bold text-white text-center">{developerData.name}</h1>
        <p className="text-gray-400 text-center text-lg">@{developerData.login}</p>

        {/* Bio */}
        {developerData.bio && (
          <p className="text-gray-300 text-center mt-4 text-sm">{developerData.bio}</p>
        )}

        {/* Year Selector */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <label className="block text-sm text-gray-400 mb-2">Select Year</label>
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(parseInt(e.target.value))}
            className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600"
          >
            {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(
              (year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            )}
          </select>
        </div>

        {/* Stats */}
        <div className="flex justify-around mt-6 pt-6 border-t border-gray-700">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{developerData.followers}</p>
            <p className="text-gray-400 text-sm">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{developerData.following}</p>
            <p className="text-gray-400 text-sm">Following</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{developerData.public_repos}</p>
            <p className="text-gray-400 text-sm">Repos</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-6">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
            Follow
          </button>
          <button className="flex-1 border border-gray-600 hover:border-gray-500 text-white py-2 rounded">
            Sponsor
          </button>
        </div>

        {/* Info */}
        <div className="mt-6 space-y-3 text-sm text-gray-300">
          {developerData.location && (
            <div className="flex items-center gap-2">
              <FiMapPin size={16} />
              <span>{developerData.location}</span>
            </div>
          )}
          {developerData.email && (
            <div className="flex items-center gap-2">
              <FiMail size={16} />
              <span>{developerData.email}</span>
            </div>
          )}
          {developerData.blog && (
            <div className="flex items-center gap-2">
              <FiGlobe size={16} />
              <a href={developerData.blog} className="text-blue-400 hover:underline">
                {developerData.blog}
              </a>
            </div>
          )}
          {developerData.twitter_username && (
            <div className="flex items-center gap-2">
              <FiTwitter size={16} />
              <span>@{developerData.twitter_username}</span>
            </div>
          )}
          {developerData.company && (
            <div className="flex items-center gap-2">
              <FiUsers size={16} />
              <span>{developerData.company}</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default DeveloperCard;

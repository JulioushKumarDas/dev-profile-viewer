import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileConfig from '../config/profileConfig.json';

const NavigationTabs: React.FC<{ username: string }> = ({ username }) => {
  const location = useLocation();

  return (
    <nav className="border-b border-gray-700 mb-6">
      <div className="flex gap-8">
        {profileConfig.navigationTabs.map((tab) => (
          <Link
            key={tab.id}
            to={`/profile/${username}/${tab.id}`}
            className={`py-4 px-2 border-b-2 transition-colors flex items-center gap-2 ${
              location.pathname.includes(tab.id) || (tab.id === 'overview' && location.pathname === `/profile/${username}`)
                ? 'border-blue-500 text-white'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && <span className="text-xs bg-gray-700 px-2 py-1 rounded">
              {tab.count}
            </span>}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavigationTabs;

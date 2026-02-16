import React, { useState } from 'react';
import { FiMenu, FiSearch, FiGitPullRequest, FiAlertCircle, FiPlus, FiBell, FiChevronDown } from 'react-icons/fi';

const HeaderNavigation: React.FC = () => {
  const [showMenuAlert, setShowMenuAlert] = useState(false);

  const showAlert = (message: string) => {
    alert(message);
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700">
      <div className="px-6 py-3 flex items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={() => showAlert('Navigation sidebar would open here')}
            className="p-2 hover:bg-gray-800 rounded"
            title="Menu"
          >
            <FiMenu size={20} />
          </button>
          
          <div className="hidden md:flex items-center gap-2 bg-gray-800 rounded px-3 py-2 flex-1 max-w-xs">
            <FiSearch size={16} />
            <input
              type="text"
              placeholder="Search projects..."
              className="bg-transparent outline-none text-sm flex-1"
              onClick={() => showAlert('Search feature with keyboard shortcut (/) would work here')}
            />
          </div>
        </div>

        {/* Center Section */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => showAlert('View and manage your pull requests')}
            className="p-2 hover:bg-gray-800 rounded text-sm hidden sm:flex items-center gap-1"
          >
            <FiGitPullRequest size={16} />
            <span>PRs</span>
          </button>
          <button
            onClick={() => showAlert('View and manage your issues')}
            className="p-2 hover:bg-gray-800 rounded text-sm hidden sm:flex items-center gap-1"
          >
            <FiAlertCircle size={16} />
            <span>Issues</span>
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => showAlert('Create new repository or project')}
            className="p-2 hover:bg-gray-800 rounded"
            title="Create"
          >
            <FiPlus size={20} />
          </button>
          <div className="relative">
            <button
              className="p-2 hover:bg-gray-800 rounded relative"
              title="Notifications"
            >
              <FiBell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
          <button
            onClick={() => showAlert('Access your account settings and preferences')}
            className="p-2 hover:bg-gray-800 rounded flex items-center gap-2"
            title="Profile"
          >
            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full"></div>
            <FiChevronDown size={16} className="hidden sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderNavigation;

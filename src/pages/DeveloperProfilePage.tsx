import React, { useEffect, useState } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useDeveloper } from '../context/DeveloperContext';
import HeaderNavigation from '../components/HeaderNavigation';
import DeveloperCard from '../components/DeveloperCard';
import NavigationTabs from '../components/NavigationTabs';
import PopularRepositories from '../components/PopularRepositories';
import CommitVisualization from '../components/CommitVisualization';
import ProjectsShowcase from '../components/ProjectsShowcase';

const DeveloperProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { developerData, isLoading, errorMsg, fetchDeveloperProfile, fetchCommitsByYear } =
    useDeveloper();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (username) {
      fetchDeveloperProfile(username);
      fetchCommitsByYear(username, selectedYear);
    }
  }, [username, selectedYear, fetchDeveloperProfile, fetchCommitsByYear]);

  const handleRetry = () => {
    if (username) {
      fetchDeveloperProfile(username);
      fetchCommitsByYear(username, selectedYear);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <HeaderNavigation />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            </div>
            <p className="text-gray-400 text-lg">Loading developer profile for @{username}...</p>
          </div>
        )}

        {errorMsg && !developerData && (
          <div className="bg-red-900 border border-red-700 rounded p-6 mb-6">
            <p className="text-red-200 mb-4">⚠️ {errorMsg}</p>
            <button
              onClick={handleRetry}
              className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {developerData && (
          <>
            <div className="flex flex-col md:flex-row gap-6 mb-8">        
              <div className="w-full md:w-80 flex-shrink-0">
                <DeveloperCard selectedYear={selectedYear} onYearChange={setSelectedYear} />
              </div>
              <div className="flex-1">
                <NavigationTabs username={username || ''} />
                <PopularRepositories />
                <CommitVisualization />
                <ProjectsShowcase />
              </div>
            </div>
            <Outlet />
          </>
        )}
      </main>
    </div>
  );
};

export default DeveloperProfilePage;

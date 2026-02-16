import React, { useEffect, useState } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useDeveloper } from '../context/DeveloperContext';
import HeaderNavigation from '../components/HeaderNavigation';
import DeveloperCard from '../components/DeveloperCard';
import NavigationTabs from '../components/NavigationTabs';
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

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <HeaderNavigation />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading developer profile...</p>
          </div>
        )}

        {errorMsg && (
          <div className="bg-red-900 border border-red-700 rounded p-4 mb-6">
            <p className="text-red-200">{errorMsg}</p>
          </div>
        )}

        {developerData && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <DeveloperCard />
              <div className="md:col-span-3">
                <div className="flex items-center gap-4 mb-6">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="bg-gray-800 text-white rounded px-3 py-2 border border-gray-700"
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

                <CommitVisualization />
                <ProjectsShowcase />
              </div>
            </div>

            <NavigationTabs username={username || ''} />
            <Outlet />
          </>
        )}
      </main>
    </div>
  );
};

export default DeveloperProfilePage;

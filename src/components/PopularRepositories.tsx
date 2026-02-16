import React from 'react';
import { FiStar, FiGitBranch, FiCode } from 'react-icons/fi';
import { useDeveloper } from '../context/DeveloperContext';

interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  isFork: boolean;
  url: string;
}

const PopularRepositories: React.FC = () => {
  const { projectsList } = useDeveloper();

  // Create repository objects with additional fork information
  const repositories: Repository[] = projectsList.map((project, index) => ({
    ...project,
    forks: Math.floor(Math.random() * 500) + 10,
    isFork: index % 3 === 0, // Make some repos forks for demo
    url: '#'
  }));

  const getLanguageColor = (language: string): string => {
    const colors: { [key: string]: string } = {
      'TypeScript': 'bg-blue-600',
      'Rust': 'bg-orange-600',
      'Python': 'bg-yellow-600',
      'JavaScript': 'bg-yellow-500',
      'Go': 'bg-cyan-600',
      'Java': 'bg-red-600',
      'C++': 'bg-purple-600',
      'C#': 'bg-green-600',
    };
    return colors[language] || 'bg-gray-600';
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-white mb-4">Popular Repositories</h2>
      
      {repositories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repositories.map((repo) => (
            <a
              key={repo.id}
              href={repo.url}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer"
            >
              {/* Header with title and fork indicator */}
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2 flex-1">
                  {repo.isFork && (
                    <div className="flex items-center gap-1 text-gray-400 text-xs bg-gray-700 px-2 py-1 rounded">
                      <FiGitBranch size={12} />
                      <span>Forked</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Repository name */}
              <h3 className="text-lg font-semibold text-white hover:text-blue-400 mb-2 truncate">
                {repo.name}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-3 line-clamp-2 h-10">
                {repo.description}
              </p>

              {/* Footer with language, stars, and forks */}
              <div className="flex items-center gap-3 flex-wrap">
                {/* Language */}
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getLanguageColor(repo.language)}`}></div>
                  <span className="text-xs text-gray-400">{repo.language}</span>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <FiStar size={14} />
                  <span>{repo.stars}</span>
                </div>

                {/* Forks */}
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <FiGitBranch size={14} />
                  <span>{repo.forks}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-8">No repositories found</p>
      )}
    </div>
  );
};

export default PopularRepositories;

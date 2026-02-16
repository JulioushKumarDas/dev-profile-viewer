import React from 'react';
import { FiStar, FiGitBranch, FiCode } from 'react-icons/fi';
import { useDeveloper } from '../context/DeveloperContext';
import profileConfig from '../config/profileConfig.json';

const ProjectsShowcase: React.FC = () => {
  const { projectsList } = useDeveloper();

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-white mb-6">
        {profileConfig.projectsSection.title}
      </h2>

      {projectsList.length > 0 ? (
        <div className="space-y-4">
          {projectsList.map((project) => (
            <a
              key={project.id}
              href={project.url}
              className="block p-4 border border-gray-700 rounded hover:border-gray-600 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-white hover:text-blue-400">
                  {project.name}
                </h3>
                <div className="flex items-center gap-1 text-yellow-400">
                  <FiStar size={16} />
                  <span className="text-sm">{project.stars}</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-3">{project.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <FiCode size={14} />
                  <span>{project.language}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-8">
          {profileConfig.projectsSection.empty}
        </p>
      )}
    </div>
  );
};

export default ProjectsShowcase;

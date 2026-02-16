import React, { createContext, useContext, useState, useCallback } from 'react';
import profileConfig from '../config/profileConfig.json';

interface DeveloperContextType {
  developerData: DeveloperProfile | null;
  commitHistory: CodeCommit[];
  projectsList: ProjectItem[];
  isLoading: boolean;
  errorMsg: string | null;
  fetchDeveloperProfile: (username: string) => Promise<void>;
  fetchCommitsByYear: (username: string, year: number) => Promise<void>;
}

const DeveloperContext = createContext<DeveloperContextType | undefined>(undefined);

export const DeveloperProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [developerData, setDeveloperData] = useState<DeveloperProfile | null>(null);
  const [commitHistory, setCommitHistory] = useState<CodeCommit[]>([]);
  const [projectsList, setProjectsList] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchDeveloperProfile = useCallback(async (username: string) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`https://api.github.com/users/${username}`, {
        signal: controller.signal,
        headers: { 'Accept': 'application/vnd.github.v3+json' }
      });
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error('Developer not found');
      const data: DeveloperProfile = await response.json();
      setDeveloperData(data);
      setProjectsList(profileConfig.mockProjects);
    } catch (error) {
      // Fallback to demo data if API fails
      const demoProfiles: any = profileConfig.demoProfiles || {};
      if (demoProfiles[username.toLowerCase()]) {
        setDeveloperData(demoProfiles[username.toLowerCase()]);
        setProjectsList(profileConfig.mockProjects);
        setErrorMsg(null);
        console.log('Using demo data for:', username);
      } else {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch developer profile';
        setErrorMsg(`${errorMessage} - Demo data not available for @${username}`);
        console.error('Profile fetch error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCommitsByYear = useCallback(async (username: string, year: number) => {
    try {
      const response = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}?from=${year}-01-01&to=${year}-12-31`
      );
      if (!response.ok) throw new Error('Could not fetch commits');
      const data: any = await response.json();
      const commits = data.contributions || [];
      setCommitHistory(commits);
    } catch (error) {
      // Generate demo commit data if API fails
      const demoCommits: CodeCommit[] = [];
      const startDate = new Date(`${year}-01-01`);
      const endDate = new Date(`${year}-12-31`);
      
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const randomCommits = Math.floor(Math.random() * 8);
        if (randomCommits > 0) {
          demoCommits.push({
            date: d.toISOString().split('T')[0],
            count: randomCommits
          });
        }
      }
      
      setCommitHistory(demoCommits);
      console.log('Using demo commit data for:', username, year);
    }
  }, []);

  return (
    <DeveloperContext.Provider
      value={{
        developerData,
        commitHistory,
        projectsList,
        isLoading,
        errorMsg,
        fetchDeveloperProfile,
        fetchCommitsByYear,
      }}
    >
      {children}
    </DeveloperContext.Provider>
  );
};

export const useDeveloper = () => {
  const context = useContext(DeveloperContext);
  if (!context) {
    throw new Error('useDeveloper must be used within DeveloperProvider');
  }
  return context;
};

declare global {
  interface DeveloperProfile {
    login: string;
    name: string;
    avatar_url: string;
    bio: string;
    location: string;
    email: string;
    blog: string;
    twitter_username: string;
    company: string;
    public_repos: number;
    followers: number;
    following: number;
  }

  interface CodeCommit {
    date: string;
    count: number;
  }

  interface ProjectItem {
    id: number;
    name: string;
    url: string;
    description: string;
    language: string;
    stars: number;
  }

  interface DevStats {
    totalCommits: number;
    totalProjects: number;
    totalFollowers: number;
    contributeYears: number;
  }
}

export {};

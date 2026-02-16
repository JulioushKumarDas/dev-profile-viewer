import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const defaultUsername = 'torvalds';

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = (e.currentTarget.elements.namedItem('username') as HTMLInputElement).value;
    if (input.trim()) {
      navigate(`/profile/${input}`);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Search a Developer</h2>
          <p className="text-gray-300 mb-6">
            Enter a GitHub username to view their profile with contributions, repositories, and stats.
          </p>
          
          <form onSubmit={handleSearch} className="flex gap-2 mb-8">
            <input
              type="text"
              name="username"
              placeholder="e.g., torvalds, gvanrossum, octocat"
              className="flex-1 bg-gray-700 text-white rounded px-4 py-3 border border-gray-600 focus:border-blue-500 outline-none"
              defaultValue={defaultUsername}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold transition-colors"
            >
              Search
            </button>
          </form>

          <button
            onClick={() => navigate(`/profile/${defaultUsername}`)}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded font-semibold transition-colors mb-4"
          >
            View Demo: @{defaultUsername}
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">📊 Contributions</h3>
            <p className="text-gray-400 text-sm">
              Beautiful contribution heatmap visualization
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">📁 Repositories</h3>
            <p className="text-gray-400 text-sm">
              Popular repositories with fork status and language
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">👤 Profile</h3>
            <p className="text-gray-400 text-sm">
              Complete developer profile with bio and stats
            </p>
          </div>
        </div>

        {/* Popular Searches */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Try These Popular Developers:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['torvalds', 'gvanrossum', 'octocat', 'you'].map((user) => (
              <button
                key={user}
                onClick={() => navigate(`/profile/${user}`)}
                className="bg-gray-800 hover:bg-gray-700 text-blue-400 py-2 px-4 rounded transition-colors"
              >
                @{user}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;

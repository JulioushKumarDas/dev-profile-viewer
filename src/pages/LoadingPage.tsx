import React from 'react';
import { useParams } from 'react-router-dom';
import profileConfig from '../config/profileConfig.json';

const LoadingPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [loaderMessage] = React.useState(
    profileConfig.loaderMessages[Math.floor(Math.random() * profileConfig.loaderMessages.length)]
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block">
          <div className="w-12 h-12 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin mb-6 mx-auto"></div>
        </div>
        <h1 className="text-2xl font-bold mb-2">@{username}</h1>
        <p className="text-gray-400 text-lg">{loaderMessage}</p>
      </div>
    </div>
  );
};

export default LoadingPage;

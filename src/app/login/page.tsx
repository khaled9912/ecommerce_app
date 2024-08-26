'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useCartStore from '../../../hooks/useCartStore';

const LoginPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, login, error } = useCartStore();
  if (isAuthenticated) {
    router.push('/');
  }
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const formTitle = 'Log in';

  const buttonTitle = 'Login';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      await login(username, password);
      setIsLoading(false);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  return (
    <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        {error && <div className="text-red-600">{error}</div>}

        {message && <div className="text-green-600 text-sm">{message}</div>}
        <h1 className="text-2xl font-semibold">{formTitle}</h1>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            placeholder="john"
            className="ring-2 ring-gray-300 rounded-md p-4"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="ring-2 ring-gray-300 rounded-md p-4"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="text-sm underline cursor-pointer">Forgot Password?</div>

        <button
          className="bg-lama text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : buttonTitle}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

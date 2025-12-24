import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useOwnerAuth } from '../../../context/owner/OwnerAuthContext.jsx';

const OwnerLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useOwnerAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Call the login function from OwnerAuthContext
    const result = login(email, password);

    if (result.success) {
      // Redirect to the owner dashboard on success
      navigate('/owner/dashboard');
    } else {
      setError(result.message || 'Invalid email or password');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light p-4">
      <div className="w-full max-w-md bg-card-bg p-8 rounded-report shadow-custom border border-light">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight">Owner Login</h2>
          <p className="text-muted font-medium mt-2">Manage your boarding listings</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-error/10 border border-error text-error text-xs font-bold rounded-lg text-center uppercase tracking-widest">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full p-4 rounded-xl bg-light border border-light focus:border-accent outline-none transition-all font-bold text-text"
              placeholder="owner@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full p-4 rounded-xl bg-light border border-light focus:border-accent outline-none transition-all font-bold text-text"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-accent text-card-bg font-black uppercase tracking-[0.2em] rounded-full shadow-md hover:shadow-xl active:scale-95 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted font-bold uppercase tracking-widest">
            Don't have an owner account? 
            <Link to="/owner/signup" className="text-accent ml-2 hover:underline">Register Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OwnerLoginPage;
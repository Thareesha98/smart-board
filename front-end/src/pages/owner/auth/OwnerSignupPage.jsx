import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useOwnerAuth } from '../../../context/owner/OwnerAuthContext.jsx';

const OwnerSignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useOwnerAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Call the signup function from OwnerAuthContext
    const result = signup(formData);

    if (result.success) {
      navigate('/owner/login');
    } else {
      setError(result.message || 'Signup failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light p-4">
      <div className="w-full max-w-lg bg-card-bg p-8 rounded-report shadow-custom border border-light">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight">Owner Registration</h2>
          <p className="text-muted font-medium mt-2">Start managing your property listings</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-error/10 border border-error text-error text-xs font-bold rounded-lg text-center uppercase tracking-widest">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-2">First Name</label>
            <input
              name="firstName"
              type="text"
              required
              className="w-full p-3.5 rounded-xl bg-light border border-light focus:border-accent outline-none font-bold text-text"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-2">Last Name</label>
            <input
              name="lastName"
              type="text"
              required
              className="w-full p-3.5 rounded-xl bg-light border border-light focus:border-accent outline-none font-bold text-text"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-2">Email Address</label>
            <input
              name="email"
              type="email"
              required
              className="w-full p-3.5 rounded-xl bg-light border border-light focus:border-accent outline-none font-bold text-text"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-2">Phone Number</label>
            <input
              name="phone"
              type="tel"
              required
              className="w-full p-3.5 rounded-xl bg-light border border-light focus:border-accent outline-none font-bold text-text"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-2">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full p-3.5 rounded-xl bg-light border border-light focus:border-accent outline-none font-bold text-text"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="md:col-span-2 mt-4 py-4 bg-accent text-card-bg font-black uppercase tracking-[0.2em] rounded-full shadow-md hover:shadow-xl active:scale-95 transition-all"
          >
            {isLoading ? 'Creating Account...' : 'Register as Owner'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted font-bold uppercase tracking-widest">
            Already have an account? 
            <Link to="/owner/login" className="text-accent ml-2 hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OwnerSignupPage;
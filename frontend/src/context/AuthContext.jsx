import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Api } from '../api/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('sbms_token') || null);

  useEffect(() => {
    if (token) {
      try {
        const data = jwtDecode(token);
        setUser({ ...data, token });
        localStorage.setItem('sbms_token', token);
      } catch (e) {
        localStorage.removeItem('sbms_token');
        setToken(null);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [token]);

  async function login(credentials) {
    const res = await Api.login(credentials);
    if (res?.token) {
      setToken(res.token);
      return res;
    }
    throw new Error('No token in response');
  }

  function logout() {
    setToken(null);
    localStorage.removeItem('sbms_token');
    setUser(null);
  }

  async function register(payload) {
    return Api.register(payload);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

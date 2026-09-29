import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminApi, getToken, getStoredUser, clearAuth } from '../services/adminApi';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [token, setTokenState] = useState(() => getToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      if (getToken()) {
        try {
          const res = await adminApi.verifySession();
          if (res.valid && res.user) {
            setUser(res.user);
          } else {
            setUser(null);
            setTokenState('');
          }
        } catch (e) {
          // If network error, preserve stored session in offline mode
          console.warn('Admin session check offline/failed:', e);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    }
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await adminApi.login(email, password);
    setUser(res.user);
    setTokenState(res.token);
    return res;
  };

  const logout = () => {
    adminApi.logout();
    setUser(null);
    setTokenState('');
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
    loading,
    login,
    logout
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return ctx;
}

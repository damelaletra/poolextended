import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for an existing session on load
    const storedUser = localStorage.getItem('mockSession');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock credentials
        if (email === 'admin@pool.com' && password === 'admin123') {
          const mockUser = { id: 1, email: 'admin@pool.com', role: 'admin', name: 'Admin DJ' };
          setUser(mockUser);
          localStorage.setItem('mockSession', JSON.stringify(mockUser));
          resolve(mockUser);
        } else {
          reject(new Error('Credenciales incorrectas'));
        }
      }, 800); // Simulate network delay
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mockSession');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

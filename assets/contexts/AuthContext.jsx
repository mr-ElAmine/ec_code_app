import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addReadBookEvent, setAddReadBookEvent] = useState(false);

  const isTokenExpired = (exp) => {
    const currentTime = Math.floor(Date.now() / 1000);
    return exp < currentTime;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (isTokenExpired(decoded.exp)) {
        logout();
      } else {
        setUser({ token, ...decoded });
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (addReadBookEvent === true) {
      setAddReadBookEvent(false);
    }
  }, [addReadBookEvent]);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser({ token, ...decoded });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        addReadBookEvent,
        setAddReadBookEvent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

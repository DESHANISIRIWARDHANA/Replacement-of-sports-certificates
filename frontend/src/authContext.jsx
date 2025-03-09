import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const expiry = decodedToken.exp;
        console.log("Token expiry:", expiry);
        if (expiry * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setUserRole(decodedToken.role);
          console.log("Token is valid, setting isAuthenticated to true");
        } else {
          localStorage.removeItem("token");
          console.log("Token is expired, removing token from localStorage");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userRole, setIsAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

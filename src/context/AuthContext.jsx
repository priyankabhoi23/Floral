"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load from local storage
    const savedUser = localStorage.getItem("bloomcraft_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error loading user from localStorage", e);
      }
    }
  }, []);

  const login = (phone) => {
    const newUser = { 
      phone,
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: ""
    };
    setUser(newUser);
    localStorage.setItem("bloomcraft_user", JSON.stringify(newUser));
  };

  const updateProfile = (profileData) => {
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);
    localStorage.setItem("bloomcraft_user", JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bloomcraft_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

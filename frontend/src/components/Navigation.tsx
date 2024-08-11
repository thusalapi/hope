import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { Button } from "./atoms/Button";

export const Navigation: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          My App
        </Link>
        <div>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="mr-4">
                Dashboard
              </Link>
              <Link to="/profile" className="mr-4">
                Profile
              </Link>
              <Button onClick={logout} variant="outline">
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">
                Login
              </Link>
              <Link to="/register" className="mr-4">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

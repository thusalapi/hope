import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { login as loginService } from "../services/authService";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token, user } = await loginService(email, password);
      login(token, user.toString());
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full px-3 py-2 border rounded"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full px-3 py-2 border rounded"
      />
      <Button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Log In
      </Button>
    </form>
  );
};

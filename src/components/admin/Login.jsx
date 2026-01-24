import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../firebase/confic";

import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      //  SUCCESS toast
      toast.success("Welcome Admin! Login successful ");

      // slight delay so toast is visible
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 800);

    } catch (err) {
      //  ERROR toast
      toast.error("Invalid email or password ");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white/5 backdrop-blur border border-white/10 rounded-2xl px-8 py-10"
      >
        <h1 className="text-white text-3xl font-bold text-center mb-6">
          Admin Login
        </h1>

        {/* Email */}
        <div className="flex items-center mb-4 bg-white/5 ring-1 ring-white/10 rounded-full px-5 h-12">
          <Mail className="text-white/60 h-4 w-4" />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="ml-3 w-full bg-transparent text-white outline-none"
          />
        </div>

        {/* Password */}
        <div className="flex items-center mb-6 bg-white/5 ring-1 ring-white/10 rounded-full px-5 h-12">
          <Lock className="text-white/60 h-4 w-4" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="ml-3 w-full bg-transparent text-white outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full h-11 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition disabled:opacity-60"
        >
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;

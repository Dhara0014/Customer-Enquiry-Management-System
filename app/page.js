
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "./components/dbConnection/supabaseClient";

export default function Home() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const route = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Login Data:", formData);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

        if (error) {
      // alert(error.message);
    } else {
      route.push("/dashboard");
    }
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-white/10  backdrop-blur-lg p-16 rounded-2xl shadow-2xl w-full max-w-lg">
        {/* App Name */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Customer Enquiry Manager</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 rounded-lg  border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/50"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

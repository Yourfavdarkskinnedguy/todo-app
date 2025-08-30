"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { supabase } from "./lib/supabaseClient";
import { signUp, signIn, signOut } from "./lib/todoService"
import { useState } from "react";






export default function Home({}) {


  const [email, setEmail] = useState("");


  const [errormsg, setError] = useState<string>("");

  const [password, setPassword] = useState("");
  const router = useRouter();



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log('password:', password)
  };



  const handleClick = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login failed:", error.message);
        setError(error.message);
        return;
      }

      console.log("Login successful:", data);
      console.log('email checckkk is ', email)
      
      console.log('data id checkkkkk is', data.user.id)
      router.push(`/todo?email=${encodeURIComponent(email)}`);

    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong. Please try again.");
    }
  };



  return (



    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-background">
      {/* Logo at the top */}
      <Image
        className="dark:invert mb-6"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />

      {/* Form Card */}
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-xl">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-purple-500">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to continue.</p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none"
              htmlFor="email"
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none"
              htmlFor="password"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
            />
          </div>


          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
            onClick={handleClick}
          >
            Login
          </button>

          <p id="error-message" className="text-red-500 mt-2">{errormsg}</p>
        </form>

        {/* Signup link */}
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            className="font-medium text-blue-500 hover:underline"
            href="/signup"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

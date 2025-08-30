"use client";

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { supabase } from "../lib/supabaseClient"
import {signUp} from "../lib/todoService"
import { useState } from "react";






export default function Home() {


  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");  
  const router = useRouter();



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log('password:', password) 
  };



  const handleClick = () => {

    ///if auth is completed then 
    signUp(email, password)
    supabase.from("todos").upsert({
        user_email: email
    })
    router.push('/todo')
    console.log('login button clicked!')
  };

  


  return (

    

    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-background">
  



      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-xl">

        <div className="text-center">
          <h1 className="text-3xl font-bold text-purple-500 uppercase">sign up</h1>
          <p className="text-muted-foreground">Sign up to get started.</p>
        </div>


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
            Sign up
          </button>
          <p id="error-message" className="text-red-500 mt-2"></p>
        </form>


        <div className="text-center text-sm">
          already have an account?{" "}
          <Link
            className="font-medium text-blue-500 hover:underline"
            href="/"
          >
            login
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client"
import React from 'react';
import Image from 'next/image';
import { supabase } from '@/services/supabaseClient';
import {Button} from '@/components/ui/button';


function Login() {
  /**
   * Used to Sign with Google
   */
  const signInWithGoogle = async() => {
    const {error}=await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })
    if (error) {
      console.error('Error:', error.message);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center border rounded-2xl p-8  shadow-lg ">
        
        {/* Logo */}
        <div className=" flex items-center">
            <Image
                src="/logo.png"
                alt="logo"
                width={400}
                height={100}
                className="w-[180px] "
            />
        </div>
        <div className="flex  items-center flex-col">
          <Image
            src="/login.png"
            alt="login"
            width={600}
            height={400}
            className="w-[400px] h-[250px] rounded-2xl"
          />
        </div>

        {/* Text Content */}
        <h2 className="text-2xl font-bold text-center mt-5">Welcome to AiCruiter</h2>
        <p className="text-gray-500 text-center">Sign In With Google Authentication</p>

        {/* Button */}
        <button className="mt-7 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg" 
        onClick={signInWithGoogle}>
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default Login;

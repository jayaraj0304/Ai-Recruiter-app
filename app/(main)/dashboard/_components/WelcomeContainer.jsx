"use client";
import React from 'react';
import Image from 'next/image';
import { useUser } from '@/app/provider';

function WelcomeContainer() {
  const { user } = useUser();

  return (
    <div className='bg-white p-5 rounded-xl flex justify-between items-center w-full'>
      <div className='w-full'>
        <h2 className='text-lg font-bold'>
          Welcome Back, {user?.name}
        </h2>
        <h2 className='text-gray-500'>
          AI-Driven Interviews, Hassle-Free Hiring
        </h2>
        {user?.credits !== undefined && (
          <p className='mt-2 text-sm text-blue-600 font-medium'>
            Credits Available: <span className='font-semibold'>{user.credits}</span>
          </p>
        )}
      </div>

      {user?.picture && (
        <Image
          src={user.picture}
          alt="Profile Picture"
          width={40}
          height={40}
          className='rounded-full mt-5'
        />
      )}
    </div>
  );
}

export default WelcomeContainer;

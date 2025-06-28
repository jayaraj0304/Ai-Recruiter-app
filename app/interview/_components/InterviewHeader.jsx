import React from 'react'
import Image from 'next/image';
function InterviewHeader() {
  return (
    <div className='p-4 shadow-sm'>
        <Image src={'/logo.png'}alt=''width={200} height={100}
         className='w-[180px]'   
            
            
            />


    </div>
  )
}

export default InterviewHeader
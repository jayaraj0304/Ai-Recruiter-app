"use client"
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { Toaster } from "@/components/ui/sonner"
import { useRouter } from 'next/navigation'
import { Progress } from "@/components/ui/progress"
import FormContainer from './_components/FormContainer'
import { toast } from 'sonner'
import QuestionsList from './_components/QuestionsList'
import InterviewLink from './_components/InterviewLink'
import { useUser } from '@/app/provider'
function CreateInterview() {
  const router=useRouter();
  const[step,setStep]=useState(1);
  const[formData,setFormData]=useState();
  const [interview_id,setInterviewId]=useState();
  const {user}=useUser
  const onHandleInputChange=(field,value)=>{
    setFormData((prev)=> ({
      ...prev,
      [field]: value
    }))
    console.log("Form Data:", formData);
  }
  const onGoToNext=()=>{
    if (user?.credits <= 0) {
      toast.error("Please purchase credits to create an interview");
      router.push('/dashboard/pricing');
      return;
    } 
    if (!formData?.jobPosition || !formData?.jobDescription || !formData?.duration || !formData?.type) {
      return toast("Please fill all the fields");
    }
    setStep(step+1);
  }
  const onCreateLink=(interview_id)=>{
    setInterviewId(interview_id);
    setStep(step+1);
    
  }


  return (
    <div className='mt-10 px-10 md:px-24 lg:px-44 xl:px-56'>
      <div className='flex gap-5 items-center'>
        <ArrowLeft onClick={()=>router.back()}className='cursor-pointer'/>
        <h2 className='font-bold text-2xl'>Create New Interview</h2>
       
      </div> 
      <Progress value={step*33.33} className='my-5' />
      {step==1?<FormContainer onHandleInputChange={onHandleInputChange}
      GoToNext={onGoToNext}/>
      :step==2?<QuestionsList formData={formData}onCreateLink={(interview_id)=>onCreateLink(interview_id)}/>:
      step==3?<InterviewLink interview_id={interview_id} formData={formData}/>:null}
    </div>
  )
}

export default  CreateInterview
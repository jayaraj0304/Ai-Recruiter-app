"use client";
import { Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InterviewCard from "./interviewcard";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";

function LatestInterviewsList() {
  const router = useRouter();
  const [InterviewList, setInterviewList] = useState([]);
  const [feedbackCounts, setFeedbackCounts] = useState({});
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      GetInterviewList();
      GetFeedbackCounts();
    }
    // eslint-disable-next-line
  }, [user]);

  // Fetch interviews
  const GetInterviewList = async () => {
    let { data: Interviews, error } = await supabase
      .from("interviews")
      .select("*")
      .eq("userEmail", user?.email)
      .order('id', { ascending: false })
      .limit(6);

    setInterviewList(Interviews || []);
  };

  // Fetch feedbacks and count per interview_id
  const GetFeedbackCounts = async () => {
    let { data: Feedbacks, error } = await supabase
      .from("interview-feedback")
      .select("interview_id")
      .in("interview_id", InterviewList.map(i => i.interview_id));

    // Count feedbacks per interview_id
    const counts = {};
    (Feedbacks || []).forEach(fb => {
      counts[fb.interview_id] = (counts[fb.interview_id] || 0) + 1;
    });
    setFeedbackCounts(counts);
  };

  // Refetch feedback counts when interviews change
  useEffect(() => {
    if (InterviewList.length > 0) {
      GetFeedbackCounts();
    }
    // eslint-disable-next-line
  }, [InterviewList]);

  return (
    <div className='my-5'>
      <h2 className='font-bold text-2xl py-1'>Previously Created Interviews</h2>
      {InterviewList.length === 0 ? (
        <div className='p-5 flex flex-col rounded-lg gap-3 items-center mt-5'>
          <Video className='h-10 w-10 text-primary'/>
          <h2>You don't have any interview created</h2>
          <Button className="cursor-pointer"
            onClick={() => router.push("/dashboard/create-interview")}>+ Create New Interview </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
          {InterviewList.map((interview, index) => (
            <InterviewCard
              interview={interview}
              feedbackCount={feedbackCounts[interview.interview_id] || 0}
              key={interview.id || index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default LatestInterviewsList;
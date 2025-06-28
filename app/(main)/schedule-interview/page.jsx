"use client";
import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import { Video } from "lucide-react";
import React, { useEffect, useState } from "react";
import InterviewCard from "../dashboard/_components/interviewcard";
import { useRouter } from "next/navigation";
import Link from "next/link";

function ScheduledInterview() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState();

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);
  const GetInterviewList = async () => {
    const result = await supabase
      .from("interviews")
      .select("jobPosition,duration,interview_id,interview-feedback(userEmail)")
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });

    setInterviewList(result.data); // Use result.data which is an array of records
  };

  return (
    <div className="mt-5 px-2 sm:px-4 md:px-8">
      <h2 className="font-bold text-xl sm:text-2xl mb-4 text-center sm:text-left">
        Interview List with feedback
      </h2>
      {interviewList?.length === 0 ? (
        <div className="p-5 flex flex-col items-center gap-3 text-center text-gray-500 bg-white border rounded-xl shadow-sm">
          <Video className="text-primary h-10 w-10" />
          <h2 className="text-base">You don't have any interview created</h2>
          <Button
            className="cursor-pointer w-full sm:w-auto"
            onClick={() => router.push("/dashboard/create-interview")}
          >
            + Create New Interview
          </Button>
        </div>
      ) : (
        interviewList && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {interviewList?.map((interview, index) => (
              <InterviewCard
                interview={interview}
                feedbackCount={Array.isArray(interview["interview-feedback"]) ? interview["interview-feedback"].length : 0}
                key={index}
                viewDetail={true}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default ScheduledInterview;
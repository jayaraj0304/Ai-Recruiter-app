"use client";
import { supabase } from "@/services/supabaseClient";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/provider";
import InterviewDetailContainer from "./_components/InteviewDetailContainer";
import CandidateList from "./_components/CandidateList";

function InterviewDetail() {
  const { interview_id } = useParams();
  const { user } = useUser();
  const [interviewDetail, setInterviewDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      GetInterviewDetail();
    }
  }, [user]);

  const GetInterviewDetail = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("interviews")
        .select(
          "jobPosition, jobDescription, type, questionsList, duration, interview_id, created_at, interview-feedback (userEmail, userName, feedback, created_at)"
        )
        .eq("userEmail", user.email)
        .eq("interview_id", interview_id);

      if (error) throw error;

      setInterviewDetail(data?.[0] || null);
    } catch (err) {
      console.error("Error fetching interview details:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="mt-5">Loading interview details...</div>;
  }

  if (error) {
    return <div className="mt-5 text-red-500">Error: {error}</div>;
  }

  if (!interviewDetail) {
    return <div className="mt-5">No interview found</div>;
  }

  return (
    <div className="mt-5 space-y-6">
      <h2 className="font-bold text-2xl">Interview Details</h2>
      <InterviewDetailContainer interviewDetail={interviewDetail} />
      <CandidateList 
        candidateList={interviewDetail["interview-feedback"] || []} 
      />
    </div>
  );
}

export default InterviewDetail;
"use client";

import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState, useRef } from "react";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_components/AlertConfirmation";
import axios from "axios";
import TimmerComponent from "./_components/TimmerComponent";
import { getVapiClient } from "@/lib/vapiconfig";
import { supabase } from "@/services/supabaseClient";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const vapi = getVapiClient();
  const { interview_id } = useParams();
  const router = useRouter();

  const [activeUser, setActiveUser] = useState(false);
  const [start, setStart] = useState(false);
  const [subtitles, setSubtitles] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [userProfile, setUserProfile] = useState({
    picture: null,
    name: interviewInfo?.candidate_name || "Candidate"
  });

  const conversation = useRef(null);
  const hasStarted = useRef(false);
  const feedbackGenerated = useRef(false);

  // Restore user profile from localStorage if needed
  useEffect(() => {
    if (typeof window !== "undefined" && !userProfile.name) {
      const googleProfile = localStorage.getItem("googleProfile");
      if (googleProfile) {
        const { picture, name } = JSON.parse(googleProfile);
        setUserProfile({ picture, name });
      }
    }

    if (interviewInfo?.jobPosition && vapi && !hasStarted.current) {
      hasStarted.current = true;
      setStart(true);
      startCall();
    }
  }, [interviewInfo, vapi]);

  // Start the AI call
  const startCall = async () => {
    const jobPosition = interviewInfo?.jobPosition || "Unknown Position";
    const questionsList = Array.isArray(interviewInfo?.questionsList)
      ? interviewInfo.questionsList.map(item => item.question).join(', ')
      : '';

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewInfo?.candidate_name}, how are you? Ready for your interview on ${interviewInfo?.jobPosition}?`,
      transcriber: {
        provider: "deepgram",
        model: "nova-3",
        language: "en-US",
      },
      voice: {
        provider: "vapi",
        voiceId: "Neha",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Start with: 
"Hey ${interviewInfo?.candidate_name}! Welcome to your ${interviewInfo?.jobPosition} interview. Let’s get started!"
Ask each of these questions one-by-one:
Questions: ${questionsList}
Give hints if needed, provide brief feedback after answers, and end on a positive note.
Be casual, clear, and concise.
`.trim(),
          },
        ],
      },
    };

    vapi.start(assistantOptions);
  };

  // Event handlers (must be named for proper cleanup)
  const handleMessage = (message) => {
    if (message?.role === "assistant" && message?.content) {
      setSubtitles(message.content);
    }
    if (message?.conversation) {
      const filtered = message.conversation.filter(msg => msg.role !== "system");
      conversation.current = JSON.stringify(filtered, null, 2);
    }
  };

  const handleSpeechStart = () => {
    setIsSpeaking(true);
    setActiveUser(false);
    toast("AI is speaking...");
  };

  const handleSpeechEnd = () => {
    setIsSpeaking(false);
    setActiveUser(true);
  };

  const handleCallStart = () => {
    toast("Call started...");
  };

  const handleCallEnd = () => {
    if (feedbackGenerated.current) return;
    feedbackGenerated.current = true;
    toast("Call has ended. Generating feedback...");
    setIsGeneratingFeedback(true);
    setStart(false);
    GenerateFeedback();
  };

  // Attach and clean up event listeners
  useEffect(() => {
    if (!vapi) return;

    vapi.on("message", handleMessage);
    vapi.on("call-start", handleCallStart);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("call-end", handleCallEnd);

    return () => {
      vapi.off("message", handleMessage);
      vapi.off("call-start", handleCallStart);
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("call-end", handleCallEnd);
    };
  }, [vapi]);

  // Feedback generation
  const GenerateFeedback = async () => {
    try {
      const result = await axios.post("/api/ai-feedback", {
        conversation: conversation.current,
      });

      const content = result?.data?.content?.replace("```json", "")?.replace("```", "");
      if (!content) throw new Error("Feedback content is empty");

      await supabase.from("interview-feedback").insert([
        {
          userName: interviewInfo?.candidate_name,
          userEmail: interviewInfo?.userEmail,
          interview_id: interview_id,
          feedback: JSON.parse(content),
          recommended: false,
        },
      ]);

      toast.success("Feedback generated successfully!");
      router.replace(`/interview/${interviewInfo?.interview_id}/completed`);
    } catch (error) {
      console.error("Feedback generation failed:", error);
      toast.error("Failed to generate feedback");
    } finally {
      setIsGeneratingFeedback(false);
    }
  };

  // Stop interview handler
  const stopInterview = () => {
    vapi.stop();
    setStart(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {interviewInfo?.jobPosition || "AI"} Interview Session
            </h1>
            <p className="text-gray-600">Powered by AI Interview Assistant</p>
          </div>
          <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <Timer className="text-blue-600" />
            <span className="font-mono text-lg font-semibold text-gray-700">
              <TimmerComponent start={start} />
            </span>
          </div>
        </header>

        {/* Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* AI Recruiter Panel */}
          <div className={`bg-white rounded-xl p-6 shadow-md border ${isSpeaking ? "border-blue-300 ring-2 ring-blue-100" : "border-gray-200"}`}>
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="relative">
                {isSpeaking && <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-75"></div>}
                <div className="relative z-10 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md bg-blue-100">
                  <Image src="/AIR.png" alt="AI Recruiter" width={80} height={80} className="object-cover w-full h-full" priority />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800">AI Recruiter</h2>
                <p className="text-sm text-gray-500">Interview HR</p>
              </div>
            </div>
          </div>

          {/* Candidate Panel */}
          <div className={`bg-white rounded-xl p-6 shadow-md border ${activeUser ? "border-purple-300 ring-2 ring-purple-100" : "border-gray-200"}`}>
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="relative">
                {activeUser && <div className="absolute inset-0 rounded-full bg-purple-100 animate-ping opacity-75"></div>}
                <div className="relative z-10 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100 flex items-center justify-center">
                  <h2 className="text-2xl bg-primary px-6 text-white p-3 rounded-full">
                    {interviewInfo?.candidate_name?.[0]?.toUpperCase() || "?"}
                  </h2>
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800">{userProfile.name}</h2>
                <p className="text-sm text-gray-500">Candidate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subtitles */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-200">
          <div className="min-h-16 flex items-center justify-center">
            {subtitles ? (
              <p className="text-center text-gray-700 animate-fadeIn">"{subtitles}"</p>
            ) : (
              <p className="text-center text-gray-400">{isSpeaking ? "AI is speaking..." : "Waiting for response..."}</p>
            )}
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
          <div className="flex flex-col items-center">
            <div className="flex gap-4 mb-4">
              <AlertConfirmation stopInterview={stopInterview}>
                <div className="p-3 rounded-full bg-red-100 text-red-600 hover:bg-red-200 shadow-sm transition-all flex items-center gap-2">
                  <Phone size={20} />
                  <span>End Interview</span>
                </div>
              </AlertConfirmation>
            </div>
            <p className="text-sm text-gray-500">{activeUser ? "Please respond..." : "AI is speaking..."}</p>
          </div>
        </div>
      </div>

      {/* Feedback Loader */}
      {isGeneratingFeedback && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Generating Feedback</h2>
            <p className="text-gray-600">Please wait while we analyze your interview...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StartInterview;
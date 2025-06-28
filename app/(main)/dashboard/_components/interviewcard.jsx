import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Send } from "lucide-react";
import moment from "moment";
import React from "react";
import { toast } from "sonner";
import Link from "next/link";

function InterviewCard({ interview, viewDetail = false, feedbackCount }) {
  const getInterviewUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_HOST_URL.replace(/\/$/, "");
  return `${baseUrl}/${interview?.interview_id}`;
};

  const copyLink = async () => {
    try {
      const url = getInterviewUrl();
      await navigator.clipboard.writeText(url);
      toast.success("Interview link copied!");
    } catch (err) {
      toast.error("Failed to copy link");
      console.error("Failed to copy: ", err);
    }
  };

  const onSend = () => {
    const interviewUrl = getInterviewUrl();
    window.location.href = `mailto:?subject=AI Recruiter Interview Link&body=Hi, I would like to schedule an interview with you. Please find the link below:\n\n${interviewUrl}`;
    toast.success("Email opened with pre-filled link!");
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 w-full dark:bg-gray-800 dark:border-gray-700">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between w-full gap-2">
        <div className="flex items-start gap-3 flex-1">
          <div className="h-3 w-3 bg-blue-500 rounded-full mt-1.5 flex-shrink-0 dark:bg-blue-400" />
          <div className="flex-1 min-w-0">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
              {interview?.jobPosition}
            </h2>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">
                {moment(interview?.created_at).format("DD MMM YYYY")}
              </span>
              <span className="text-xs text-gray-300 dark:text-gray-500">•</span>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">
                {interview?.duration}
              </span>
              <span className="text-xs sm:text-sm text-green-700 font-bold">
                {feedbackCount} candidate{feedbackCount !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
        {/* Scheduled badge */}
        {/* <span className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full dark:bg-blue-900 dark:text-blue-200 whitespace-nowrap mt-2 sm:mt-0">
          Scheduled
        </span> */}
      </div>

      {/* Action Buttons */}
      {!viewDetail ? (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
          <Button
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-gray-200 py-2 text-sm sm:text-base"
            onClick={copyLink}
          >
            <Copy size={16} className="text-gray-600 dark:text-gray-300" />
            <span>Copy Link</span>
          </Button>
          <Button
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 py-2 text-sm sm:text-base"
            onClick={onSend}
          >
            <Send size={16} className="text-white" />
            <span>Send</span>
          </Button>
        </div>
      ) : (
        <Link
          href={`/schedule-interview/${interview?.interview_id}/details`}
          className="block mt-4 sm:mt-5"
        >
          <Button
            className="w-full gap-2 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 py-2 text-sm sm:text-base"
            variant="outline"
          >
            View Details
            <ArrowRight className="h-4 w-4 dark:text-gray-300" />
          </Button>
        </Link>
      )}
    </div>
  );
}

export default InterviewCard;

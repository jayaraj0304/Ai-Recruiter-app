import { Calendar, Clock, MessageCircleQuestionIcon } from "lucide-react";
import moment from "moment";
import React from "react";

function InterviewDetailContainer({ interviewDetail }) {
  const parsedQuestions = (() => {
    const raw = interviewDetail?.questionsList;

    try {
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (Array.isArray(parsed)) return parsed;
      if (Array.isArray(parsed?.interviewQuestions)) return parsed.interviewQuestions;
      return [];
    } catch {
      return [];
    }
  })();

  return (
    <div className="p-5 bg-white border rounded-xl shadow-sm mt-5">
      <h2 className="font-bold">{interviewDetail?.jobPosition}</h2>

      {/* Info row */}
      <div className="mt-4 flex items-center justify-between lg:pr-52">
        <div>
          <h2 className="text-sm text-gray-500">Duration</h2>
          <h2 className="font-bold flex text-sm items-center gap-2">
            <Clock className="h-4 w-4" />
            {interviewDetail?.duration}
          </h2>
        </div>

        <div>
          <h2 className="text-sm text-gray-500">Created on</h2>
          <h2 className="font-bold flex text-sm items-center gap-2">
            <Calendar className="h-4 w-4" />
            {moment(interviewDetail?.created_at).format("MMMM Do YYYY, h:mm a")}
          </h2>
        </div>

        {interviewDetail?.type && (
          <div>
            <h2 className="text-sm text-gray-500">Type</h2>
            <h2 className="font-bold flex text-sm items-center gap-2">
              <Clock className="h-4 w-4" />
              {JSON.parse(interviewDetail?.type)[0]}
            </h2>
          </div>
        )}
      </div>

      {/* Job Description */}
      <div className="mt-5">
        <h2 className="font-bold">Job Description</h2>
        <p className="text-sm leading-6 whitespace-pre-wrap">{interviewDetail?.jobDescription}</p>
      </div>

      {/* Interview Questions */}
      <div className="mt-5">
        <h2 className="font-bold">Interview Questions</h2>
        <div className="grid grid-cols-1 mt-3 gap-5">
          {parsedQuestions.map((item, index) => (
            <h2 className="text-sm flex items-center gap-2" key={index}>
              <MessageCircleQuestionIcon className="h-4 w-4 text-primary" />
              <span>{index + 1}. {item?.Interviewquestion || item?.question}</span>
            </h2>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InterviewDetailContainer;

import React from "react";
import moment from "moment";
import CandidateListFeedbackDialog from "./CandidateFeedbackDialog";
import exportToCSV from '@/lib/exportToCSV'; // Corrected the import path

function CandidateList({ candidateList }) {
  // Function to calculate average rating (e.g., 6/10)
  const calculateRating = (candidate) => {
    const rating = candidate?.feedback?.feedback?.rating;
    if (!rating) return "N/A";

    const values = Object.values(rating);
    if (!values.length) return "N/A";

    const average = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    return `${average}/10`;
  };

  return (
    <div>
      <h2>Candidates ({candidateList?.length})</h2>
      <button
        onClick={() => exportToCSV(candidateList)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Download CSV
      </button>
      {candidateList?.map((candidate, index) => (
        <div
          key={index}
          className="p-5 flex gap-3 items-center justify-between bg-white border rounded-lg shadow-sm mt-5"
        >
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <span className="text-lg font-bold text-white bg-primary w-full h-full flex items-center justify-center rounded-full">
              {candidate?.userName?.[0].toUpperCase() || "?"}
            </span>
          </div>
          <div>
            <h2 className="font-bold">{candidate?.userName}</h2>
            <h2 className="text-gray-500 text-sm">
              Completed on: {moment(candidate?.created_at).format("MMM DD, yyyy")}
            </h2>
          </div>
          <div className="flex-1 gap-3 items-center" />
          <h2 className="text-green-600">{calculateRating(candidate)}</h2>
          <CandidateListFeedbackDialog candidate={candidate} />
        </div>
      ))}
    </div>
  );
}

export default CandidateList;

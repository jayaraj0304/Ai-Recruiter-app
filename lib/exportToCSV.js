import { saveAs } from 'file-saver';
import Papa from 'papaparse';

const exportToCSV = (candidates) => {
  const data = candidates.map(c => ({
    Name: c.userName,
    Email: c.userEmail,
    Score: c.feedback?.feedback?.overallScore || 0,
    TechnicalSkills: c.feedback?.feedback?.rating?.TechnicalSkills || 0,
    Communication: c.feedback?.feedback?.rating?.Communication || 0,
    ProblemSolving: c.feedback?.feedback?.rating?.ProblemSolving || 0,
    Experience: c.feedback?.feedback?.rating?.Experience || 0,
    Behavioral: c.feedback?.feedback?.rating?.Behavioral || 0,
    Thinking: c.feedback?.feedback?.rating?.Thinking || 0,
    Recommendation: c.feedback?.feedback?.Recommendation || '', // <-- lowercase
    RecommendationMessage: c.feedback?.feedback?.recommendationMessage || '', // <-- lowercase
    Summary: Array.isArray(c.feedback?.feedback?.summary)
      ? c.feedback.feedback.summary.join('; ')
      : (c.feedback?.feedback?.summary || '')
  }));

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv" });
  saveAs(blob, "candidates.csv");
};
export default exportToCSV;
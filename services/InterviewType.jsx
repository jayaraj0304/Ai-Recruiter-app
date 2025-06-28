import { Code2Icon, User2Icon, BriefcaseBusinessIcon, Puzzle, Award } from 'lucide-react';

export const InterviewType = [
  {
    title: 'Technical',
    icon: Code2Icon,
  },
  {
    title: 'Behavioral',
    icon: User2Icon,
  },
  {
    title: 'Experience',
    icon: BriefcaseBusinessIcon,
  },
  {
    title: 'Problem Solving',
    icon: Puzzle,
  },
  {
    title: 'Leadership',
    icon: Award, // ✅ Example icon, change if needed
  },
];
export const InterviewTypeOptions = InterviewType.map((type) => ({}))
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { InterviewType } from "@/services/InterviewType";

function FormContainer({ onHandleInputChange, GoToNext }) {
  const [interviewType, setInterviewType] = useState([]);

  useEffect(() => {
    onHandleInputChange("type", interviewType);
  }, [interviewType]);

  const handleInterviewType = (type) => {
    const isSelected = interviewType.includes(type.title);
    if (!isSelected) {
      setInterviewType((prev) => [...prev, type.title]);
    } else {
      const result = interviewType.filter((item) => item !== type.title);
      setInterviewType(result);
    }
  };

  return (
    <div className="p-5 bg-white rounded-xl shadow-md">
      {/* Job Position */}
      <div>
        <h2 className="text-sm font-medium">Job Position</h2>
        <Input
          placeholder="e.g. Full Stack Developer"
          className="mt-2 w-full border border-gray-300"
          onChange={(event) =>
            onHandleInputChange("jobPosition", event.target.value)
          }
        />
      </div>

      {/* Job Description */}
      <div className="mt-5">
        <h2 className="text-sm font-medium">Job Description</h2>
        <Textarea
          placeholder="Enter detailed job description"
          className="mt-2 h-[200px] border border-gray-300"
          onChange={(event) =>
            onHandleInputChange("jobDescription", event.target.value)
          }
        />
      </div>

      {/* Interview Duration */}
      <div className="mt-5">
        <h2 className="text-sm font-medium">Interview Duration</h2>
        <Select
          onValueChange={(value) => onHandleInputChange("duration", value)}
        >
          <SelectTrigger className="w-full mt-2 border border-gray-300">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5 Min">5 Min</SelectItem>
            <SelectItem value="15 Min">15 Min</SelectItem>
            <SelectItem value="30 Min">30 Min</SelectItem>
            <SelectItem value="45 Min">45 Min</SelectItem>
            <SelectItem value="60 Min">60 Min</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Interview Type */}
      <div className="mt-5">
        <h2 className="text-sm font-medium">Interview Type</h2>
        <div className="flex gap-3 flex-wrap mt-2">
          {InterviewType.map((type, index) => (
            <div
              key={index}
              onClick={() => handleInterviewType(type)}
              className={`flex items-center cursor-pointer gap-2 px-4 py-2 border border-gray-300 rounded-2xl
                ${
                  interviewType.includes(type.title)
                    ? "bg-blue-50 text-primary"
                    : "bg-white hover:bg-gray-100"
                }
              `}
            >
              <type.icon className="h-4 w-4" />
              <span className="text-sm">{type.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-5 flex justify-end">
        <Button className='cursor-pointer'onClick={GoToNext}>
          Generate Questions <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default FormContainer;

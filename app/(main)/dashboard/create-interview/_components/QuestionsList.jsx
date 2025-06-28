import { Loader2Icon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import axios from 'axios';
import QuestionLIstCOntainer from './QuestionLIstCOntainer';
import { useUser } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';

function QuestionsList({ formData, onCreateLink }) {
  const [loading, setLoading] = useState(true);
  const [questionsList, setQuestionsList] = useState([]);
  const {user}=useUser();
  const [saveLoading, setSaveLoading] = useState(false);
  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post('/api/ai-model', {
        ...formData
      });
      console.log("AI Response:", result.data.content);

      // Remove code block markers before parsing
      let FINAL_JSON = result.data.content.replace('```json', '').replace('```', '').trim();

      let parsed;
      try {
        parsed = JSON.parse(FINAL_JSON);
      } catch (e) {
        toast('Failed to parse AI response. Check console.');
        console.error("Parsing error:", e, "Raw content:", FINAL_JSON);
        setLoading(false);
        return;
      }

      setQuestionsList(parsed?.interview_questions || parsed?.interviewQuestions || []);
      setLoading(false);
    } catch (error) {
      toast('SERVER ERROR: ' + (error.response?.data?.error || error.message));
      setLoading(false);
    }
  };
  const onFinish = async() => {
    setSaveLoading(true);
    const interview_id = uuidv4();
    const { data, error } = await supabase
      .from('interviews')
      .insert([
              { 
                ...formData,
                questionsList:questionsList,
                userEmail:user?.email,
                interview_id:interview_id
              },
      ])
      .select()
      //update user credits//
      const userUpdate = await supabase
        .from("Users")
        .update({ credits: Number(user?.credits) - 1 })
        .eq("email", user?.email)
        .select();

      setSaveLoading(false);
      onCreateLink(interview_id);
  }
  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return (
    <div>
      {loading &&
        <div className='p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center'>
          <Loader2Icon className='animate-spin' />
          <div>
            <h2 className='font-medium'>Generating Interview Questions</h2>
            <p className='text-primary'>Our AI is crafting personalized questions based on your job position</p>
          </div>
        </div>
      }
      {questionsList?.length > 0 &&
      <div>
        <QuestionLIstCOntainer questionsList={questionsList}/>
        </div>
      }
      <div className='flex justify-end mt-10'>
        <Button onClick={()=>onFinish()} disabled={saveLoading} >
          {saveLoading && <Loader2Icon className='animate-spin' />}
          Create Interview Link & Finish</Button>
      </div>
    </div>
  );
}

export default QuestionsList;
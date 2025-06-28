import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Plus, Copy, Mail, Clock, List } from 'lucide-react';

function InterviewLink({ interview_id, formData }) {
  const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview_id;

  const onCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast.success('Link Copied');
  };
  const nativeShare = () => {
  if (navigator.share) {
    navigator.share({
      title: 'AI Interview Link',
      text: 'Start your AI Interview using the link below:',
      url: url,
    })
      .then(() => toast.success("Shared successfully!"))
      .catch(() => toast.error("Share canceled or failed"));
  } else {
    toast.error("Sharing not supported on this browser");
  }
};

  const shareViaEmail = () => {
    const subject = encodeURIComponent("AI Interview Invitation");
    const body = encodeURIComponent(`Hi,\n\nPlease use the link below to start your interview:\n\n${url}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(`Hi! Here's your interview link: ${url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const shareViaSlack = () => {
    toast.info("Slack sharing not integrated yet. Please copy the link manually."); 
    // You can integrate Slack Webhooks or Slack API if needed
  };

  return (
    <div className='flex flex-col items-center justify-center mt-10'>
      <Image src={'/check1.png'} alt='check' width={200} height={200} className='w-[70px] h-[70px]' />
      <h2 className='font-bold text-lg mt-4'>Your AI Interview is Ready!</h2>
      <p className='mt-3'>Share this link with your candidates to start the interview process</p>

      <div className='w-full p-7 mt-6 rounded-lg bg-white flex flex-col'>
        <div className='flex justify-between items-center '>
          <h2 className='font-bold'>Interview Link</h2>
          <h2 className='p-1 px-2 text-primary bg-blue-50 rounded-4xl'>Valid for 30 Days</h2>
        </div>

        <div className='mt-3 flex gap-3 items-center'>
          <Input defaultValue={url} disabled />
          <Button onClick={onCopyLink}><Copy />Copy Link </Button>
        </div>

        <hr className='my-5' />

        <div className='flex gap-5'>
          <h2 className='text-sm text-gray-500 flex gap-2 items-center'><Clock className='h-4 w-4' />{formData?.duration}</h2>
          <h2 className='text-sm text-gray-500 flex gap-2 items-center'><List className='h-4 w-4' />Question Set</h2>
        </div>
      </div>

      <div className='mt-7 bg-white w-full p-5 rounded-lg'>
        <h2 className='font-bold'>Share Via</h2>
        <div className='flex gap-5 mt-2'>
          <Button variant={'outline'} onClick={shareViaEmail}><Mail />Email</Button>
          <Button variant={'outline'} onClick={shareViaSlack}><Mail />Slack</Button>
          <Button variant={'outline'} onClick={shareViaWhatsApp}><Mail />WhatsApp</Button>
           <Button variant={'outline'} onClick={nativeShare}><Plus />Others</Button>
        </div>
      </div>

      <div className='flex w-full gap-5 justify-between mt-6'>
        <Link href={'/dashboard'}>
          <Button variant={'outline'}><ArrowLeft />Back to Dashboard</Button>
        </Link>
        <Link href={'/create-interview'}>
          <Button><Plus />Create New Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default InterviewLink;

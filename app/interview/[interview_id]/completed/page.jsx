import { Check, Clock, Mail, Shield, ChevronRight } from 'lucide-react';
import React from 'react';

const InterviewCompleted = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-8 overflow-y-auto">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-6 sm:p-10 text-center relative overflow-hidden border border-gray-100">
        
        {/* Decorative Background Bubbles */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-100 rounded-full opacity-20 z-0"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-purple-100 rounded-full opacity-20 z-0"></div>

        {/* Animated Checkmark */}
        <div className="relative z-10 mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-br from-green-100 to-green-50 mb-6 animate-soft-bounce">
          <div className="absolute inset-0 rounded-full border-4 border-green-100 opacity-60 animate-ping-slow"></div>
          <Check className="h-12 w-12 text-green-600" />
        </div>

        {/* Title & Intro */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Interview Submitted <span className="text-blue-600">Successfully</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6">
          Thank you for completing your interview with{' '}
          <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
            Recruiter AI
          </span>. We appreciate your thoughtful responses.
        </p>

        {/* Status Timeline */}
        <div className="relative z-10 space-y-5 mb-8 text-left">
          {/* Secure Processing */}
          <div className="flex items-start p-4 bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded-xl">
            <div className="bg-white p-2 rounded-lg mr-4 shadow-sm border border-blue-100">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 flex items-center">
                Secure Processing <ChevronRight className="ml-1 h-4 w-4 text-blue-400" />
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Your responses are encrypted and stored with enterprise-grade security.
              </p>
            </div>
          </div>

          {/* Review Timeline */}
          <div className="flex items-start p-4 bg-gradient-to-r from-purple-50 to-white border border-purple-100 rounded-xl">
            <div className="bg-white p-2 rounded-lg mr-4 shadow-sm border border-purple-100">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 flex items-center">
                Review Timeline <ChevronRight className="ml-1 h-4 w-4 text-purple-400" />
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Our team will review your responses within{' '}
                <span className="font-medium text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
                  3 business days
                </span>.
              </p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="flex items-start p-4 bg-gradient-to-r from-green-50 to-white border border-green-100 rounded-xl">
            <div className="bg-white p-2 rounded-lg mr-4 shadow-sm border border-green-100">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 flex items-center">
                Next Steps <ChevronRight className="ml-1 h-4 w-4 text-green-400" />
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Expect an email update — check your spam folder if it doesn't appear soon.
              </p>
            </div>
          </div>
        </div>

        {/* Final Box */}
        <div className="relative z-10 bg-gradient-to-r from-gray-50 to-white rounded-xl p-5 border border-gray-200 shadow-inner">
          <div className="flex items-center justify-center space-x-1 mb-3">
            <div className="h-1.5 w-1.5 bg-blue-400 rounded-full animate-pulse" />
            <div className="h-1.5 w-1.5 bg-purple-400 rounded-full animate-pulse delay-100" />
            <div className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse delay-200" />
          </div>
          <p className="text-gray-700 font-medium">
            You've completed all steps! You may now close this window.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Any further questions? Contact{' '}
            <a
              href="mailto:jayarajthamatam123@gmail.com"
              className="text-blue-600 font-medium underline"
            >
              jayarajthamatam123@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterviewCompleted;

'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { supabase } from "@/services/supabaseClient";
import {
  ArrowRight,
  Users2,
  LayoutDashboard,
  FileSearch,
  Sparkles,
  ClipboardCheck,
  Share2,
  BarChart3,
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
    });
  }, []);

  const handleDashboardClick = () => {
    router.push(user ? "/dashboard" : "/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between shadow-sm bg-white sticky top-0 z-50">
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={140} height={32} />
        </div>
        <nav className="hidden md:flex gap-6 text-sm text-gray-600 font-medium">
          <a href="#features" className="hover:text-blue-600">Features</a>
          <a href="#how-it-works" className="hover:text-blue-600">How It Works</a>
          <a href="#pricing" className="hover:text-blue-600">Pricing</a>
        </nav>
        <Button onClick={handleDashboardClick} className="bg-blue-600 hover:bg-blue-700 text-white px-5">
          Dashboard
        </Button>
      </header>

      {/* Hero */}
      <section className="px-4 sm:px-8 py-20 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2 bg-white border border-blue-200 text-blue-600 rounded-full shadow-sm mb-4"
        >
          <Sparkles className="w-5 h-5" />
          AI Recruitment Platform
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          AI-Powered <span className="text-blue-600">Interview Assistant</span> for Modern Recruiters
        </motion.h1>

        <motion.p
          className="max-w-2xl mx-auto mt-4 text-lg text-gray-600"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Let our AI voice agent conduct candidate interviews while you focus on finding the perfect match. Save time, reduce bias, and improve your hiring process.
        </motion.p>

        <motion.div
          className="mt-8 flex justify-center gap-4 flex-wrap"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleDashboardClick}
          >
            Create Interview <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button variant="outline">Watch Demo</Button>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 sm:px-8 py-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "AI-Powered Matching",
              description: "Automatically find top candidates with skill-fit and role-fit scores.",
              icon: <Users2 className="text-blue-500 w-6 h-6" />,
            },
            {
              title: "Smart Dashboards",
              description: "Visual insights into interviews, candidate status, and performance.",
              icon: <LayoutDashboard className="text-indigo-500 w-6 h-6" />,
            },
            {
              title: "Auto-Screening",
              description: "LLM-based resume screening and prompt feedback generation.",
              icon: <FileSearch className="text-purple-500 w-6 h-6" />,
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-50 rounded-full">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-4 sm:px-8 py-20 bg-gradient-to-tr from-indigo-50 to-blue-100">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "1. Create Interview",
              icon: <ClipboardCheck className="w-6 h-6 text-blue-600" />,
              description: "Set up your job requirements and customize interview questions.",
            },
            {
              title: "2. Share with Candidates",
              icon: <Share2 className="w-6 h-6 text-indigo-600" />,
              description: "Send interview links to candidates to complete at their convenience.",
            },
            {
              title: "3. Review Results",
              icon: <BarChart3 className="w-6 h-6 text-purple-600" />,
              description: "Get AI-analyzed results, transcripts, and candidate comparisons.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white border rounded-full">{step.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
              </div>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Footer */}
<footer className="bg-white border-t mt-20">
  <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-gray-600">
    {/* Logo and Description */}
    <div className="space-y-4">
      <Image src="/logo.png" alt="Logo" width={140} height={40} />
      <p className="text-sm">
        AI-powered interview automation platform for recruiters to hire smarter and faster.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h4 className="text-gray-900 font-semibold mb-4">Quick Links</h4>
      <ul className="space-y-2 text-sm">
        <li><a href="#features" className="hover:text-blue-600">Features</a></li>
        <li><a href="#how-it-works" className="hover:text-blue-600">How It Works</a></li>
        <li><a href="#pricing" className="hover:text-blue-600">Pricing</a></li>
      </ul>
    </div>

    {/* Resources */}
    <div>
      <h4 className="text-gray-900 font-semibold mb-4">Resources</h4>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:text-blue-600">Documentation</a></li>
        <li><a href="#" className="hover:text-blue-600">Support</a></li>
        <li><a href="#" className="hover:text-blue-600">Terms & Privacy</a></li>
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h4 className="text-gray-900 font-semibold mb-4">Contact</h4>
      <p className="text-sm mb-1">Created by Jayaraj Thamatam</p>
      <a
        href="mailto:jayarajthamatam123@gmail.com"
        className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016.618 4H3.382a2 2 0 00-1.379 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
        jayarajthamatam123@gmail.com
      </a>
    </div>
  </div>

  <div className="text-center text-sm text-gray-400 border-t py-4">
    &copy; {new Date().getFullYear()} AIcruiter. All rights reserved.
  </div>
</footer>

    </div>
  );
}

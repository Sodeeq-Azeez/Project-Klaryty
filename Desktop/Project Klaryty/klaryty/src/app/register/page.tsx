"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col selection:bg-indigo-500/30 font-sans relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="p-6 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-4">Start your journey to clarity.</h1>
            <p className="text-gray-400">
              Create an account to begin your Business Interview. We don't ask for configuration, just a conversation.
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email address</label>
              <input 
                type="email" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                placeholder="founder@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
              <input 
                type="password" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                placeholder="••••••••"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-white text-black font-medium rounded-lg px-4 py-3 hover:bg-gray-100 transition-colors mt-6 flex justify-center items-center gap-2"
            >
              Begin Interview <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

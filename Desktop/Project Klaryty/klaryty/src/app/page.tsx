"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Search, Brain, Zap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-indigo-500/30 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <span className="text-xl font-semibold tracking-tight">Klaryty</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <Link href="/product" className="hover:text-white transition-colors">How it works</Link>
            <Link href="/manifesto" className="hover:text-white transition-colors">Manifesto</Link>
            <Link href="/login" className="hover:text-white transition-colors">Sign in</Link>
          </div>
          <Link 
            href="/register"
            className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Find Your Clarity
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] opacity-50 mix-blend-screen pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 translate-x-1/4 -translate-y-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[100px] opacity-50 mix-blend-screen pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            <motion.div variants={item} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500" />
              The Operating System for Small Businesses
            </motion.div>
            
            <motion.h1 variants={item} className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
              Run your business with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                absolute clarity.
              </span>
            </motion.h1>
            
            <motion.p variants={item} className="text-lg lg:text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed">
              Say goodbye to the overwhelming chaos of scattered spreadsheets and informal chats. Klaryty is the intelligent operating system that understands your business and organizes it for you.
            </motion.p>
            
            <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-4">
              <Link 
                href="/register"
                className="group relative flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium text-lg hover:scale-105 transition-all active:scale-95"
              >
                Start Your Business Interview
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/manifesto"
                className="px-8 py-4 rounded-full text-white font-medium text-lg border border-white/10 hover:bg-white/5 transition-colors"
              >
                Read the Manifesto
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual Showcase (Abstract Dashboard) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
            className="mt-24 relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-2 max-w-5xl mx-auto shadow-2xl shadow-indigo-500/10"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10 pointer-events-none rounded-2xl" />
            <div className="h-[400px] lg:h-[600px] w-full bg-[#111] rounded-xl overflow-hidden relative flex">
              {/* Mock Sidebar */}
              <div className="w-64 border-r border-white/5 p-6 hidden md:block">
                <div className="h-8 w-24 bg-white/10 rounded mb-12" />
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded bg-white/5" />
                      <div className="h-4 w-32 bg-white/5 rounded" />
                    </div>
                  ))}
                </div>
              </div>
              {/* Mock Main Content */}
              <div className="flex-1 p-8">
                <div className="h-10 w-48 bg-white/10 rounded mb-8" />
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 p-6 flex flex-col justify-between">
                      <div className="h-4 w-20 bg-white/10 rounded" />
                      <div className="h-8 w-32 bg-white/20 rounded" />
                    </div>
                  ))}
                </div>
                <div className="h-64 w-full rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5" />
              </div>

              {/* Floating Intelligence Card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 right-8 w-80 bg-[#1A1A1A] border border-white/10 rounded-xl p-6 shadow-2xl z-20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Brain className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">Business Reasoning Engine</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  I noticed your profit margins for 'Service A' have dropped by 12% due to rising supplier costs.
                </p>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-indigo-500 rounded-full" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Value Proposition (The 3 Layers) */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">From chaos to clarity in three steps.</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We don't ask you to configure software. We just ask how your business works, and we build the exact workspace you need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-colors">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Understand</h3>
              <p className="text-gray-400 leading-relaxed">
                Have a natural conversation with our AI. It asks about your processes, people, and resources, building a complete model of your business.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-colors relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6 relative z-10">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4 relative z-10">2. Operate</h3>
              <p className="text-gray-400 leading-relaxed relative z-10">
                We instantly generate a clear, customized workspace. Dashboards, workflows, and permissions are perfectly aligned with your reality.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Improve</h3>
              <p className="text-gray-400 leading-relaxed">
                As you work, the platform learns. Our AI spots hidden bottlenecks and missing margins, bringing absolute clarity to your growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
            <span className="font-semibold">Klaryty</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/manifesto" className="hover:text-white transition-colors">Manifesto</Link>
            <Link href="/product" className="hover:text-white transition-colors">How it works</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

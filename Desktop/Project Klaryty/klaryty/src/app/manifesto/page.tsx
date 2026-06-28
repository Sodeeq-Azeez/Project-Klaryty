"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ManifestoPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-300 font-sans selection:bg-indigo-500/30">
      <nav className="fixed top-0 w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-32">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="prose prose-invert prose-lg prose-headings:text-white prose-p:leading-relaxed prose-a:text-indigo-400 hover:prose-a:text-indigo-300"
          >
            <motion.h1 variants={item} className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Company Purpose & <br /> Founding Manifesto
            </motion.h1>
            
            <motion.div variants={item} className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-16" />

            <motion.div variants={item}>
              <h2>Why We Exist</h2>
              <p>
                We believe that every business deserves the ability to operate with clarity, confidence, and discipline, regardless of its size.
              </p>
              <p>
                Today, operational excellence is often a privilege reserved for large organizations. Large enterprises have structured processes, defined responsibilities, reliable records, powerful software, and teams dedicated to improving how the business runs.
              </p>
              <p>
                Small and medium-sized businesses rarely have these advantages. Instead, they rely on memory, spreadsheets, WhatsApp conversations, handwritten notes, disconnected applications, and the constant involvement of the founder.
              </p>
              <p>
                The result is not a lack of ambition. It is a lack of operational infrastructure. We exist to change that.
              </p>
            </motion.div>

            <motion.div variants={item} className="my-16 p-8 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-50" />
              <p className="text-2xl font-medium text-white m-0 relative z-10 leading-snug">
                "Businesses should not have to adapt themselves to software. Software should adapt itself to businesses."
              </p>
            </motion.div>

            <motion.div variants={item}>
              <h2>The Problem We See</h2>
              <p>
                The world has produced thousands of business tools. Accounting software. CRM software. Inventory software. Most of these tools assume the business already understands itself. They ask business owners to configure software before the software understands the business.
              </p>
              <p>
                For many SMEs, that expectation is unrealistic. The software becomes another responsibility instead of a solution.
              </p>
            </motion.div>

            <motion.div variants={item}>
              <h2>Our Definition of Intelligence</h2>
              <p>
                Artificial Intelligence is not valuable because it can generate text. It is valuable because it can understand businesses.
              </p>
              <p>
                True business intelligence means helping owners answer questions such as: What is happening? Why is it happening? What should I do next? What risks am I overlooking? How can this process improve?
              </p>
              <p>
                Our goal is not to replace human judgment. Our goal is to strengthen it.
              </p>
            </motion.div>

            <motion.div variants={item}>
              <h2>What Success Looks Like</h2>
              <p>
                Success is not measured by the number of features we build. It is measured by the number of businesses that become more organized, more resilient, more transparent, and more capable because of our platform.
              </p>
              <p>
                When a founder no longer has to carry the entire business in their head. When a growing team operates with confidence because everyone understands how work gets done. When better decisions become the natural outcome of better systems.
              </p>
              <p>
                That is the future we are working toward.
              </p>
            </motion.div>

            <motion.div variants={item} className="mt-24 text-center">
              <Link 
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-black font-medium text-lg hover:scale-105 transition-transform"
              >
                Find Your Clarity
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

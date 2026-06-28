"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, GitMerge, DollarSign, Waypoints, Cpu } from "lucide-react";

export default function ProductPage() {
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
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-indigo-500/30">
      <nav className="fixed top-0 w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <Link 
            href="/register"
            className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Start Your Interview
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <motion.h1 variants={item} className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              How Klaryty Brings <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Order to the Chaos
              </span>
            </motion.h1>
            <motion.p variants={item} className="text-xl text-gray-400 leading-relaxed">
              We built an engine that understands the fundamental building blocks of any business. Once Klaryty understands your building blocks, the overwhelming complexity disappears.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-32">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mb-6">
                <DollarSign className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Clear Margins. Confident Pricing.</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Dynamic profit margin creation shouldn't require complex spreadsheets. Because Klaryty understands your suppliers, raw resources, and overhead, it instantly calculates and updates the true cost of your products in real-time.
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Real-time supplier cost tracking
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Automated margin alerts when costs rise
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Intelligent price configuration recommendations
                </li>
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square md:aspect-video rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent pointer-events-none" />
              {/* Mock UI Element */}
              <div className="w-3/4 bg-[#111] border border-white/10 rounded-xl p-6 shadow-2xl relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <div className="font-medium">Product Alpha</div>
                  <div className="text-green-400 font-mono">+32% Margin</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Base Cost</span>
                    <span>$12.50</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Shipping</span>
                    <span>$2.00</span>
                  </div>
                  <div className="h-px w-full bg-white/10 my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Retail Price</span>
                    <span>$24.99</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-32">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square md:aspect-video rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center order-2 md:order-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent pointer-events-none" />
              {/* Mock UI Element */}
              <div className="w-3/4 space-y-4 relative z-10">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs">
                        {i === 2 ? "✓" : "!"}
                      </div>
                      <div>
                        <div className="font-medium text-sm">Invoice INV-00{i}</div>
                        <div className="text-xs text-gray-500">Stripe Payment</div>
                      </div>
                    </div>
                    <div className="text-sm font-mono text-gray-300">Match Found</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                <GitMerge className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Painless Reconciliations.</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Stop hunting through bank statements and messaging apps to figure out who paid for what. Every action in Klaryty generates an immutable Event Record, making account reconciliation a breeze.
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  End-to-end event tracing
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Auto-matching of bank events to operations
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Clear audit trails for every transaction
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                <Waypoints className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Informal Knowledge Becomes Executable Workflows.</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                The business shouldn't stop because you're not there to answer a question. Klaryty translates your "way of doing things" into perfectly orchestrated workflows that your team can execute autonomously.
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Dynamic step-by-step task generation
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Clear role-based responsibilities
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Bottleneck detection by the AI Engine
                </li>
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square md:aspect-video rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent pointer-events-none" />
              <div className="w-full h-full border-2 border-dashed border-white/10 rounded-xl relative flex flex-col items-center justify-center gap-4">
                 <div className="w-32 h-10 bg-white/10 rounded-full flex items-center justify-center text-sm font-medium">Order Received</div>
                 <div className="w-0.5 h-6 bg-purple-500" />
                 <div className="w-32 h-10 bg-purple-500/20 border border-purple-500/50 text-purple-400 rounded-full flex items-center justify-center text-sm font-medium">Quality Check</div>
                 <div className="w-0.5 h-6 bg-white/10" />
                 <div className="w-32 h-10 bg-white/10 rounded-full flex items-center justify-center text-sm font-medium opacity-50">Dispatch</div>
              </div>
            </motion.div>
          </div>

        </div>
      </main>
    </div>
  );
}

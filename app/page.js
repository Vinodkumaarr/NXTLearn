import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      
      {/* Background Blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-black to-white/5 blur-3xl" />

      {/* Extra Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <section className="relative z-10 flex flex-col items-center justify-center px-6 py-20">
        
        {/* Navbar */}
        <div className="w-full max-w-7xl flex items-center justify-between mb-20">

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-green-500/20 border border-green-400/30 shadow-lg shadow-green-500/20">
              <BookOpen className="text-green-400 w-6 h-6" />
            </div>

            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-white to-green-300 bg-clip-text text-transparent">
              NXTLearn
            </h1>
          </div>

          <UserButton />
        </div>

        {/* Hero Card */}
        <div className="relative max-w-6xl w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 md:p-16 shadow-2xl shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-500">

          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-500/10 via-transparent to-white/10" />

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-400/30 bg-green-500/10 text-green-300 text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                AI Powered Course Generator
              </div>

              <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                Build & Learn with{" "}
                <span className="bg-gradient-to-r from-green-400 via-white to-green-300 bg-clip-text text-transparent">
                  NXTLearn
                </span>
              </h2>

              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Generate personalized online courses using AI and learn smarter
                with an interactive modern platform.
              </p>

              <div className="flex gap-4 flex-wrap">

                <Link href="/workspace">
                  <Button className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/30">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white/10 text-white px-6 py-6 rounded-xl hover:scale-105 transition-all duration-300"
                >
                  Explore Courses
                </Button>

              </div>
            </div>

            {/* Right Cards */}
            <div className="grid gap-5">

              <div className="rounded-2xl border border-green-400/20 bg-black/40 p-6 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
                <h3 className="text-xl font-semibold text-green-400 mb-2">
                  AI Course Generation
                </h3>

                <p className="text-gray-400">
                  Create complete structured courses instantly using AI.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-6 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-white/10">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Interactive Learning
                </h3>

                <p className="text-gray-400">
                  Learn with quizzes, notes, and personalized learning paths.
                </p>
              </div>

              <div className="rounded-2xl border border-green-400/20 bg-black/40 p-6 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
                <h3 className="text-xl font-semibold text-green-300 mb-2">
                  Smart Dashboard
                </h3>

                <p className="text-gray-400">
                  Track progress and manage your courses efficiently.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
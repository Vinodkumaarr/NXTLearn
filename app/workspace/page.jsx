// import CourseList from './_components/CourseList'
// import EnrollCourseList from './_components/EnrollCourseList'
// import WelcomeBanner from './_components/WelcomeBanner'

// function WorkSpace() {
//   return (
//     <div>
//       <WelcomeBanner />
//       <EnrollCourseList />
//       <CourseList />
//     </div>
//   )
// }

// export default WorkSpace

import CourseList from "./_components/CourseList";
import EnrollCourseList from "./_components/EnrollCourseList";
import WelcomeBanner from "./_components/WelcomeBanner";
import { Sparkles } from "lucide-react";

function WorkSpace() {
  return (
    <main className=" rounded-3xl relative min-h-screen bg-black text-white overflow-hidden px-6 py-8">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 blur-3xl rounded-full"></div>

      <div className=" relative z-10 max-w-7xl mx-auto space-y-10">

        {/* Welcome Banner */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-green-500/10 hover:shadow-green-500/20 transition-all duration-500 overflow-hidden">
          <WelcomeBanner />
        </div>

        {/* Enrolled Courses Section */}
        <section className="rounded-3xl border border-green-400/20 bg-white/5 backdrop-blur-xl p-6 shadow-xl shadow-green-500/10 transition-all duration-500 hover:shadow-green-500/20">
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-green-500/10 border border-green-400/20">
              <Sparkles className="w-5 h-5 text-green-400" />
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-wide">
                Your Learning Journey
              </h2>
              <p className="text-gray-400 text-sm">
                Continue learning from your enrolled courses.
              </p>
            </div>
          </div>

          <div className="transition-all duration-300 hover:scale-[1.01]">
            <EnrollCourseList />
          </div>
        </section>

        {/* Generated Courses Section */}
        <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl shadow-white/5 transition-all duration-500 hover:shadow-green-500/20">
          
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-wide">
                Explore AI Generated Courses
              </h2>
              <p className="text-gray-400 text-sm">
                Discover smart AI-powered courses crafted for your growth.
              </p>
            </div>

            <div className="px-4 py-2 rounded-full border border-green-400/20 bg-green-500/10 text-green-300 text-sm font-medium">
              Powered by NXTLearn AI
            </div>
          </div>

          <div className="transition-all duration-300 hover:scale-[1.01]">
            <CourseList />
          </div>
        </section>

      </div>
    </main>
  );
}

export default WorkSpace;
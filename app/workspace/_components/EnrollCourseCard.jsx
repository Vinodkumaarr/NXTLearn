// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { Book, LoaderCircle, PlayCircle } from "lucide-react";
// import Image from "next/image";
// import { useState } from "react";

// function EnrollCourseCard({ course, enrollCourse }) {
//   const [loading, setLoading] = useState(false);

//   const courseJson = course?.courseJson?.course;

//   const CalculatePerProgress=()=>{
//     return(enrollCourse?.completedChapters?.length??0/course?.courseContent?.length)*100
//   }

//   //Fix: define the image URL (use course banner or fallback image)
//   const imageUrl =
//     course?.bannerImageUrl && course.bannerImageUrl.trim() !== ""
//       ? course.bannerImageUrl
//       : "/default-course-banner.png"; 
 



//   const onEnrollCourse = async () => {
//     try {
//       setLoading(true);
//       // Add logic here if needed (e.g., navigate to course or show lessons)
//       console.log("Continuing course:", course?.cid);
//     } catch (error) {
//       console.error("Error enrolling course:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
//       <Image
//         src={imageUrl}
//         alt={courseJson?.name || "Course Banner"}
//         width={400}
//         height={300}
//         className="w-full h-[250px] object-cover"
//       />

//       <div className="p-3 flex flex-col gap-3">
//         <h2 className="font-bold text-lg line-clamp-1">
//           {courseJson?.name || "Untitled Course"}
//         </h2>

//         <p className="line-clamp-3 text-gray-500 text-sm">
//           {courseJson?.description || "No description available."}
//         </p>

//         <div className="flex justify-between items-center">
//           <h2 className="flex items-center gap-2 text-sm text-gray-700">
//             <Book className="w-4 h-4" />
//             {courseJson?.noOfChapters || 0} Chapters
//           </h2>

//           <Button
//             size="sm"
//             onClick={onEnrollCourse}
//             disabled={loading}
//             className="flex items-center gap-1"
//           >
//             {loading ? (
//               <LoaderCircle className="animate-spin w-4 h-4" />
//             ) : (
//               <PlayCircle className="w-4 h-4" />
//             )}
//             {loading ? "Loading..." : "Continue"}
//           </Button>
//           <div>
//             <h2 className="flex justify-between text-sm text-primary">Progress <span>{CalculatePerProgress()}%</span></h2>
//             <Progress value={CalculatePerProgress()} />
//             <Link href={'/workspace/course/' + course?.cid}>
//               <Button className={'w-full mt-3'}><PlayCircle/> Continue Learning </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EnrollCourseCard;

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Book, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function EnrollCourseCard({ course, enrollCourse }) {
  const [loading, setLoading] = useState(false);

  const courseJson = course?.courseJson?.course;

  //Fixed progress calculation
  const calculatePerProgress = () => {
    const completed = enrollCourse?.completedChapters?.length ?? 0;
    const total = course?.courseContent?.length ?? 0;
    if (total === 0) return 0;
    return ((completed / total) * 100).toFixed(0);
  };

  // Define image URL with fallback
  const imageUrl =
    course?.bannerImageUrl && course.bannerImageUrl.trim() !== ""
      ? course.bannerImageUrl
      : "/default-course-banner.png";

  const onEnrollCourse = async () => {
    try {
      setLoading(true);
      console.log("Continuing course:", course?.cid);
      // Add navigation logic if needed
    } catch (error) {
      console.error("Error enrolling course:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Image
        src={imageUrl}
        alt={courseJson?.name || "Course Banner"}
        width={400}
        height={300}
        className="w-full h-[250px] object-cover"
      />

      <div className="p-3 flex flex-col gap-3">
        <h2 className="font-bold text-lg line-clamp-1">
          {courseJson?.name || "Untitled Course"}
        </h2>

        <p className="line-clamp-3 text-gray-500 text-sm">
          {courseJson?.description || "No description available."}
        </p>

        <div className="flex justify-between items-center">
          <h2 className="flex items-center gap-2 text-sm text-gray-700">
            <Book className="w-4 h-4" />
            {courseJson?.noOfChapters || 0} Chapters
          </h2>

          {/* <Button
            size="sm"
            onClick={onEnrollCourse}
            disabled={loading}
            className="flex items-center gap-1"
          >
            {loading ? (
              <LoaderCircle className="animate-spin w-4 h-4" />
            ) : (
              <PlayCircle className="w-4 h-4" />
            )}
            {loading ? "Loading..." : "Continue"}
          </Button> */}
        </div>

        {/*  Progress Section */}
        <div className="mt-3">
          <h2 className="flex justify-between text-sm text-primary mb-1">
            <span>Progress</span>
            <span>{calculatePerProgress()}%</span>
          </h2>
          <Progress value={calculatePerProgress()} />
          
          <Link href={`/workspace/view-course/${course?.cid}`}>
            <Button className="w-full mt-3 flex items-center justify-center gap-2">
              <PlayCircle className="w-4 h-4" />
              Continue Learning
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EnrollCourseCard;


"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Book, Clock, PlayCircle, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function CourseInfo({ course, viewCourse }) {
  const courseLayout = course?.courseJson?.course || {};
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fallback banner image
  const bannerUrl =
    course?.bannerImageUrl && course.bannerImageUrl.trim() !== ""
      ? course.bannerImageUrl
      : "/default-course-banner.jpg";

  const GenerateCourseContent = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/generate-course-content", {
        course: courseLayout,
        courseTitle: course?.name,
        courseId: course?.cid,
      });

      console.log("Generated course content:", result.data);
      toast.success("Course generated successfully!");
      router.replace("/workspace");
    } catch (error) {
      console.error(
        "Error generating course content:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.error ||
          "Server-side error — please try again later!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:flex gap-5 justify-between p-5 rounded-2xl shadow bg-white">
      <div className="flex flex-col gap-3 flex-1">
        <h2 className="font-bold text-3xl">{courseLayout?.name || "Untitled Course"}</h2>
        <p className="text-gray-500 line-clamp-2">
          {courseLayout?.description || "No description available."}
        </p>

        {/* Course Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-3">
          <div className="flex gap-4 items-center p-3 rounded-lg shadow-sm border">
            <Clock className="text-blue-500" />
            <section>
              <h3 className="font-semibold">Duration</h3>
              <p>2 Hours</p>
            </section>
          </div>

          <div className="flex gap-4 items-center p-3 rounded-lg shadow-sm border">
            <Book className="text-green-500" />
            <section>
              <h3 className="font-semibold">Chapters</h3>
              <p>5 Chapters</p>
            </section>
          </div>

          <div className="flex gap-4 items-center p-3 rounded-lg shadow-sm border">
            <TrendingUp className="text-red-500" />
            <section>
              <h3 className="font-semibold">Difficulty Level</h3>
              <p>{course?.level || "Beginner"}</p>
            </section>
          </div>
        </div>

        {/* Action Button */}
        {!viewCourse ? (
          <Button
            className="max-w-sm mt-4"
            onClick={GenerateCourseContent}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Content"}
          </Button>
        ) : (
          <Link href={'/course/' + course?.cid}>
          <Button className="max-w-sm mt-4 flex items-center gap-2">
            <PlayCircle className="w-4 h-4" />
            Continue Learning
          </Button>
          </Link>
        )}
      </div>

      {/* Safe Image Rendering */}
      <div className="flex-shrink-0">
        <Image
          src={bannerUrl}
          alt={courseLayout?.name || "Course Banner"}
          width={400}
          height={240}
          className="w-full md:w-[400px] h-[240px] object-cover rounded-lg mt-5 md:mt-0"
          priority
        />
      </div>
    </div>
  );
}

export default CourseInfo;

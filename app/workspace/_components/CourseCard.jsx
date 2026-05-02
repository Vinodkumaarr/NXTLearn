
"use client";

import { Button } from "@/components/ui/button";
import axios from "axios"; //  Added axios import
import { Book, LoaderCircle, PlayCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

function CourseCard({ course }) {
  const courseJson = course?.courseJson?.course;
  const [loading, setLoading] = useState(false);

  const onEnrollCourse = async () => {
    try {
      setLoading(true);

      const result = await axios.post("/api/enroll-course", {
        courseId: course?.cid,
      });

      console.log("Enroll API Response:", result.data);

      //  Handle response from backend
      if (result.data?.message === "Course enrolled successfully") {
        toast.success("Course enrolled successfully!");
      } else if (result.data?.message === "Already enrolled in this course") {
        toast.info("You’re already enrolled in this course!");
      } else {
        toast("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Enroll error:", error);
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const imageUrl =
    course?.bannerImageUrl && course.bannerImageUrl.trim() !== ""
      ? course.bannerImageUrl
      : "/default-course-banner.png"; // fallback image

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

          <Button
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
            {loading ? "Enrolling..." : "Enroll Course"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;

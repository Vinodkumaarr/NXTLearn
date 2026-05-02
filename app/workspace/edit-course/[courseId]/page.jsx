
"use client";

import Link from "next/link";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChapterTopicList from "./_components/ChapterTopicList";
import CourseInfo from "./_components/CourseInfo";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

function EditCourse({ viewCourse=false }) {   // ✅ Accept prop here
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);

  const { courseId } = useParams();
  console.log("Course ID:", courseId);

  useEffect(() => {
    if (courseId) GetCourseInfo();
  }, [courseId]);

  const GetCourseInfo = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`/api/courses?courseId=${courseId}`);
      const data = result.data;

      if (typeof data.courseJson === "string") {
        data.courseJson = JSON.parse(data.courseJson);
      }

      console.log("Fetched course:", data);
      setCourse(data);
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!course) return <p className="text-center">No course found</p>;

  return (
    <div className="p-4 space-y-4">
      <CourseInfo course={course} viewCourse={viewCourse} />
      <ChapterTopicList course={course} />

      {/* Conditionally show button only if NOT in view mode */}
      {!viewCourse && (
        <div className="flex justify-center mt-6">
          <Link href={`/workspace/edit-course/${course?.cid}`}>
            <Button className="flex items-center gap-1 text-sm">
              <PlayCircle className="w-4 h-4" /> Start Learning
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default EditCourse;

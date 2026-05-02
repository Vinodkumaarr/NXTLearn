"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddNewCourseDialog from "./AddNewCourseDialog";
import  CourseCard  from "./CourseCard";

export default function CourseList() {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      GetCourseList();
    }
  }, [user]);

  const GetCourseList = async () => {
    try {
      setLoading(true);
      const result = await axios.get("/api/courses");
      setCourseList(result.data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="font-bold text-3xl">Course List</h2>

      {/* 🌀 Loading State */}
      {loading && (
        <div className="flex justify-center items-center my-10">
          <p className="text-gray-500 animate-pulse">Loading courses...</p>
        </div>
      )}

      {/* 📦 Empty State */}
      {!loading && courseList?.length === 0 && (
        <div className="my-5 flex p-8 items-center justify-center flex-col border border-amber-300 rounded-xl bg-gradient-to-r from-blue-400 via-pink-300 to-white">
          <Image
            src="/courseListimg.png"
            alt="No courses available"
            width={120}
            height={120}
            className="rounded-full"
          />
          <h2 className="my-2 text-xl font-bold text-center">
            You haven’t created any courses yet.
          </h2>

          <AddNewCourseDialog>
            <Button className="mt-3">+ Create your first course</Button>
          </AddNewCourseDialog>
        </div>
      )}

      {/* 🎓 Course List */}
      {!loading && courseList?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
          {courseList.map((course, index) => (
            <CourseCard key={course.id || index} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

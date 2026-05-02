"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import EnrollCourseCard from "./EnrollCourseCard";

function EnrollCourseList() {
  const [enrolledCourseList, setEnrolledCourseList] = useState([]);

  useEffect(() => {
    GetEnrolledCourse();
  }, []);

  const GetEnrolledCourse = async () => {
    try {
      const result = await axios.get("/api/enroll-course");
      console.log(result.data);
      setEnrolledCourseList(result.data);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  };

  if (!enrolledCourseList || enrolledCourseList.length === 0) return null;

  return enrolledCourseList?.length > 0 && (
    <div className="mt-3">
      <h2 className="font-bold text-xl mb-4">Continue Learning Course</h2>

      {/* Use grid layout for course cards */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {enrolledCourseList?.map((course, index) => (
          <EnrollCourseCard
            key={index}
            course={course?.courses}
            enrollCourse={course?.enrollCourse}
          />
        ))}
      </div>
    </div>
  );
}

export default EnrollCourseList;

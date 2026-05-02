// import { db } from "@/config/db";
// import { enrollCourseTable } from "@/config/schema";
// import { currentUser } from "@clerk/nextjs/server";
// import { and, eq } from "drizzle-orm";
// import { NextResponse } from "next/server";


// export async function POST(req) {
//     const {courseId} = await req.json();
//     const user = await currentUser();

//     //if course already enrolled
//    const enrollCourses= await db.select().from(enrollCourseTable)
//    .where(and(eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress),
//          eq(enrollCourseTable.cid, courseId)));


//          if(enrollCourses?.length ==0){
//             const result = await db.insert(enrollCourseTable)
//             .values({
//                 cid:courseId,
//                 userEmail:user.primaryEmailAddress?.emailAddress
//             }).returning(enrollCourseTable)

//             return NextResponse.json({'resp':'Already Enrolled'})
//          }
       
    
// }

// import { db } from "@/config/db";
// import { enrollCourseTable } from "@/config/schema";
// import { currentUser } from "@clerk/nextjs/server";
// import { and, desc, eq } from "drizzle-orm";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const { courseId } = await req.json();
//     const user = await currentUser();

//     if (!user) {
//       return NextResponse.json(
//         { error: "User not authenticated" },
//         { status: 401 }
//       );
//     }

//     const userEmail = user?.primaryEmailAddress?.emailAddress;
//     if (!userEmail) {
//       return NextResponse.json(
//         { error: "User email not found" },
//         { status: 400 }
//       );
//     }

//     // Check if already enrolled
//     const enrollCourses = await db
//       .select()
//       .from(enrollCourseTable)
//       .where(
//         and(eq(enrollCourseTable.userEmail, userEmail), eq(enrollCourseTable.cid, courseId))
//       );

//     if (enrollCourses.length > 0) {
//       return NextResponse.json(
//         { message: "Already enrolled in this course" },
//         { status: 200 }
//       );
//     }

//     // New enrollment
//     await db.insert(enrollCourseTable).values({
//       cid: courseId,
//       userEmail,
//     });

//     return NextResponse.json(
//       { message: "Course enrolled successfully" },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error enrolling course:", error);
//     return NextResponse.json(
//       { error: "Internal server error", details: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(req) {
//     const user = currentUser();
//     const result = await db.select().from(courseTable)
//     .innerJoin(enrollCourseTable,eq(courseTable.cid,enrollCourseTable.cid))
//     .where(eq(enrollCourseTable.userEmail,user?.primaryEmailAddress.emailAddress))
//     .orderBy(desc(enrollCourseTable.id));
    

//     return NextResponse.json(result);
    
// }

import { db } from "@/config/db";
import { coursesTable, enrollCourseTable } from "@/config/schema"; // ✅ Added courseTable import
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

//  POST - Enroll user into a course
export async function POST(req) {
  try {
    const { courseId } = await req.json();
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const userEmail = user?.primaryEmailAddress?.emailAddress;
    if (!userEmail) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 400 }
      );
    }

    //Check if already enrolled
    const enrollCourses = await db
      .select()
      .from(enrollCourseTable)
      .where(
        and(
          eq(enrollCourseTable.userEmail, userEmail),
          eq(enrollCourseTable.cid, courseId)
        )
      );

    if (enrollCourses.length > 0) {
      return NextResponse.json(
        { message: "Already enrolled in this course" },
        { status: 200 }
      );
    }

    //  New enrollment
    await db.insert(enrollCourseTable).values({
      cid: courseId,
      userEmail,
    });

    return NextResponse.json(
      { message: "Course enrolled successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error enrolling course:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

//  GET - Fetch all courses the current user is enrolled in
export async function GET() {
  try {
    const user = await currentUser(); //  Added missing await

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const userEmail = user?.primaryEmailAddress?.emailAddress;
    if (!userEmail) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 400 }
      );
    }

    //  Fetch enrolled courses with course details
    const result = await db
      .select()
      .from(coursesTable)
      .innerJoin(
        enrollCourseTable,
        eq(coursesTable.cid, enrollCourseTable.cid)
      )
      .where(eq(enrollCourseTable.userEmail, userEmail))
      .orderBy(desc(enrollCourseTable.id));

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

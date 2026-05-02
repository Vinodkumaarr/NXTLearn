
import { db } from "@/config/db"; //  ensure path is correct
import { coursesTable } from "@/config/schema"; //  ensure path is correct
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");
    const user = await currentUser();

    //  Check authentication first
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    //  If courseId is provided, fetch that specific course
    if (courseId) {
      const result = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.cid, courseId));

      return NextResponse.json(result[0] || {});
    }

    //  Otherwise, fetch all courses belonging to the logged-in user
    const result = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.userEmail, user.primaryEmailAddress?.emailAddress))
      .orderBy(desc(coursesTable.id));

    return NextResponse.json(result);
  } catch (error) {
    console.error(" Error fetching course:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

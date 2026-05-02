// import { db } from "@/config/db";
// import { usersTable } from "@/config/schema";
// import { eq } from "drizzle-orm";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//     const {email,name}=await req.json();

//    //if user already exist
//    const users=await db.select().from(usersTable)
//    .where(eq(usersTable.email,email));
//    // if not exist then insert
//    if(users?.length==0){
//     const result = await db.insert(usersTable).values({
//         name:name,
//         email:email
//     }).returning(usersTable);

//     console.log(result);

//     return NextResponse.json(result);
//    }
//     return NextResponse.json(users[0])
// }

import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 🧩 Safely parse request body
    const body = await req.text();

    if (!body) {
      return NextResponse.json(
        { error: "Request body is empty or missing" },
        { status: 400 }
      );
    }

    let email, name;

    try {
      ({ email, name } = JSON.parse(body));
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid JSON format in request body" },
        { status: 400 }
      );
    }

    if (!email || !name) {
      return NextResponse.json(
        { error: "Missing required fields: email or name" },
        { status: 400 }
      );
    }

    // 🔍 Check if user already exists
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (users?.length === 0) {
      const result = await db
        .insert(usersTable)
        .values({ name, email })
        .returning();

      return NextResponse.json(result[0]);
    }

    //  Return existing user if found
    return NextResponse.json(users[0]);
  } catch (error) {
    console.error("POST /api/user error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

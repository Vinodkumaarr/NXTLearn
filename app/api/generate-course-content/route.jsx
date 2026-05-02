import { db } from "@/config/db";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { coursesTable } from "../../../config/schema";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const PROMPT = `
Depends on Chapter name and Topic Generate content for each topic in HTML and give response in JSON format.
Schema: {
  "chapterName": "<>",
  "topics": [
    {
      "topic": "<>",
      "content": "<>"
    }
  ]
}
User Input:
`;

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

//  YouTube Helper Function

async function GetYouTubeVideo(topic) {
  if (!topic || topic.trim().length === 0) {
    console.warn("Skipping YouTube search — invalid topic:", topic);
    return [];
  }

  if (!process.env.YOUTUBE_API_KEY) {
    console.error(" Missing YouTube API Key in environment variables");
    return [];
  }

  try {
    const params = {
      part: "snippet",
      q: topic,
      maxResults: 4,
      type: "video",
      key: process.env.YOUTUBE_API_KEY,
      regionCode: "IN",
      relevanceLanguage: "en",
      safeSearch: "moderate",
    };

    const resp = await axios.get(YOUTUBE_BASE_URL, { params });

    if (!resp.data || !resp.data.items) {
      console.error("Invalid YouTube API response:", resp.data);
      return [];
    }

    const youtubeVideoList = resp.data.items.map((item) => ({
      videoId: item.id?.videoId,
      title: item.snippet?.title,
      thumbnail: item.snippet?.thumbnails?.medium?.url,
      channelTitle: item.snippet?.channelTitle,
    }));

    return youtubeVideoList;
  } catch (err) {
    console.error("YouTube API Error:", err.response?.data || err.message);
    return [];
  }
}

export async function POST(req) {
  try {
    const { course, courseTitle, courseId } = await req.json();

    if (!course || !course.chapters) {
      return NextResponse.json(
        { error: "Invalid course data — 'course.chapters' missing" },
        { status: 400 }
      );
    }

    const promises = course.chapters.map(async (chapter) => {
      const config = { responseMimeType: "text/plain" };
      const model = "gemini-2.0-flash";
      const contents = [
        {
          role: "user",
          parts: [{ text: PROMPT + JSON.stringify(chapter) }],
        },
      ];

      const response = await ai.models.generateContent({
        model,
        config,
        contents,
      });


      const rawResp =
        response?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

      const cleaned = rawResp
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      let jsonResp;
      try {
        jsonResp = JSON.parse(cleaned);
      } catch (err) {
        console.error("JSON parse error:", err, "Raw:", cleaned);
        jsonResp = { chapterName: chapter.name, error: "Invalid JSON" };
      }

      // Get YouTube videos for this chapter
      const youtubeVideos = await GetYouTubeVideo(jsonResp.chapterName);

      return {
        ...jsonResp,
        youtubeVideos,
      };
    });

    const CourseContent = await Promise.all(promises);

    // Save to DB
    // const dbResp = await db.update(coursesTable).set({
    //   CourseContent:CourseContent
    // }).where(eq(coursesTable.cid,courseId));

    // return NextResponse.json({
    //   courseName: courseTitle,
    //   courseId,
    //   CourseContent,
    // });

    const dbResp = await db
      .update(coursesTable)
      .set({
        courseContent: JSON.stringify(CourseContent),
      })
      .where(eq(coursesTable.cid, courseId));

    return NextResponse.json({
      courseName: courseTitle,
      courseId,
      CourseContent,
    });


  } catch (error) {
    console.error(" Error in generate-course-content:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


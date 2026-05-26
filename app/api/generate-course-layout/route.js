
import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import { GoogleGenAI } from "@google/genai";
import axios from 'axios';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const PROMPT = `
Generate a Learning Course based on user details. 
The response must be valid JSON that strictly follows this structure:
{
  "course": {
    "name": "string",
    "description": "string",
    "chapters": [
      {
        "chapterName": "string",
        "topics": [
          {
            "topic": "string",
            "content": "string (HTML or text)"
          }
        ]
      }
    ],
    "bannerImagePrompt": "string"
  }
}
Return ONLY the JSON, nothing else.
`;

export async function POST(req) {
  try {
    const { courseId, ...formData } = await req.json();
    const user = await currentUser();

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: `${PROMPT}\n\nUser Input: ${JSON.stringify(formData)}` },
          ],
        },
      ],
    });

    const rawResp = response?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    // 🧹 Clean the response and extract JSON safely
    let cleaned = rawResp.replace(/```json|```/g, "").trim();

    // 🔍 Extract JSON part only if there's extra text
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("No JSON structure found in AI response:", cleaned);
      return NextResponse.json({ error: "No valid JSON found in AI response" }, { status: 500 });
    }

    let jsonResp;
    try {
      jsonResp = JSON.parse(jsonMatch[0]);
    } catch (err) {
      console.error("JSON parse error:", err, "\nAI raw output:", cleaned);
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    const ImagePrompt =
      jsonResp.course?.bannerImagePrompt ||
      "Create a modern, flat-style 2D educational course illustration with books, laptops, and digital tools.";

    const bannerImageUrl = await GenerateImage(ImagePrompt);

    await db.insert(coursesTable).values({
      ...formData,
      courseJson: jsonResp,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      cid: courseId,
      bannerImageUrl,
    });

    return NextResponse.json({ courseId, course: jsonResp });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

const GenerateImage = async (imagePrompt) => {
  const BASE_URL = 'https://aigurulab.tech';
  const result = await axios.post(
    `${BASE_URL}/api/generate-image`,
    {
      width: 1024,
      height: 1024,
      input: imagePrompt,
      model: 'flux',
      aspectRatio: "16:9",
    },
    {
      headers: {
        'x-api-key': process.env.AI_GURU_LAB_API,
        'Content-Type': 'application/json',
      },
    }
  );
  return result.data.image;
};

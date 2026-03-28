import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.YOUTUBE_API_KEY;

export async function GET(req: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json({ error: "Missing YOUTUBE_API_KEY in environment variables" }, { status: 500 });
  }

  const q = req.nextUrl.searchParams.get("q") || "trending";
  const maxResults = Number(req.nextUrl.searchParams.get("maxResults") || "8");

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(
    q
  )}&key=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: "YouTube Data API request failed", detail: err }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}

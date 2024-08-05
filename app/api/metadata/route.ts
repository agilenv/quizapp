import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url).searchParams.get("url");
    if (!url) {
      return new Response("Missing URL", { status: 400 });
    }

    const response = await fetch(url, { next: { revalidate: 3600 } });
    const html = await response.text();
    const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const title = match ? match[1] : url;

    return new Response(JSON.stringify({ title }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response("Invalid URL", { status: 400 });
  }
};

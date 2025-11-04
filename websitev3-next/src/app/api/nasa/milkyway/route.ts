import { NextRequest } from "next/server";

type NasaItem = {
  data: Array<{ title: string }>;
  links?: Array<{ href: string; rel?: string; render?: string }>;
  href?: string; // asset list URL
};

export async function GET(_req: NextRequest) {
  try {
    const searchUrl = `https://images-api.nasa.gov/search?q=milky%20way&media_type=image&year_start=1990`;
    const res = await fetch(searchUrl, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`NASA search failed: ${res.status}`);
    const json = await res.json();
    const items: NasaItem[] = json?.collection?.items || [];

    const top = items.slice(0, 8);
    const results = await Promise.all(
      top.map(async (it) => {
        const title = it.data?.[0]?.title || "NASA Image";
        const preview = it.links?.find((l) => l.render === "image")?.href || it.links?.[0]?.href;
        let full = preview || "";
        // Try to fetch asset list to pick the largest JPG if available
        if (it.href) {
          try {
            const aRes = await fetch(it.href, { next: { revalidate: 3600 } });
            if (aRes.ok) {
              const assets: string[] = await aRes.json();
              const jpgs = assets.filter((u) => /\.jpe?g$/i.test(u));
              // Prefer ones with 'orig' in name, else the longest path (often highest res)
              jpgs.sort((a, b) => {
                const pa = /orig/i.test(a) ? 1 : 0;
                const pb = /orig/i.test(b) ? 1 : 0;
                if (pa !== pb) return pb - pa;
                return b.length - a.length;
              });
              if (jpgs[0]) full = jpgs[0];
            }
          } catch {
            // ignore asset fetch failure; keep preview
          }
        }
        return { title, preview, full };
      })
    );

    return new Response(JSON.stringify({ items: results }), {
      headers: {
        "content-type": "application/json",
        "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "NASA fetch error";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}

export const dynamic = "force-dynamic";

const API_BASE = "http://www.zionterranova.com/api";

async function fetchJson(url: string) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(url, { signal: controller.signal, cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

function demoBlocks(limit = 10) {
  const out = [] as { height: number; timestamp: number }[];
  const now = Date.now();
  const base = 12547;
  for (let i = 0; i < limit; i++) {
    out.push({ height: base - i, timestamp: now - i * 120000 });
  }
  return out;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit") || 10);
  try {
    const data = await fetchJson(`${API_BASE}/blocks?limit=${limit}`);
    return Response.json(data, { status: 200 });
  } catch {
    return Response.json(demoBlocks(limit), { status: 200, headers: { "x-demo": "1" } });
  }
}

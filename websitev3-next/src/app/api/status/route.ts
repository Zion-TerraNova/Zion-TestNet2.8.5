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

function demoStatus() {
  return {
    blockchain: {
      height: 12547,
      difficulty: 2850,
      block_reward: 5479.45,
      total_supply: 68726815000,
    },
    network: {
      connected_peers: 127,
      total_peers: 150,
    },
  };
}

export async function GET() {
  try {
    const data = await fetchJson(`${API_BASE}/status`);
    return Response.json(data, { status: 200 });
  } catch {
    return Response.json(demoStatus(), { status: 200, headers: { "x-demo": "1" } });
  }
}

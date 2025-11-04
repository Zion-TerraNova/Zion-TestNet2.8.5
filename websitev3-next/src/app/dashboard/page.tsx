"use client";

import React from "react";

type Status = {
  blockchain: { height: number; difficulty: number; total_supply?: number; block_reward?: number };
  network: { connected_peers?: number; total_peers?: number };
};

function formatNumber(num: number) {
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toLocaleString();
}

function formatHashrate(h: number) {
  if (h >= 1e12) return (h / 1e12).toFixed(2) + " TH/s";
  if (h >= 1e9) return (h / 1e9).toFixed(2) + " GH/s";
  if (h >= 1e6) return (h / 1e6).toFixed(2) + " MH/s";
  if (h >= 1e3) return (h / 1e3).toFixed(2) + " KH/s";
  return h.toFixed(2) + " H/s";
}

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export default function DashboardPage() {
  const [status, setStatus] = React.useState<Status | null>(null);
  const [blocks, setBlocks] = React.useState<Array<{ height: number; timestamp: number }>>([]);

  React.useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const [s, b] = await Promise.all([
          fetch("/api/status", { cache: "no-store" }).then((r) => r.json()),
          fetch("/api/blocks?limit=10", { cache: "no-store" }).then((r) => r.json()),
        ]);
        if (!alive) return;
        setStatus(s);
        setBlocks(b);
      } catch {
        // ignore
      }
    }
    load();
    const t = setInterval(load, 10000);
    const t2 = setInterval(() => {
      // refresh time-ago UI
      setBlocks((arr) => [...arr]);
    }, 30000);
    return () => {
      alive = false;
      clearInterval(t);
      clearInterval(t2);
    };
  }, []);

  const height = status?.blockchain.height ?? 0;
  const difficulty = status?.blockchain.difficulty ?? 0;
  // const supply = status?.blockchain.total_supply ?? 0;
  const peers = status?.network.connected_peers ?? status?.network.total_peers ?? 0;
  const hashrate = (difficulty || 0) * 1_000_000;

  return (
    <main className="relative z-10 min-h-screen pt-16">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight">Dashboard</h1>
        <p className="mb-6 text-white/70">Živá síťová metrika a poslední bloky. Aktualizace každých 10s.</p>

        {/* Stat cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-black/50 p-4">
            <div className="text-xs text-white/60">Block Height</div>
            <div className="mt-1 text-2xl font-bold">{height.toLocaleString()}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/50 p-4">
            <div className="text-xs text-white/60">Network Hashrate (est.)</div>
            <div className="mt-1 text-2xl font-bold">{formatHashrate(hashrate)}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/50 p-4">
            <div className="text-xs text-white/60">Active Peers</div>
            <div className="mt-1 text-2xl font-bold">{peers.toLocaleString()}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/50 p-4">
            <div className="text-xs text-white/60">Difficulty</div>
            <div className="mt-1 text-2xl font-bold">{formatNumber(difficulty)}</div>
          </div>
        </div>

        {/* Blocks list */}
        <div className="rounded-xl border border-white/10 bg-black/50">
          <div className="border-b border-white/10 p-4 text-sm text-white/70">Recent Blocks</div>
          <div className="divide-y divide-white/10">
            {blocks.map((b) => (
              <div key={b.height} className="flex items-center justify-between px-4 py-3">
                <div className="font-mono text-sm">Block #{b.height}</div>
                <div className="text-xs text-white/60">{timeAgo(b.timestamp)}</div>
              </div>
            ))}
            {blocks.length === 0 && (
              <div className="px-4 py-6 text-sm text-white/60">No data yet…</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

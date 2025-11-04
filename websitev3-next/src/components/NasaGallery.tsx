"use client";

import React from "react";

type Item = { title: string; preview: string; full: string };

export default function NasaGallery({ onSelect }: { onSelect: (url: string) => void }) {
  const [items, setItems] = React.useState<Item[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/nasa/milkyway");
        const json = await res.json();
        if (!mounted) return;
        if (json?.items) setItems(json.items);
      } catch (e) {
        setError("Nelze načíst NASA obrázky");
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="text-xs text-white/60">Načítám NASA…</div>;
  if (error) return <div className="text-xs text-red-400">{error}</div>;
  if (!items.length) return <div className="text-xs text-white/60">Nic nenalezeno</div>;

  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map((it, i) => (
        <button
          key={i}
          onClick={() => onSelect(it.full || it.preview)}
          className="group overflow-hidden rounded-md border border-white/10 bg-black/40 hover:border-(--matrix-green)"
          title={it.title}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={it.preview} alt={it.title} className="h-20 w-28 object-cover opacity-80 transition group-hover:opacity-100" />
        </button>
      ))}
    </div>
  );
}

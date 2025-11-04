import DocsLayout from "@/components/docs/DocsLayout";
import Link from "next/link";

export const dynamic = "force-static";

export default function DocsIndex() {
  return (
    <DocsLayout>
      <div className="mx-auto max-w-4xl px-6 py-8">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight">Dokumentace</h1>
        <p className="mb-8 text-lg text-white/70">
          Kompletní technická dokumentace pro ZION TestNet 2.8.5. Zde najdete vše potřebné pro vývoj, mining a integraci.
        </p>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-black/50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-(--matrix-green)">Začínáme</h2>
            <div className="space-y-3">
              <Link href="/docs/getting-started" className="block rounded-lg border border-white/10 bg-black/30 p-4 hover:border-(--matrix-green) transition-colors">
                <div className="font-medium">🚀 Getting Started</div>
                <div className="text-sm text-white/60">První kroky na TestNet</div>
              </Link>
              <Link href="/docs/setup" className="block rounded-lg border border-white/10 bg-black/30 p-4 hover:border-(--matrix-green) transition-colors">
                <div className="font-medium">⚙️ Setup Guide</div>
                <div className="text-sm text-white/60">Instalace a konfigurace</div>
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-(--matrix-green)">Mining</h2>
            <div className="space-y-3">
              <Link href="/docs/mining-guide" className="block rounded-lg border border-white/10 bg-black/30 p-4 hover:border-(--matrix-green) transition-colors">
                <div className="font-medium">⛏️ Mining Guide</div>
                <div className="text-sm text-white/60">Algoritmy a optimalizace</div>
              </Link>
              <Link href="/docs/consciousness-levels" className="block rounded-lg border border-white/10 bg-black/30 p-4 hover:border-(--matrix-green) transition-colors">
                <div className="font-medium">🧘 Consciousness Levels</div>
                <div className="text-sm text-white/60">CL1-CL9 odměny</div>
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-(--matrix-green)">Reference</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/docs/whitepaper-lite" className="block rounded-lg border border-white/10 bg-black/30 p-4 hover:border-(--matrix-green) transition-colors">
              <div className="font-medium">📄 Whitepaper Lite</div>
              <div className="text-sm text-white/60">Tokenomika a konsensus</div>
            </Link>
            <Link href="/docs/api-reference" className="block rounded-lg border border-white/10 bg-black/30 p-4 hover:border-(--matrix-green) transition-colors">
              <div className="font-medium">🔌 API Reference</div>
              <div className="text-sm text-white/60">JSON-RPC a WebSocket</div>
            </Link>
            <Link href="/docs/testnet-info" className="block rounded-lg border border-white/10 bg-black/30 p-4 hover:border-(--matrix-green) transition-colors">
              <div className="font-medium">🌐 TestNet Info</div>
              <div className="text-sm text-white/60">Síťové specifikace</div>
            </Link>
            <Link href="/docs/roadmap" className="block rounded-lg border border-white/10 bg-black/30 p-4 hover:border-(--matrix-green) transition-colors">
              <div className="font-medium">🗺️ Roadmap</div>
              <div className="text-sm text-white/60">Vývojový plán</div>
            </Link>
            <Link href="/docs/faq" className="block rounded-lg border border-white/10 bg-black/30 p-4 hover:border-(--matrix-green) transition-colors">
              <div className="font-medium">❓ FAQ</div>
              <div className="text-sm text-white/60">Časté otázky</div>
            </Link>
            <Link href="/docs/oasis" className="block rounded-lg border border-white/10 bg-black/30 p-4 hover:border-(--matrix-green) transition-colors">
              <div className="font-medium">🏝️ ZION OASIS</div>
              <div className="text-sm text-white/60">Humanitární mise</div>
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-white/50">
            Dokumentace se postupně migruje do nativních stránek. Pro starý layout použijte{" "}
            <Link href="/legacy/docs/index.html" className="underline hover:text-white">legacy docs</Link>.
          </p>
        </div>
      </div>
    </DocsLayout>
  );
}

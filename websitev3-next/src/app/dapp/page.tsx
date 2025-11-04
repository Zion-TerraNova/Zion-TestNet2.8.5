const MODULES = [
  { label: "AI", path: "/ai" },
  { label: "AI Chat", path: "/ai-chat" },
  { label: "Explorer", path: "/explorer" },
  { label: "Wallet", path: "/wallet" },
  { label: "Mining", path: "/mining" },
  { label: "Stargate", path: "/stargate" },
  { label: "Amenti", path: "/amenti" },
  { label: "Bridge", path: "/bridge" },
  { label: "Round Table", path: "/round-table" },
  { label: "Oasis Game", path: "/oasis-game" },
];

export default function DappPage() {
  const base = process.env.NEXT_PUBLIC_DAPP_URL?.trim();

  return (
    <main className="mx-auto max-w-7xl px-6 sm:px-8 py-10 md:py-14">
      <header className="mb-8 md:mb-10 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">ZION dApp</h1>
          <p className="mt-2 text-white/70 text-sm md:text-base">
            Přímý přístup k ZION modulům. Nastavte adresu prostředí pro plnou integraci.
          </p>
        </div>
        <div className="hidden md:block text-xs text-white/60">
          {base ? (
            <span>
              Embedded from: <span className="text-white/80">{base}</span>
            </span>
          ) : (
            <span>Set NEXT_PUBLIC_DAPP_URL</span>
          )}
        </div>
      </header>

      {base ? (
        <section className="mb-10 rounded-lg overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm">
          {/* Simple embed - assumes the dApp supports embedding. */}
          <iframe
            src={base}
            title="ZION dApp"
            className="h-[70vh] w-full"
            loading="lazy"
          />
        </section>
      ) : (
        <section className="mb-10 rounded-lg border border-white/10 bg-black/40 p-4 md:p-5">
          <p className="text-sm md:text-base text-white/75">
            Pro vložení dApp nastavte proměnnou prostředí a restartujte server:
          </p>
          <pre className="mt-3 overflow-x-auto rounded-md bg-black/60 p-3 text-xs text-white/80 border border-white/10">
{`# .env.local
NEXT_PUBLIC_DAPP_URL=https://your-dapp.example.com`}
          </pre>
          <p className="mt-3 text-sm text-white/60">
            Nebo otevřete vybrané moduly jako externí stránky níže.
          </p>
        </section>
      )}

      <section>
        <h2 className="mb-4 text-lg font-bold">Moduly</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {MODULES.map((m) => {
            const href = base ? `${base}${m.path}` : m.path;
            const external = Boolean(base);
            return (
              <a
                key={m.path}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer noopener" : undefined}
                className="group rounded-lg border border-white/10 bg-black/40 p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold">{m.label}</div>
                    <div className="text-xs text-white/60">{m.path}</div>
                  </div>
                  <span className="opacity-70 transition-opacity group-hover:opacity-100" aria-hidden>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </span>
                </div>
              </a>
            );
          })}
        </div>
        {!base && (
          <p className="mt-3 text-xs text-white/50">
            Tip: Bez nastavené adresy odkazují tlačítka pouze na relativní cesty (pro produkční dApp nastavte NEXT_PUBLIC_DAPP_URL).
          </p>
        )}
      </section>
    </main>
  );
}

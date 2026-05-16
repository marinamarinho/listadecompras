"use client";

import { useState, useEffect } from "react";

type Item = {
  n: string;
  r: string;
  s?: string | null;
  o?: boolean;
};

type Category = {
  icon: string;
  name: string;
  items: Item[];
};

const DATA: Category[] = [
  {
    icon: "🥬", name: "Hortifrúti e frescos",
    items: [
      { n: "Pepino japonês ou persa — 2 a 3 unidades", r: "sunomono", s: "Sub: pepino inglês — retire as sementes com uma colher para não aguardar o molho" },
      { n: "Repolho verde — ¼ de repolho grande (~340g)", r: "gyoza", s: "Bata bem fino e esprema toda a água antes de misturar no recheio" },
      { n: "Cebolinha verde — 1 maço", r: "soba · gyoza · la-yu" },
      { n: "Alho — 1 cabeça", r: "gyoza · edamame · la-yu" },
      { n: "Gengibre fresco — 1 pedaço (~5cm)", r: "gyoza · la-yu" },
      { n: "Komatsuna ou espinafre — 60g", r: "soba", s: "Sub: qualquer folha verde macia (agrião, rúcula)" },
      { n: "Shiitake fresco — 2 unidades", r: "gyoza", s: "Sub: shiitake seco reidratado em água morna por 20min" },
      { n: "Batata-doce japonesa (satsumaimo) — 1 unidade", r: "tempura", s: "Sub: batata-doce comum — funciona muito bem" },
      { n: "Abóbora kabocha — ⅛ pequena", r: "tempura", s: "Sub: abóbora cabotiã ou butternut — corte em fatias finas" },
      { n: "Berinjela japonesa — 1 unidade", r: "tempura", s: "Sub: berinjela comum — corte em fatias mais finas" },
      { n: "Cogumelo eryngui (king oyster) — 2 unidades", r: "tempura", s: "Sub: portobello ou shiitake grande" },
      { n: "Shiso (folha de perilla) — 4 folhas", r: "tempura", o: true, s: "Opcional — pode omitir sem problema" },
      { n: "Raiz de lotus (renkon) — ~5cm", r: "tempura", o: true, s: "⚠️ Difícil de achar — pode omitir. Se encontrar em loja asiática, compre pré-cozida" },
      { n: "Daikon — 2 pedaços de 5cm (para ralar)", r: "tempura", s: "Sub: rabanete — você já tem! Rale e esprema levemente antes de servir" },
    ],
  },
  {
    icon: "🍤", name: "Proteínas e frutos do mar",
    items: [
      { n: "Camarão grande/jumbo — 10 unidades", r: "tempura de camarão", s: "Black tiger prawns são os ideais. Descasque deixando o rabo" },
      { n: "Carne suína moída — 225g", r: "gyoza", s: "Sub: mista suíno + bovino funciona bem · ou peça para moer paleta/pernil no açougue" },
      { n: "Kamaboko (bolinho de peixe) — 1 pacote", r: "soba", s: "Pode omitir ou substituir por surimi fatiado. Procure em lojas asiáticas" },
      { n: "Kani-kama (surimi) — 1 pacote pequeno", r: "sunomono", o: true, s: "Opcional mas clássico — dá proteína e cor à salada" },
    ],
  },
  {
    icon: "🧊", name: "Congelados",
    items: [
      { n: "Edamame com casca — 280–400g (1 pacote)", r: "edamame apimentado", s: "Importado do Japão já vem pré-cozido — só 1 min na água fervente" },
    ],
  },
  {
    icon: "🍜", name: "Massas, farinhas e amidos",
    items: [
      { n: "Macarrão soba — 200g (1 pacote)", r: "soba" },
      { n: "Farinha de trigo — mín. 500g", r: "gyoza wrappers + tempura", s: "Gyoza usa ~240g · Tempura usa ~120g · Deixe gelar a farinha antes do tempura" },
      { n: "Fécula de batata ou amido de milho", r: "gyoza + tempura", s: "Para polvilhar os wrappers do gyoza (evita grudar) e empanar o camarão" },
      { n: "Ovo — 1 unidade grande (gelado)", r: "tempura", s: "Importante estar bem gelado — deixe na geladeira até a hora de usar" },
    ],
  },
  {
    icon: "🇯🇵", name: "Despensa japonesa",
    items: [
      { n: "Kombu (alga kelp seco) — 1 folha 10x10cm", r: "dashi", s: "Sub rápida: dashi packet ou dashi powder · Procure em lojas asiáticas" },
      { n: "Katsuobushi (flocos de bonito) — mín. 20g", r: "dashi · soba · tentsuyu", s: "⚠️ Faça 1,5x a receita de dashi — ele é base do caldo do soba E do tentsuyu do tempura" },
      { n: "Shoyu — 1 garrafa", r: "dashi · gyoza · edamame · sunomono · tentsuyu", s: "Usado em quase tudo — verifique se está cheio" },
      { n: "Mirin — 1 garrafa", r: "dashi · edamame · tentsuyu", s: "Sub emergencial: uma pitada de açúcar + pouco saquê" },
      { n: "Saquê de culinária — 1 garrafa", r: "dashi · gyoza", s: "Pode omitir do gyoza (é opcional na receita)" },
      { n: "Missô — 1 pote pequeno (awase)", r: "edamame apimentado", s: "Qualquer tipo funciona. A Nami usa awase (mistura de vermelho + branco)" },
      { n: "Vinagre de arroz não temperado — 1 garrafa", r: "sunomono · molho gyoza · ponzu", s: "Importante ser não temperado (unseasoned) — o temperado já tem açúcar e sal" },
      { n: "Óleo de gergelim torrado — 1 garrafa", r: "gyoza · la-yu", s: "Essencial para la-yu — não substitua pelo cru (cor clara). São produtos diferentes" },
      { n: "Óleo neutro — mínimo 1,5 litro", r: "tempura · edamame · la-yu", s: "O tempura usa 3–4 xícaras só para fritar. Girassol, canola ou milho" },
      { n: "Alga wakame seca — 1 pacote pequeno", r: "sunomono · soba", s: "Reidrate em água por 5 min e esprema bem antes de usar" },
      { n: "Gergelim branco torrado — 1 pacote", r: "sunomono · la-yu" },
      { n: "Açúcar — um pouco", r: "sunomono · tentsuyu" },
    ],
  },
  {
    icon: "🌶️", name: "Condimentos e temperos",
    items: [
      { n: "Sambal oelek — 1 potinho", r: "edamame apimentado", s: "Sub: sriracha (mais doce) · ou pimenta calabresa amassada com fio de azeite" },
      { n: "Gochugaru (pimenta coreana em flocos) — ⅓ xícara", r: "la-yu caseiro", s: "Sub: pimenta calabresa seca moída — use MENOS, é muito mais forte · Procure em loja asiática" },
      { n: "Pimenta Sichuan — ½ colher de chá", r: "la-yu caseiro", o: true, s: "Opcional — dá aroma floral e formigamento único. Sem substituto exato, pode omitir" },
      { n: "Pimenta do reino preta (moída na hora)", r: "gyoza" },
      { n: "Sal kosher ou sal grosso", r: "gyoza wrappers · edamame · sunomono" },
      { n: "Shoyu branco (shiro shoyu)", r: "ponzu transparente", o: true, s: "Opcional — para o molho transparente da gyoza igual ao do seu restaurante favorito. Procure em loja asiática" },
      { n: "Shichimi togarashi", r: "soba", o: true, s: "Sub: pimenta calabresa + gergelim torrado na hora de servir" },
    ],
  },
];

const TOTAL = DATA.reduce((a, c) => a + c.items.length, 0);
const STORAGE_KEY = "izakaya-v2";

export default function ListaPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      setChecked(saved);
    } catch {}
  }, []);

  function toggle(key: string) {
    setChecked((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  function toggleCollapse(ci: number) {
    setCollapsed((prev) => ({ ...prev, [ci]: !prev[ci] }));
  }

  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done / TOTAL) * 100);

  return (
    <div className="max-w-lg mx-auto px-4 pt-10 pb-16 space-y-8">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="pt-4 pb-6">
        <p className="font-mono text-xs mb-3" style={{ color: "var(--muted2)", letterSpacing: "0.12em" }}>
          Menu izakaya · 2 pessoas
        </p>
        <h1 style={{
          fontFamily: "var(--font-serif)", fontStyle: "italic",
          fontSize: "clamp(3rem,10vw,6rem)", lineHeight: 0.95, color: "var(--text)",
        }}>
          Lista de<br />Compras
        </h1>
        <div className="flex items-center gap-3 mt-5">
          <div className="flex-1 rounded-full h-1" style={{ background: "var(--border2)" }}>
            <div className="h-1 rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, background: "var(--accent)" }} />
          </div>
          <p className="font-mono shrink-0" style={{ fontSize: "0.62rem", color: "var(--muted2)" }}>
            {done}/{TOTAL} · {pct}%
          </p>
        </div>
      </div>

      {/* ── Categorias ───────────────────────────────────────────────── */}
      {DATA.map((cat, ci) => {
        const catDone = cat.items.filter((_, ii) => checked[`${ci}-${ii}`]).length;
        const isCollapsed = collapsed[ci];

        return (
          <section key={ci} className="space-y-2">

            {/* Category header — terracota filled */}
            <div className="card" style={{ overflow: "hidden" }}>
              <button
                onClick={() => toggleCollapse(ci)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  width: "100%", padding: "11px 14px",
                  background: "var(--accent)", color: "#fff",
                  border: "none", cursor: "pointer",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "13.5px" }}>
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{
                    background: "rgba(255,255,255,0.2)", borderRadius: "20px",
                    fontSize: "11px", padding: "2px 9px", fontFamily: "var(--font-mono)",
                  }}>
                    {catDone}/{cat.items.length}
                  </span>
                  <span style={{
                    display: "inline-block", fontSize: "14px", opacity: 0.8,
                    transition: "transform 0.2s",
                    transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
                  }}>▾</span>
                </span>
              </button>

            {/* Items */}
            {!isCollapsed && (
              <div>
                {cat.items.map((item, ii) => {
                  const key = `${ci}-${ii}`;
                  const isDone = checked[key];
                  return (
                    <div
                      key={ii}
                      onClick={() => toggle(key)}
                      style={{
                        display: "flex", alignItems: "flex-start", gap: "0.75rem",
                        padding: "0.75rem 1.25rem",
                        borderBottom: ii < cat.items.length - 1 ? "1px solid var(--border)" : undefined,
                        cursor: "pointer",
                        opacity: isDone ? 0.45 : 1,
                        transition: "opacity 0.2s ease",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      <span className="shrink-0 mt-0.5" style={{ fontSize: "1rem", lineHeight: 1 }}>
                        {isDone ? "✅" : "⬜️"}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0.4rem" }}>
                          <p className="font-sans font-medium text-sm" style={{
                            color: "var(--text)",
                            textDecoration: isDone ? "line-through" : "none",
                          }}>
                            {item.n}
                          </p>
                          {item.o && (
                            <span style={{
                              fontFamily: "var(--font-mono)", fontSize: "0.58rem",
                              background: "rgba(139,58,30,0.1)", color: "var(--accent2)",
                              borderRadius: "4px", padding: "1px 6px", letterSpacing: "0.04em",
                              flexShrink: 0,
                            }}>
                              opcional
                            </span>
                          )}
                        </div>
                        <p className="font-mono mt-0.5" style={{ fontSize: "0.6rem", color: "var(--muted)", fontStyle: "italic" }}>
                          {item.r}
                        </p>
                        {item.s && (
                          <p className="font-mono mt-1.5" style={{
                            fontSize: "0.6rem", color: "var(--muted2)", lineHeight: 1.55,
                            background: "var(--surface2)", borderRadius: "6px",
                            padding: "4px 8px", borderLeft: "2px solid var(--border2)",
                          }}>
                            {item.s}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            </div>
          </section>
        );
      })}

      <footer style={{
        textAlign: "center", paddingTop: "1rem",
        fontFamily: "var(--font-mono)", fontSize: "0.58rem",
        color: "var(--muted2)", letterSpacing: "0.08em",
      }}>
        Just One Cookbook
      </footer>
    </div>
  );
}

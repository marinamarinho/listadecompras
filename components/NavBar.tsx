"use client";

import { useState, useEffect } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") setOpen(false); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Top bar ───────────────────────────────────────────────────── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center",
        padding: "0 1.25rem",
        height: "52px",
        background: "rgba(242,237,227,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
      }}>
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "var(--text)", fontSize: "1.15rem", lineHeight: 1,
            padding: "6px 8px 6px 0", marginRight: "auto",
          }}
        >
          ☰
        </button>

        <span style={{
          position: "absolute", left: "50%", transform: "translateX(-50%)",
          fontFamily: "var(--font-serif)", fontStyle: "italic",
          fontSize: "1rem", color: "var(--accent)",
          pointerEvents: "none",
        }}>
          Lista de Compras
        </span>
      </header>

      <div style={{ height: "52px" }} />

      {/* ── Backdrop ──────────────────────────────────────────────────── */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(30,23,16,0.35)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
      />

      {/* ── Sidebar ───────────────────────────────────────────────────── */}
      <aside style={{
        position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 110,
        width: 265,
        background: "var(--bg)",
        borderRight: "1px solid var(--border)",
        transform: open ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", flexDirection: "column",
        padding: "1.5rem 1.25rem 2rem",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
          <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.3rem", color: "var(--accent)" }}>
            Lista de Compras
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "var(--muted2)", fontSize: "0.9rem", padding: "4px 6px",
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ flex: 1 }}>
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: "0.65rem",
            color: "var(--muted2)", letterSpacing: "0.08em", lineHeight: 1.8,
          }}>
            Menu izakaya · 2 pessoas<br />
            Just One Cookbook
          </p>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.25rem" }}>
          <button
            onClick={() => {
              if (confirm("Desmarcar todos os itens?")) {
                localStorage.removeItem("izakaya-v2");
                window.location.reload();
              }
              setOpen(false);
            }}
            style={{
              fontFamily: "var(--font-mono)", fontSize: "0.62rem",
              color: "var(--muted2)", background: "none", border: "1px solid var(--border2)",
              borderRadius: "8px", padding: "6px 14px", cursor: "pointer",
              letterSpacing: "0.05em",
            }}
          >
            resetar lista
          </button>
        </div>
      </aside>
    </>
  );
}

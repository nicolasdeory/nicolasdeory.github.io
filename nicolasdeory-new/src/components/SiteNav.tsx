"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { navItems } from "@/content/nav";

/** Sidebar width — keep in sync with `layout.tsx` main offset (`md:pl-44`) */
const sidebarW = "w-44";

export function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {/* Mobile: compact bar when menu closed */}
      <header
        className={`sticky top-0 z-50 bg-background md:hidden ${open ? "hidden" : ""}`}
      >
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
          <Link
            href="/"
            className="font-display shrink-0 text-xl text-foreground sm:text-2xl"
          >
            Nicolás de Ory
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-foreground"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label="Abrir menú"
            onClick={() => setOpen(true)}
          >
            <IconMenu />
          </button>
        </div>
      </header>

      {/* Mobile: fullscreen menu */}
      <div
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-label="Principal"
        className={
          open
            ? "fixed inset-0 z-60 flex flex-col bg-background pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] md:hidden"
            : "hidden"
        }
      >
        <div className="mx-auto flex w-full max-w-3xl shrink-0 items-center justify-between gap-4 px-4 py-3 sm:px-8">
          <Link
            href="/"
            className="font-display shrink-0 text-xl text-foreground sm:text-2xl"
          >
            Nicolás de Ory
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-foreground"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
          >
            <IconClose />
          </button>
        </div>

        <nav className="flex min-h-0 flex-1 flex-col justify-start overflow-y-auto px-4 pt-4 sm:px-8">
          <ul className="mx-auto flex w-full max-w-3xl flex-col gap-2 text-end">
            {navItems.map((item) => (
              <li
                key={item.label}
                onClick={() => {
                  if (item.href === pathname) setOpen(false);
                }}
              >
                <NavLink
                  item={item}
                  className="block py-3 text-2xl sm:text-3xl"
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Desktop: home = vertically centered; other routes = align with article top (py-10 sm:py-14) */}
      <aside
        className={`fixed inset-y-0 left-0 z-10 hidden ${sidebarW} flex-col bg-background px-6 md:flex ${
          isHome
            ? "justify-center"
            : "justify-start pt-10 sm:pt-14"
        }`}
        aria-label="Navegación"
      >
        <div className="flex flex-col gap-8">
          <Link
            href="/"
            className="font-display text-xl leading-tight text-foreground sm:text-2xl"
          >
            Nicolás de Ory
          </Link>
          <nav aria-label="Principal">
            <ul className="flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <NavLink item={item} className="block" />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

function NavLink({
  item,
  className = "",
}: {
  item: (typeof navItems)[number];
  className?: string;
}) {
  const inner = item.label;
  const cls = ["text-foreground", className].filter(Boolean).join(" ");

  if (item.href.startsWith("/")) {
    return (
      <Link href={item.href} className={cls}>
        {inner}
      </Link>
    );
  }

  return (
    <a href={item.href} className={cls}>
      {inner}
    </a>
  );
}

function IconMenu() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        d="M5 8h14M5 12h14M5 16h14"
      />
    </svg>
  );
}

function IconClose() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        d="M7 7l10 10M17 7L7 17"
      />
    </svg>
  );
}

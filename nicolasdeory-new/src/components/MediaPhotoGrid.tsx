"use client";

import type { ListBlobResultBlob } from "@vercel/blob";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function labelFromPathname(pathname: string): string {
  const base = pathname.split("/").pop() ?? pathname;
  return base.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
}

export function MediaPhotoGrid({
  photos,
  canDelete = false,
}: {
  photos: ListBlobResultBlob[];
  canDelete?: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState<ListBlobResultBlob | null>(null);
  const [mounted, setMounted] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  async function handleDelete() {
    if (!open || !canDelete || deleting) return;
    if (!window.confirm("Delete this photograph? This cannot be undone.")) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/media/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pathname: open.pathname }),
      });
      if (!res.ok) {
        console.error("Delete failed", await res.text());
        return;
      }
      setOpen(null);
      router.refresh();
    } finally {
      setDeleting(false);
    }
  }

  if (photos.length === 0) {
    return (
      <p className="text-foreground/70">
        No photographs here yet.
      </p>
    );
  }

  const lightbox =
    mounted &&
    open &&
    createPortal(
      <div
        className="fixed inset-0 z-100 flex flex-col bg-black/92"
        role="dialog"
        aria-modal="true"
        aria-label="Full screen photograph"
      >
        <div className="relative flex shrink-0 justify-end p-3 sm:p-4">
          {canDelete ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                void handleDelete();
              }}
              disabled={deleting}
              className="text-red-300 hover:text-red-200 absolute top-3 left-3 rounded-md px-3 py-2 text-sm underline disabled:opacity-50 sm:top-4 sm:left-4"
              aria-label="Delete photograph"
            >
              {deleting ? "Deleting…" : "Delete"}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="text-white/90 hover:text-white flex h-11 w-11 items-center justify-center rounded-md text-2xl leading-none transition-colors"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div
          className="relative flex min-h-0 flex-1 cursor-zoom-out items-center justify-center px-3 pb-8 sm:px-6"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative mx-auto h-[calc(100dvh-6rem)] w-full max-w-[min(100vw,100dvh)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={open.url}
              alt={labelFromPathname(open.pathname) || "Photograph"}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      </div>,
      document.body,
    );

  return (
    <>
      <ul className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2">
        {photos.map((photo) => {
          const label = labelFromPathname(photo.pathname);
          return (
            <li key={photo.pathname}>
              <button
                type="button"
                onClick={() => setOpen(photo)}
                className="border-foreground/15 w-full cursor-zoom-in overflow-hidden rounded-sm border p-0 text-left"
                aria-label={label ? `View ${label} full screen` : "View photograph full screen"}
              >
                <Image
                  src={photo.url}
                  alt=""
                  width={2400}
                  height={1600}
                  sizes="(max-width: 639px) 100vw, 50vw"
                  className="bg-foreground/5 block h-auto w-full"
                  style={{ width: "100%", height: "auto" }}
                />
              </button>
            </li>
          );
        })}
      </ul>
      {lightbox}
    </>
  );
}

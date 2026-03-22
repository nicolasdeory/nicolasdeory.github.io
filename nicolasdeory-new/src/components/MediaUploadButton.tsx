"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export function MediaUploadButton() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/media/upload", { method: "POST", body: fd });
      if (!res.ok) {
        console.error("Upload failed", await res.text());
      } else {
        router.refresh();
      }
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={onChange}
        disabled={busy}
        aria-hidden
      />
      <button
        type="button"
        className="text-foreground/50 hover:text-foreground -mr-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition-colors disabled:opacity-40"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        aria-label={busy ? "Uploading photograph" : "Upload photograph"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-7 w-7"
          aria-hidden
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </>
  );
}

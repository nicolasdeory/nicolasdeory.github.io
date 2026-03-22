"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";

function hasFilePayload(e: React.DragEvent) {
  return Array.from(e.dataTransfer.types).some(
    (t) => t === "Files" || t === "application/x-moz-file",
  );
}

export function MediaDropZone({
  children,
  enabled,
}: {
  children: React.ReactNode;
  enabled: boolean;
}) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
      if (list.length === 0) return;
      setUploading(true);
      try {
        for (const file of list) {
          const fd = new FormData();
          fd.append("file", file);
          const res = await fetch("/api/media/upload", { method: "POST", body: fd });
          if (!res.ok) {
            console.error("Upload failed", await res.text());
          }
        }
        router.refresh();
      } finally {
        setUploading(false);
      }
    },
    [router],
  );

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div
      ref={rootRef}
      className="relative"
      onDragEnter={(e) => {
        if (!hasFilePayload(e)) return;
        e.preventDefault();
        setActive(true);
      }}
      onDragOverCapture={(e) => {
        if (!hasFilePayload(e)) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
      }}
      onDragLeave={(e) => {
        const root = rootRef.current;
        const related = e.relatedTarget as Node | null;
        if (root && related && root.contains(related)) return;
        setActive(false);
      }}
      onDropCapture={(e) => {
        if (!hasFilePayload(e)) return;
        e.preventDefault();
        e.stopPropagation();
        setActive(false);
        void uploadFiles(e.dataTransfer.files);
      }}
    >
      {children}
      {(active || uploading) && (
        <div
          className="border-foreground/35 bg-background/88 text-foreground/90 pointer-events-none absolute inset-0 z-50 flex flex-col items-center justify-center gap-2 rounded-sm border-2 border-dashed p-6 text-center backdrop-blur-sm"
          aria-hidden
        >
          <p className="font-display text-lg">
            {uploading ? "Uploading…" : "Drop photos here"}
          </p>
          {!uploading ? (
            <p className="text-foreground/60 text-sm">Release to upload</p>
          ) : null}
        </div>
      )}
    </div>
  );
}

import type { Metadata } from "next";

import { MediaDropZone } from "@/components/MediaDropZone";
import { MediaPhotoGrid } from "@/components/MediaPhotoGrid";
import { MediaUploadButton } from "@/components/MediaUploadButton";
import { listPhotos } from "@/lib/blob-photos";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Media · Nicolás de Ory",
  description: "Media",
};

export default async function MediaPage() {
  const loggedIn = await getSession();
  const photos = await listPhotos();

  return (
    <main className="bg-background text-foreground">
      <MediaDropZone enabled={loggedIn}>
        <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-8 sm:py-14">
          <header className="mb-8 flex flex-row items-start justify-between gap-4 sm:mb-10">
            <h1 className="font-display text-3xl font-normal tracking-tight sm:text-4xl">
              Photographs
            </h1>
            {loggedIn ? <MediaUploadButton /> : null}
          </header>
          <MediaPhotoGrid photos={photos} canDelete={loggedIn} />
        </article>
      </MediaDropZone>
    </main>
  );
}

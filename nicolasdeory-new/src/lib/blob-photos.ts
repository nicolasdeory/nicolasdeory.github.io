import { list } from "@vercel/blob";
import type { ListBlobResultBlob } from "@vercel/blob";

const PREFIX = "photos/";

/** Lists uploaded images from Blob (newest first). Returns [] if unconfigured or on error. */
export async function listPhotos(): Promise<ListBlobResultBlob[]> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return [];

  try {
    const all: ListBlobResultBlob[] = [];
    let cursor: string | undefined;

    do {
      const result = await list({
        prefix: PREFIX,
        token,
        cursor,
        limit: 1000,
      });
      all.push(...result.blobs);
      cursor = result.hasMore ? result.cursor : undefined;
    } while (cursor);

    all.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
    return all;
  } catch {
    return [];
  }
}

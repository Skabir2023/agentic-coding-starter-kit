import { readFile, writeFile, unlink, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

export async function uploadFile(file: File, filename: string): Promise<string> {
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

  if (blobToken) {
    return await uploadToVercelBlob(file, filename);
  }

  return await uploadToLocal(file, filename);
}

async function uploadToLocal(file: File, filename: string): Promise<string> {
  await ensureUploadDir();

  const buffer = Buffer.from(await file.arrayBuffer());
  const filepath = path.join(UPLOAD_DIR, filename);
  await writeFile(filepath, buffer);

  return `/uploads/${filename}`;
}

async function uploadToVercelBlob(file: File, filename: string): Promise<string> {
  const { put } = await import("@vercel/blob");
  const blob = await put(filename, file, {
    access: "public",
  });

  return blob.url;
}

export async function deleteFile(url: string): Promise<void> {
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

  if (blobToken && url.includes("vercel.com")) {
    const { del } = await import("@vercel/blob");
    await del(url);
    return;
  }

  if (url.startsWith("/uploads/")) {
    const filepath = path.join(process.cwd(), "public", url);
    if (existsSync(filepath)) {
      await unlink(filepath);
    }
  }
}
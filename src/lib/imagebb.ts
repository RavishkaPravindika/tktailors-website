// src/lib/imagebb.ts

export async function uploadToImageBB(file: File): Promise<{ url: string; deleteUrl: string; thumbnailUrl: string }> {
  const apiKey = process.env.NEXT_PUBLIC_IMAGEBB_API_KEY;
  if (!apiKey) throw new Error("ImageBB API key is not configured");

  const formData = new FormData();
  formData.append("image", file);
  formData.append("key", apiKey);

  const response = await fetch(`https://api.imgbb.com/1/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`ImageBB upload failed: ${response.statusText}`);
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error("ImageBB upload failed");
  }

  return {
    url: data.data.url,
    deleteUrl: data.data.delete_url,
    thumbnailUrl: data.data.thumb?.url || data.data.url,
  };
}

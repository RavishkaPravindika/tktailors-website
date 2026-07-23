// src/lib/imagebb.ts

/**
 * Converts a File to a Base64 Data URL string
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

export async function uploadToImageBB(
  file: File
): Promise<{ url: string; deleteUrl: string; thumbnailUrl: string }> {
  const apiKey = process.env.NEXT_PUBLIC_IMAGEBB_API_KEY;

  const base64DataUrl = await fileToBase64(file);
  const base64Clean = base64DataUrl.split(",")[1];

  if (apiKey) {
    try {
      const formData = new FormData();
      formData.append("image", base64Clean);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success && data.data?.url) {
        return {
          url: data.data.url,
          deleteUrl: data.data.delete_url || "",
          thumbnailUrl: data.data.thumb?.url || data.data.url,
        };
      } else {
        console.warn("ImageBB API error response:", data);
      }
    } catch (err) {
      console.warn("ImageBB upload failed, using fallback:", err);
    }
  }

  // Fallback: Return Base64 Data URL if ImageBB is not configured or fails
  return {
    url: base64DataUrl,
    deleteUrl: "",
    thumbnailUrl: base64DataUrl,
  };
}

// app/lib/cloudinary.ts
export async function uploadToCloudinary(file: File): Promise<string> {
    const cloudName = "ddbs7m7nt";     // ← your Cloudinary cloud name
    const uploadPreset = "presetOne";  // ← your unsigned upload preset
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
  
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData }
    );
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.secure_url as string;
  }
  
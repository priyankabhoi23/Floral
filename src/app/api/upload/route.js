import { promises as fs } from "fs";
import path from "path";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    try {
      await fs.mkdir(uploadDir, { recursive: true });
    } catch (err) {
      // Directory might already exist
    }

    // Clean filename and make it unique
    const sanitizedFilename = file.name
      .replace(/[^a-zA-Z0-9.]/g, "_")
      .toLowerCase();
    const uniqueFilename = `${Date.now()}-${sanitizedFilename}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    // Save the file
    await fs.writeFile(filePath, buffer);

    // Return the relative URL of the uploaded image
    return Response.json({ 
      success: true, 
      url: `/uploads/${uniqueFilename}` 
    });
  } catch (error) {
    console.error("File upload error:", error);
    return Response.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

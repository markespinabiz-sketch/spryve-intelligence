import OpenAI, { toFile } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function dataUrlToBuffer(dataUrl: string) {
  const [meta, base64] = dataUrl.split(",");
  const mimeMatch = meta.match(/data:(.*);base64/);
  const mimeType = mimeMatch?.[1] || "image/png";
  const extension = mimeType.includes("jpeg") ? "jpg" : mimeType.includes("webp") ? "webp" : "png";
  return {
    buffer: Buffer.from(base64, "base64"),
    mimeType,
    filename: `reference.${extension}`,
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body.prompt;
    const referenceImage = body.referenceImage;

    if (!prompt) {
      return NextResponse.json({ success: false, error: "Prompt is required." }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ success: false, error: "OPENAI_API_KEY is missing in .env.local." }, { status: 500 });
    }

    let result;

    if (referenceImage?.dataUrl) {
      const fileData = dataUrlToBuffer(referenceImage.dataUrl);
      const imageFile = await toFile(fileData.buffer, fileData.filename, {
        type: fileData.mimeType,
      });

      result = await openai.images.edit({
        model: "gpt-image-1",
        image: imageFile,
        prompt,
        size: "1024x1536",
        quality: "medium",
        n: 1,
      });
    } else {
      result = await openai.images.generate({
        model: "gpt-image-1",
        prompt,
        size: "1024x1536",
        quality: "medium",
        n: 1,
      });
    }

    const b64 = result.data?.[0]?.b64_json;

    if (!b64) {
      return NextResponse.json({ success: false, error: "No image returned from OpenAI." }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      imageUrl: `data:image/png;base64,${b64}`,
      mode: referenceImage?.dataUrl ? "reference-image-edit" : "text-to-image",
    });
  } catch (error: any) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to generate image." },
      { status: 500 }
    );
  }
}

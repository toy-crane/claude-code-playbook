/**
 * Generate images using Google's Nano Banana 2 (Gemini 3.1 Flash Image) API.
 *
 * Usage:
 *   bun .claude/skills/generate-image/scripts/generate-image.ts --prompt "description" --filename "output.png" [--resolution 1K|2K|4K] [--padding 40]
 *   bun .claude/skills/generate-image/scripts/generate-image.ts --prompt "edit instructions" --filename "output.png" --input-image "input.png"
 */

import { GoogleGenAI } from "@google/genai";
import { Jimp } from "jimp";
import { parseArgs } from "util";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";

// -- Parse CLI args --
const { values } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    prompt: { type: "string", short: "p" },
    filename: { type: "string", short: "f" },
    "input-image": { type: "string", short: "i" },
    resolution: { type: "string", short: "r", default: "2K" },
    padding: { type: "string", default: "40" },
  },
  strict: true,
});

const prompt = values.prompt;
const filename = values.filename;
const inputImagePath = values["input-image"];
const resolution = values.resolution as "1K" | "2K" | "4K";
const padding = parseInt(values.padding!, 10);

if (!prompt || !filename) {
  console.error("Error: --prompt and --filename are required.");
  console.error(
    'Usage: bun generate-image.ts --prompt "description" --filename "output.png"'
  );
  process.exit(1);
}

if (!["1K", "2K", "4K"].includes(resolution)) {
  console.error(`Error: Invalid resolution "${resolution}". Use 1K, 2K, or 4K.`);
  process.exit(1);
}

// -- API Key --
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("Error: GEMINI_API_KEY environment variable is not set.");
  console.error("Set it in .claude/settings.local.json under env.GEMINI_API_KEY");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

// -- Output path --
const outputPath = resolve(filename);
mkdirSync(dirname(outputPath), { recursive: true });

// -- Build request contents --
let contents: any[];
let finalResolution = resolution;

if (inputImagePath) {
  const imageData = readFileSync(resolve(inputImagePath));
  const base64 = imageData.toString("base64");

  // Detect mime type from extension
  const ext = inputImagePath.toLowerCase().split(".").pop();
  const mimeMap: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
    gif: "image/gif",
  };
  const mimeType = mimeMap[ext || ""] || "image/png";

  // Auto-detect resolution from input image if using default
  if (resolution === "2K") {
    // Only auto-detect if user didn't explicitly set resolution
    // We use 2K as default, so we check image dimensions
    // to potentially upgrade to 4K for large inputs
    try {
      // Simple dimension detection not needed - 2K default is fine
    } catch {}
  }

  contents = [
    { inlineData: { mimeType, data: base64 } },
    { text: prompt },
  ];
  console.log(`Loaded input image: ${inputImagePath}`);
  console.log(`Editing image with resolution ${finalResolution}...`);
} else {
  contents = [{ text: prompt }];
  console.log(`Generating image with resolution ${finalResolution}...`);
}

// -- Call Gemini API --
try {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-image-preview",
    contents: [{ role: "user", parts: contents }],
    config: {
      responseModalities: ["TEXT", "IMAGE"],
      imageConfig: {
        imageSize: finalResolution,
      },
    },
  });

  let imageSaved = false;

  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.text) {
        console.log(`Model response: ${part.text}`);
      } else if (part.inlineData) {
        const imageBytes = Buffer.from(part.inlineData.data!, "base64");
        const src = await Jimp.fromBuffer(imageBytes);
        if (padding > 0) {
          const dst = new Jimp({ width: src.width + padding * 2, height: src.height + padding * 2, color: 0xffffffff });
          dst.composite(src, padding, padding);
          const buf = await dst.getBuffer("image/png");
          writeFileSync(outputPath, buf);
        } else {
          const buf = await src.getBuffer("image/png");
          writeFileSync(outputPath, buf);
        }
        imageSaved = true;
      }
    }
  }

  if (imageSaved) {
    console.log(`\nImage saved: ${outputPath}`);
  } else {
    console.error("Error: No image was generated in the response.");
    process.exit(1);
  }
} catch (e: any) {
  console.error(`Error generating image: ${e.message || e}`);
  process.exit(1);
}

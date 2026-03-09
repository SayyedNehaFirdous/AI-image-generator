const fs = require("fs-extra");
const path = require("path");
const Replicate = require("replicate");

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

function sanitizeFileName(index: number) {
  return `image-${String(index + 1).padStart(2, "0")}.png`;
}

async function downloadFile(url: string, filePath: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(filePath, buffer);
}

async function generateImages() {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error("Missing REPLICATE_API_TOKEN environment variable");
  }

  const promptsPath = path.join(process.cwd(), "output", "prompts.json");
  const outputDir = path.join(process.cwd(), "output", "images");

  await fs.ensureDir(outputDir);

  const promptResults: {
    title: string;
    category: string;
    prompt: string;
  }[] = fs.readJsonSync(promptsPath);

  for (let i = 0; i < promptResults.length; i++) {
    const item = promptResults[i];

    console.log(`Generating image ${i + 1}/${promptResults.length} for: ${item.title}`);

    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: item.prompt,
          aspect_ratio: "16:9",
          output_format: "png",
          output_quality: 100
        }
      }
    );

    if (!output) {
      console.log(`No output returned for: ${item.title}`);
      continue;
    }

    let imageUrl: string | null = null;

    if (Array.isArray(output) && output.length > 0) {
      imageUrl = String(output[0]);
    } else if (typeof output === "string") {
      imageUrl = output;
    }

    if (!imageUrl) {
      console.log(`Could not extract image URL for: ${item.title}`);
      continue;
    }

    const fileName = sanitizeFileName(i);
    const filePath = path.join(outputDir, fileName);

    await downloadFile(imageUrl, filePath);
    console.log(`Saved: ${filePath}`);
  }

  console.log("All images generated successfully.");
}

generateImages().catch((error: any) => {
  console.error("Replicate image generation failed:", error.message);
});

export {};
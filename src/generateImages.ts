const fs = require("fs-extra");
const path = require("path");
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateImages() {
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

    console.log(`Generating image ${i + 1}/${
      promptResults.length
    } for: ${item.title}`);

    const response = await client.responses.create({
      model: "gpt-5",
      input: item.prompt,
      tools: [
        {
          type: "image_generation"
        }
      ]
    });

    const imageData = response.output
      .filter((output: any) => output.type === "image_generation_call")
      .map((output: any) => output.result);

    if (!imageData.length) {
      console.log(`No image returned for: ${item.title}`);
      continue;
    }

    const imageBase64 = imageData[0];
    const safeFileName = `image-${String(i + 1).padStart(2, "0")}.png`;
    const filePath = path.join(outputDir, safeFileName);

    fs.writeFileSync(filePath, Buffer.from(imageBase64, "base64"));
    console.log(`Saved: ${filePath}`);
  }

  console.log("All done.");
}

generateImages().catch((error: any) => {
  console.error("Image generation failed:", error.message);
});
export {};
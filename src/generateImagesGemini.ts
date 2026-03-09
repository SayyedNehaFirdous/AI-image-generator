const fs = require("fs-extra");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function generateImages() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY environment variable");
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

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: item.prompt
    });

    const parts = response.candidates?.[0]?.content?.parts || [];
    let saved = false;

    for (const part of parts) {
      if (part.inlineData?.data) {
        const buffer = Buffer.from(part.inlineData.data, "base64");
        const fileName = `image-${String(i + 1).padStart(2, "0")}.png`;
        const filePath = path.join(outputDir, fileName);

        fs.writeFileSync(filePath, buffer);
        console.log(`Saved: ${filePath}`);
        saved = true;
        break;
      }
    }

    if (!saved) {
      console.log(`No image returned for: ${item.title}`);
    }
  }

  console.log("All images generated.");
}

generateImages().catch((error: any) => {
  console.error("Gemini image generation failed:", error.message);
});

export {};
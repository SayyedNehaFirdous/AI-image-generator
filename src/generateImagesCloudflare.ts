const fs = require("fs-extra");
const path = require("path");

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

async function generateImages() {

  if (!ACCOUNT_ID || !API_TOKEN) {
    throw new Error("Missing Cloudflare credentials");
  }

  const promptsPath = path.join(process.cwd(), "output", "prompts.json");
  const outputDir = path.join(process.cwd(), "output", "images");

  await fs.ensureDir(outputDir);

  const prompts = fs.readJsonSync(promptsPath);

  for (let i = 0; i < prompts.length; i++) {

    const item = prompts[i];

    console.log(`Generating image ${i+1}/${prompts.length}`);

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: item.prompt
        })
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    const arrayBuffer = await response.arrayBuffer();

    const fileName = `image-${String(i+1).padStart(2,"0")}.png`;
    const filePath = path.join(outputDir, fileName);

    fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

    console.log(`Saved: ${filePath}`);
  }

  console.log("All images generated.");
}

generateImages().catch(console.error);
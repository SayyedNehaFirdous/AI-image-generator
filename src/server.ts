const express = require("express");
const cors = require("cors");

const { brandStyle } = require("./brand");
const { buildImagePrompt } = require("./promptBuilder");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

app.get("/health", (req: any, res: any) => {
  res.json({ ok: true });
});

app.post("/generate", async (req: any, res: any) => {
  try {
    const title = req.body?.title?.trim();
    const category = req.body?.category;

    if (!title || !category) {
      return res.status(400).json({
        error: "Title and category are required."
      });
    }

    if (!ACCOUNT_ID || !API_TOKEN) {
      return res.status(500).json({
        error: "Missing Cloudflare credentials."
      });
    }

    const prompt = buildImagePrompt(title, category, brandStyle);

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt,
          negative_prompt:
            "abstract art, abstract pattern, random lines, decorative texture, surreal art, chaotic composition, collage, grid, multiple panels, split screen, text blocks, template, mood board, infographic, ui design, labels, words, blurry, low quality, low contrast, black image, dark image, empty background, distorted anatomy, extra limbs, duplicate subject",
          width: 1344,
          height: 768,
          num_steps: 20,
          guidance: 9
        })
      }
    );

    const contentType = response.headers.get("content-type") || "";

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Cloudflare API error:", errorText);
      return res.status(500).json({
        error: "Cloudflare image generation failed.",
        details: errorText
      });
    }

    if (!contentType.startsWith("image/")) {
      const text = await response.text();
      console.error("Unexpected response type:", contentType, text);
      return res.status(500).json({
        error: "API did not return an image.",
        details: text
      });
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const mimeType = contentType.split(";")[0] || "image/png";
    const base64 = buffer.toString("base64");

    return res.json({
      image: `data:${mimeType};base64,${base64}`,
      prompt
    });
  } catch (err: any) {
    console.error("Server error:", err);
    return res.status(500).json({
      error: err.message || "Unknown server error"
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export {};
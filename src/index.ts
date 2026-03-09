const fs = require("fs-extra");
const path = require("path");

const { brandStyle } = require("./brand");
const { buildImagePrompt } = require("./promptBuilder");
const { categorizedTitles } = require("./categories");

const outputPath = path.join(process.cwd(), "output", "prompts.json");

const promptResults = categorizedTitles.map(
  (item: { title: string; category: "WISSEN" | "NEWS" | "INTERVIEW" }) => {
    return {
      title: item.title,
      category: item.category,
      prompt: buildImagePrompt(item.title, item.category, brandStyle)
    };
  }
);

fs.writeJsonSync(outputPath, promptResults, { spaces: 2 });

console.log("Prompts generated and saved successfully.");
console.log(`File: ${outputPath}`);

export {};
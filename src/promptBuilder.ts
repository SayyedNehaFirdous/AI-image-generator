function getCategoryStyle(category: "WISSEN" | "NEWS" | "INTERVIEW"): string {
  switch (category) {
    case "WISSEN":
      return "Use an educational, calm, clean editorial illustration with approachable women's health imagery.";
    case "NEWS":
      return "Use a focused editorial health-news visual with a clear main subject and a modern announcement feel.";
    case "INTERVIEW":
      return "Use a human-centered editorial composition with warmth, empathy, and subtle storytelling.";
    default:
      return "Use a coherent digital health editorial header style.";
  }
}

function getTitleSpecificDirection(title: string): string {
  const lower = title.toLowerCase();

  if (
    lower.includes("symptom") ||
    lower.includes("regelschmerzen") ||
    lower.includes("schmerz") ||
    lower.includes("pain")
  ) {
    return "Show a clear human-centered women's health scene suggesting symptom awareness, discomfort, self-care, or body awareness in a calm and respectful way.";
  }

  if (
    lower.includes("interview") ||
    lower.includes("forschung") ||
    lower.includes("research")
  ) {
    return "Show a portrait-style editorial composition with one person or a health expert-inspired visual, clean background, and subtle medical or research context.";
  }

  if (
    lower.includes("künstlicher intelligenz") ||
    lower.includes("artificial intelligence") ||
    lower.includes("ai")
  ) {
    return "Show a modern digital health concept with one human-centered subject and subtle technology cues, avoiding futuristic sci-fi clichés.";
  }

  if (
    lower.includes("mythen") ||
    lower.includes("fakten") ||
    lower.includes("wissen")
  ) {
    return "Show a trustworthy educational health illustration that feels clear, informative, and easy to understand at first glance.";
  }

  if (
    lower.includes("kongress") ||
    lower.includes("news") ||
    lower.includes("wirkstoff") ||
    lower.includes("speicheltest")
  ) {
    return "Show a modern health-news editorial visual with one clear focal subject and a clean, professional composition.";
  }

  return "Show a single, clear, premium women's health editorial illustration that directly relates to the blog title.";
}

function buildImagePrompt(
  title: string,
  category: "WISSEN" | "NEWS" | "INTERVIEW",
  brandStyle: any
): string {
  const categoryStyle = getCategoryStyle(category);
  const titleSpecificDirection = getTitleSpecificDirection(title);

  return `
Create a single clean blog header hero image for a women's health website.

This must be ONE clear website header banner image.
Do NOT create a collage.
Do NOT create multiple panels.
Do NOT create a grid.
Do NOT create abstract decorative artwork.

Article title: "${title}"

Category:
- ${category}

Brand style:
- Brand: ${brandStyle.brandName}
- Visual style: ${brandStyle.visualStyle}
- Mood: ${brandStyle.mood}
- Color palette: ${brandStyle.colorPalette.join(", ")}
- Composition: ${brandStyle.composition.join(", ")}
- Include: ${brandStyle.doInclude.join(", ")}
- Avoid: ${brandStyle.avoid.join(", ")}
- Aspect ratio: ${brandStyle.format.aspectRatio}
- Text overlay: ${brandStyle.format.useTextOverlay ? "yes" : "no"}

Category-specific direction:
- ${categoryStyle}

Title-specific direction:
- ${titleSpecificDirection}

Important requirements:
- The image must clearly relate to the article title.
- Use one main subject only.
- Make the image easy to understand at a glance.
- Show a calm, premium, women’s health editorial aesthetic.
- Prefer a human-centered scene or a clear health-related visual metaphor.
- Keep the composition minimal and website-header friendly.
- Use soft, elegant lighting and clean negative space.
- Avoid surreal visuals, random lines, chaotic forms, decorative textures, and irrelevant objects.
- Avoid visible text, labels, UI mockups, icons, and infographics inside the image.
- Avoid dark, black, empty, or low-contrast results.
`.trim();
}

module.exports = { buildImagePrompt };

export {};
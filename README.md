# AI Blog Header Generator

This project automatically generates consistent blog header images for Endo Health blog posts.

The system was tested with a set of 10 blog titles inspired by the Endo Health blog categories (Wissen & Tipps, News, Interviews).

### Wissen & Tipps

1️⃣ Periode und Regelschmerzen: Was ist normal? Was nicht?
2️⃣ Endometriose: Fakten statt Mythen
3️⃣ Endometriose mit künstlicher Intelligenz früher erkennen
4️⃣ Autoimmunerkrankungen und Endometriose

### News

5️⃣ Yselty® – Neu zugelassener Wirkstoff bei Endometriose
6️⃣ Speicheltest für Endometriose: Das sagen die kritischen Stimmen
7️⃣ Endo Health GmbH auf dem 15. Endometriose-Kongress

### Interviews / Impulse

8️⃣ Aktuelle Forschung zu Endometriose: Interview mit Henrik Marschall
9️⃣ Aktuelle Forschung zu Endometriose: Interview mit Nisha Marshall
🔟 Mit Schmerzkalender und Ruhe durch den Alltag

However, the generator is dynamic and can produce consistent header images for any new blog title using the same brand-aware prompt system.

## Workflow

Blog title
↓
Prompt builder
↓
Brand style injection
↓
Cloudflare Workers AI (Stable Diffusion)
↓
Header image

## Tech Stack

- TypeScript
- Node.js
- Express
- Cloudflare Workers AI
- Stable Diffusion XL

## Live Demo

A live demo of the generator is available here:

[RenderServer](https://ai-image-generator-1-bw4m.onrender.com/)

You can enter a blog title, choose a category, and generate a header image dynamically.

## Run locally

Install dependencies

npm install

Start server

npm run dev 

Open browser

http://localhost:3000

## Example

Input:
"Understanding Endometriosis Symptoms"

AI generated blog header image

Output:<img width="987" height="859" alt="Screenshot 2026-03-10 002753" src="https://github.com/user-attachments/assets/dfa6d78b-525e-47bb-9574-ef1817f191e2" />

<img width="955" height="850" alt="Screenshot 2026-03-10 002935" src="https://github.com/user-attachments/assets/a7dcff72-d13b-499a-bdd2-9590e468993a" />

<img width="935" height="841" alt="Screenshot 2026-03-10 005142" src="https://github.com/user-attachments/assets/387453f8-2f06-43ec-97dc-181b9b4521d3" />

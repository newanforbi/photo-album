import fs from "node:fs";
import path from "node:path";

const date = process.argv[2];

if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  console.error("Usage: npm run new-day -- YYYY-MM-DD");
  process.exit(1);
}

const contentDir = path.join(process.cwd(), "content", "photos", date);
const publicDir = path.join(process.cwd(), "public", "photos", date);

if (fs.existsSync(contentDir)) {
  console.error(`content/photos/${date} already exists — nothing to do.`);
  process.exit(1);
}

fs.mkdirSync(contentDir, { recursive: true });
fs.mkdirSync(publicDir, { recursive: true });

const template = {
  dayTitle: "Untitled day",
  photos: [
    {
      file: "replace-me.jpg",
      title: "Replace With A Descriptive Title",
      caption: "Replace with a sentence or two describing this photo.",
      alt: "Replace with a plain description of what's visible in the image.",
      tags: [],
    },
  ],
  videos: [],
};

fs.writeFileSync(
  path.join(contentDir, "index.json"),
  `${JSON.stringify(template, null, 2)}\n`
);

console.log(`Created content/photos/${date}/index.json`);
console.log(`Created public/photos/${date}/ (drop your image files here)`);
console.log("Edit the JSON file's title/caption/alt/tags, then commit and push.");

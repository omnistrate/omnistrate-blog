const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

function cleanExcerpt(text) {
  if (!text) return "";

  text = text.replace(/```[\s\S]*?```/g, "");
  text = text.replace(/`[^`]+`/g, "");
  text = text.replace(/#{1,6}\s/g, "");
  text = text.replace(/\*\*([^*]+)\*\*/g, "$1");
  text = text.replace(/\*([^*]+)\*/g, "$1");
  text = text.replace(/^\s*[-*+]\s/gm, "");
  text = text.replace(/^\s*\d+\.\s/gm, "");
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, "");
  text = text.replace(/===cut===/g, "");
  text = text.trim().replace(/\s+/g, " ");

  return text.substring(0, 200);
}

// Read all markdown files
const postsDir = "posts";
const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

files.forEach((file) => {
  const filePath = path.join(postsDir, file);
  const content = fs.readFileSync(filePath, "utf8");

  // Split frontmatter and content
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return;

  const frontmatter = yaml.load(match[1]);
  const markdown = match[2];

  // Clean the excerpt
  frontmatter.excerpt = cleanExcerpt(frontmatter.excerpt || markdown);

  // Reconstruct file
  const newFrontmatter = yaml.dump(frontmatter, { lineWidth: -1, noRefs: true });
  const newContent = `---\n${newFrontmatter}---\n${markdown}`;

  fs.writeFileSync(filePath, newContent, "utf8");
  console.log(`✅ Fixed ${file}`);
});

console.log(`✅ Fixed excerpts in ${files.length} files`);

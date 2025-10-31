// Disable ESlint
/* eslint-disable */

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

function cleanExcerpt(text, maxLength = 200) {
  if (!text) return "";

  // Remove blockquotes (>) first
  text = text.replace(/^\s*>\s*/gm, "");

  // Remove code blocks
  text = text.replace(/```[\s\S]*?```/g, "");

  // Remove inline code
  text = text.replace(/`[^`]+`/g, "");

  // Remove images (both markdown and links)
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, "");
  text = text.replace(/\[(\d+)\]:\s*https?:\/\/[^\s]+/g, "");

  // Remove markdown links but keep text
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  // Remove markdown formatting
  text = text.replace(/#{1,6}\s/g, "");
  text = text.replace(/\*\*([^*]+)\*\*/g, "$1");
  text = text.replace(/\*([^*]+)\*/g, "$1");
  text = text.replace(/^\s*[-*+]\s/gm, "");
  text = text.replace(/^\s*\d+\.\s/gm, "");

  // Remove special markers
  text = text.replace(/===cut===/g, "");

  // Fix encoding issues
  text = text.replace(/â€™/g, "'");
  text = text.replace(/â€œ/g, '"');
  text = text.replace(/â€/g, '"');
  text = text.replace(/â€"/g, "—");
  text = text.replace(/â€‹/g, "");

  // Clean all whitespace including newlines
  text = text.replace(/\s+/g, " ").trim();

  // If already short enough, return as-is
  if (text.length <= maxLength) {
    return text;
  }

  // Split into sentences more reliably
  // Look for . ! or ? followed by space and capital letter, or end of string
  const sentenceRegex = /[^.!?]+[.!?]+(?=\s+[A-Z]|$)/g;
  const sentences = text.match(sentenceRegex);

  if (sentences && sentences.length > 0) {
    let excerpt = "";

    for (const sentence of sentences) {
      const trimmedSentence = sentence.trim();

      // If adding this sentence keeps us under limit
      if ((excerpt + " " + trimmedSentence).trim().length <= maxLength) {
        excerpt = (excerpt + " " + trimmedSentence).trim();
      } else {
        // This sentence would exceed limit
        // If we already have at least one sentence, use what we have
        if (excerpt.length > 50) {
          return excerpt;
        }
        // Otherwise, we need to cut this first sentence at word boundary
        break;
      }
    }

    // If we got complete sentences, return them
    if (excerpt.length > 50) {
      return excerpt;
    }
  }

  // Fallback: Cut at word boundary
  // Take up to maxLength chars
  let truncated = text.substring(0, maxLength);

  // Find last complete word (last space)
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > 50) {
    // Make sure we have substantial text
    truncated = truncated.substring(0, lastSpace);
  }

  // Add ellipsis only if we actually cut text
  if (text.length > maxLength) {
    truncated = truncated.trim() + "...";
  }

  return truncated.trim();
}

// Main execution
const postsDir = "posts";
const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

let fixed = 0;
let unchanged = 0;
let errors = 0;

console.log(`Processing ${files.length} files...\n`);

files.forEach((file, index) => {
  try {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, "utf8");

    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

    if (!match) {
      console.log(`⚠️  [${index + 1}/${files.length}] ${file} - No frontmatter found`);
      errors++;
      return;
    }

    const frontmatter = yaml.load(match[1]);
    const markdown = match[2];

    const oldExcerpt = frontmatter.excerpt || "";

    // Use markdown content as source since many excerpts are broken
    frontmatter.excerpt = cleanExcerpt(markdown, 200);

    if (oldExcerpt !== frontmatter.excerpt) {
      const newFrontmatter = yaml.dump(frontmatter, {
        lineWidth: -1,
        noRefs: true
      });
      const newContent = `---\n${newFrontmatter}---\n${markdown}`;

      fs.writeFileSync(filePath, newContent, "utf8");
      console.log(`✅ [${index + 1}/${files.length}] ${file}`);
      fixed++;
    } else {
      console.log(`⏭️  [${index + 1}/${files.length}] ${file} - Already good`);
      unchanged++;
    }
  } catch (err) {
    console.error(`❌ [${index + 1}/${files.length}] ${file} - Error: ${err.message}`);
    errors++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`✅ Fixed: ${fixed}`);
console.log(`⏭️  Unchanged: ${unchanged}`);
console.log(`❌ Errors: ${errors}`);
console.log(`📁 Total: ${files.length}`);

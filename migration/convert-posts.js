// Disable ESlint
/* eslint-disable */

// Initialize Turndown
const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  emDelimiter: "*"
});

// Don't escape markdown characters
turndown.escape = function (string) {
  return string;
};
// Load posts
const data = JSON.parse(fs.readFileSync("./posts_export.json", "utf8"));
const posts = data.posts || data; // Handle both formats

console.log(`Converting ${posts.length} posts...\n`);

posts.forEach((post, idx) => {
  try {
    // Generate slug
    const slug = post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    // Convert HTML to markdown
    const markdown = turndown.turndown(post.content || "");

    // Create frontmatter
    const frontmatter = {
      title: post.title,
      date: post.published_date,
      author: {
        name: post.author_name || "Unknown",
        email: post.author_email || "",
        picture: post.author_picture || ""
      },
      excerpt: (post.excerpt || post.title).substring(0, 200),
      slug: slug
    };

    const yamlFrontmatter = yaml.dump(frontmatter, {
      lineWidth: -1,
      noRefs: true
    });

    const output = `---\n${yamlFrontmatter}---\n\n${markdown}\n`;

    const filename = `${post.published_date.split(" ")[0]}-${slug}.md`;
    fs.writeFileSync(path.join("_posts", filename), output, "utf8");

    console.log(`✅ [${idx + 1}/${posts.length}] ${filename}`);
  } catch (err) {
    console.error(`❌ [${idx + 1}/${posts.length}] ${post.title}: ${err.message}`);
  }
});

console.log("\n✅ Done!");

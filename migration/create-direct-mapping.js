// Disable ESlint
/* eslint-disable */

const fs = require("fs");

const posts = JSON.parse(fs.readFileSync("./migration/posts_export.json", "utf8"));

const redirects = posts.map((post) => {
  const newSlug =
    post.slug ||
    post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  return {
    source: `/posts/${post.post_id}`,
    destination: `/posts/${newSlug}`,
    permanent: true
  };
});

// Save to JSON
fs.writeFileSync("redirect-mapping.json", JSON.stringify(redirects, null, 2));
console.log(`✅ Created ${redirects.length} redirects`);

// Also create CSV for documentation
const csv =
  "old_url,new_url,post_id,title\n" +
  redirects
    .map((r) => {
      const post = posts.find((p) => `/posts/${p.post_id}` === r.source);
      return `${r.source},${r.destination},${post.post_id},"${post.title.replace(/"/g, '""')}"`;
    })
    .join("\n");

fs.writeFileSync("redirect-mapping.csv", csv);
console.log(`✅ Created redirect-mapping.csv for documentation`);

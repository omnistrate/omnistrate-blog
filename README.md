# Blog Post Writing Guide - Markdown Format

This guide helps you create and format blog posts using the markdown-based blog system.

## Post Structure

Every blog post consists of two main sections:

1. Metadata Section (Front Matter) - Contains post information
2. Content Section - Contains the actual blog content

```md
---
[Metadata goes here]
---

[Content goes here]
```

## Metadata Structure

The metadata section uses YAML format and is enclosed between triple dashes (---). Here are the available fields:

```md
---
title: "Your Blog Post Title"
tags: "tag1, tag2, tag3, tag4"
date: "YYYY-MM-DD HH:MM:SS"
author:
  name: Your Name
  email: your.email@company.com
  picture: ""
excerpt: >-
  A brief description of your blog post. This appears in previews
  and search results. Can span multiple lines.
slug: your-blog-post-url-slug
readTime: 5
coverImage: /images/posts/your-cover-image.png
category: Category Name
---
```

## Remarks

1. Slug has to be unique across all posts.
2. Blog Categories are:
   - Product Updates
   - Industry Insights
   - Customer Stories
   - Engineering and Tech
   - Partners and Ecosystem
   - Miscellaneous
3. Add a cover image link only if you want it exclusively as a certain picture. Otherwise, if left as `coverImage: ''`, it takes the default picture based on the category.
4. Author images can be left empty because the blog doesn't use those fields at the moment.

## Content Elements

### 1. Headings

Use # symbols for different heading levels:

```md
# Heading 1

## Heading 2

### Heading 3

#### Heading 4
```

**Example:**
![Headings Markdown](/readme-assets/headings-markdown.png)

![Headings Rendered](/readme-assets/headings-rendered.png)

### 2. Text Blocks

Regular paragraphs are written as plain text with blank lines between them:

```md
This is a paragraph of text.

This is another paragraph. Leave a blank line between paragraphs
for proper spacing.
```

### 3. Bold Text

Use double asterisks or double underscores:

```md
**This text is bold**
__This is also bold__
```

### 4. Italic Text

Use single asterisks or single underscores:

```md
*This text is italic*
_This is also italic_
```

### 5. Bold and Italic Combined

Use Use triple asterisks:

```md
***This text is bold and italic***
```

### 6. Links

**Inline Links**

```md
[Link Text](https://example.com)
```

**Example:**

![Link Markdown](/readme-assets/link-markdown.png)

![Link Rendered](/readme-assets/link-rendered.png)

**Reference-Style Links**

```md
[Link Text][1]

[1]: https://example.com (at the end of blog content)
```

![Reference Links](/readme-assets/reference-links.png)

**Note:** Prefer inline links if possible.

### 7. Images

1. Store images in `/images/posts/` folder.
2. Use descriptive filenames that match your post.
3. Reference images using the correct path in your markdown

```md
![Alt Text](/path/to/image.png)
```

### 8. Code Blocks

Use three backticks on each side of the code block. Optionally, the language can be added for syntax highlighting when rendered. List of supported languages: [Supported Languages](https://github.com/wooorm/lowlight?tab=readme-ov-file#data)

```md
\`\`\`yaml
x-omnistrate-capabilities:
  sidecars:
    otel:
      imageNameWithTag: "otel/opentelemetry-collector-contrib:0.116.1"
      command:
        - "/otelcol-contrib"
        - "--config"
        - "/mnt/otel-config.yaml"
      resourceLimits:
        cpu: "250m"
        memory: "256Mi"
      securityContext:
        runAsUser: 10001
        runAsGroup: 0
        runAsNonRoot: true
\`\`\`
```

**Example:**

![Codeblock Markdown](/readme-assets/codeblock-markdown.png)

![Codeblock Rendered](/readme-assets/codeblock-rendered.png)

### 9. Lists

**Unordered Lists**

Use -, *, or +:

```md
- Item 1
- Item 2
- Item 3
```

**Ordered Lists**

Use numbers followed by periods:

```
1. First item
2. Second item
3. Third item
```

**Nested Lists**

Indent sub-items with spaces (2 or 4 spaces):

```md
- Main item 1
  - Sub-item 1.1
  - Sub-item 1.2
    - Sub-sub-item 1.2.1
- Main item 2
  - Sub-item 2.1
```

### 10. Blockquotes

Use > for quotes:

```md
> This is a blockquote.
> It can span multiple lines.
```

**Example:**

![Blockquote Markdown](/readme-assets/blockquote-markdown.png)

![Blockquote Rendered](/readme-assets/blockquote-rendered.png)

### 11. Tables

Use pipes and hyphens:

```md
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

Alignment:

```md
| Left-aligned | Center-aligned | Right-aligned |
|:-------------|:--------------:|--------------:|
| Left         | Center         | Right         |
```

### 12. YouTube Video Embed

Use the custom YouTube component:

```mdx
<YouTube videoId="fYWr1otnLWY" />
```

**Note:** Careful with the casing. It's **YouTube** not **Youtube**.

## Saving Your Post

1. **File Naming Convention:** Save your file with a descriptive name using the slug format:

```md
YYYY-MM-DD-omnistrate-platform-update-september-2025-edition.md
YYYY-MM-DD-case-study-ferretdb-dbaas-success.md
```

2. **File Location:** Place your markdown file in the designated `posts` directory.
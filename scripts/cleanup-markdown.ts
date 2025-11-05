import * as fs from 'fs';
import * as path from 'path';

// Configuration
const POSTS_DIR = path.join(process.cwd(), 'posts');
const DRY_RUN = false; // Set to true to preview changes without modifying files

interface CleanupStats {
  filesProcessed: number;
  filesModified: number;
  issuesFixed: {
    preTags: number;
    brTags: number;
    headingSpacing: number;
    quotedBlocks: number;
  };
}

/**
 * Clean markdown content
 */
function cleanMarkdown(content: string): { cleaned: string; changes: string[] } {
  const changes: string[] = [];
  let cleaned = content;

  // 1. Remove <pre></pre> tags
  const preTagCount = (cleaned.match(/<\/?pre>/g) || []).length;
  if (preTagCount > 0) {
    cleaned = cleaned.replace(/<\/?pre>/g, '');
    changes.push(`Removed ${preTagCount} <pre> tags`);
  }

  // 2. Remove <br>, <br/>, <br />, </br> tags
  const brTagCount = (cleaned.match(/<\/?br\s*\/?>/gi) || []).length;
  if (brTagCount > 0) {
    cleaned = cleaned.replace(/<\/?br\s*\/?>/gi, '');
    changes.push(`Removed ${brTagCount} <br> tags`);
  }

  // 3. Fix heading spacing - ensure space after hashtags
  const headingRegex = /^(#{1,6})([^\s#])/gm;
  let headingCount = 0;
  cleaned = cleaned.replace(headingRegex, (match, hashes, firstChar) => {
    headingCount++;
    return `${hashes} ${firstChar}`;
  });
  if (headingCount > 0) {
    changes.push(`Fixed spacing for ${headingCount} headings`);
  }

  // 4. Remove quotation marks from code blocks and highlighted sections
  // Pattern: "```language" or '```language'
  const codeBlockQuoteCount = (cleaned.match(/['"](```[\w]*)/g) || []).length;
  if (codeBlockQuoteCount > 0) {
    cleaned = cleaned.replace(/['"](```[\w]*)/g, '$1');
    cleaned = cleaned.replace(/(```[\w]*)['"]/g, '$1');
    changes.push(`Removed quotes from ${codeBlockQuoteCount} code blocks`);
  }

  // Remove quotation marks from highlighted text blocks (> blockquotes)
  const blockquoteRegex = /^>\s*["'](.+?)["']\s*$/gm;
  let blockquoteCount = 0;
  cleaned = cleaned.replace(blockquoteRegex, (match, content) => {
    blockquoteCount++;
    return `> ${content}`;
  });
  if (blockquoteCount > 0) {
    changes.push(`Removed quotes from ${blockquoteCount} blockquotes`);
  }

  return { cleaned, changes };
}

/**
 * Process a single markdown file
 */
function processMarkdownFile(filePath: string, stats: CleanupStats): void {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { cleaned, changes } = cleanMarkdown(content);

    stats.filesProcessed++;

    if (changes.length > 0) {
      stats.filesModified++;
      
      console.log(`\n📝 ${path.basename(filePath)}`);
      changes.forEach(change => console.log(`  ✓ ${change}`));

      // Count specific issue types
      changes.forEach(change => {
        if (change.includes('<pre>')) stats.issuesFixed.preTags++;
        if (change.includes('<br>')) stats.issuesFixed.brTags++;
        if (change.includes('heading')) stats.issuesFixed.headingSpacing++;
        if (change.includes('quote')) stats.issuesFixed.quotedBlocks++;
      });

      if (!DRY_RUN) {
        fs.writeFileSync(filePath, cleaned, 'utf-8');
      }
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error);
  }
}

/**
 * Get all markdown files in a directory
 */
function getMarkdownFiles(dir: string): string[] {
  const files: string[] = [];
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        files.push(...getMarkdownFiles(fullPath));
      } else if (entry.isFile() && /\.md$/i.test(entry.name)) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`❌ Error reading directory ${dir}:`, error);
  }
  
  return files;
}

/**
 * Main function
 */
function main() {
  console.log('🚀 Markdown Cleanup Script');
  console.log(`📁 Directory: ${POSTS_DIR}`);
  console.log(`🔍 Mode: ${DRY_RUN ? 'DRY RUN (preview only)' : 'LIVE (will modify files)'}\n`);

  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`❌ Posts directory not found: ${POSTS_DIR}`);
    process.exit(1);
  }

  const stats: CleanupStats = {
    filesProcessed: 0,
    filesModified: 0,
    issuesFixed: {
      preTags: 0,
      brTags: 0,
      headingSpacing: 0,
      quotedBlocks: 0,
    },
  };

  const markdownFiles = getMarkdownFiles(POSTS_DIR);
  console.log(`Found ${markdownFiles.length} markdown files\n`);

  markdownFiles.forEach(file => processMarkdownFile(file, stats));

  // Print summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Summary:');
  console.log('='.repeat(50));
  console.log(`Files processed: ${stats.filesProcessed}`);
  console.log(`Files modified: ${stats.filesModified}`);
  console.log('\nIssues fixed:');
  console.log(`  • <pre> tags removed: ${stats.issuesFixed.preTags}`);
  console.log(`  • <br> tags removed: ${stats.issuesFixed.brTags}`);
  console.log(`  • Heading spacing fixed: ${stats.issuesFixed.headingSpacing}`);
  console.log(`  • Quoted blocks cleaned: ${stats.issuesFixed.quotedBlocks}`);
  console.log('='.repeat(50));

  if (DRY_RUN) {
    console.log('\n⚠️  DRY RUN: No files were modified. Set DRY_RUN=false to apply changes.');
  } else {
    console.log('\n✅ All changes have been applied!');
  }
}

// Run the script
main();
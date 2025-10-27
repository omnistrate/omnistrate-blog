const redirects = require('./redirect-mapping.json');

console.log(`Testing ${redirects.length} redirects...\n`);

let passed = 0;
let failed = 0;

async function testRedirect(redirect, index) {
  const url = `http://localhost:3000${redirect.source}`;
  
  try {
    const res = await fetch(url, { redirect: 'manual' });
    
    if (res.status === 308 || res.status === 301) {
      passed++;
      console.log(`✅ [${index + 1}/${redirects.length}] ${redirect.source}`);
    } else {
      failed++;
      console.error(`❌ [${index + 1}/${redirects.length}] ${redirect.source} - Status: ${res.status}`);
    }
  } catch (err) {
    failed++;
    console.error(`❌ [${index + 1}/${redirects.length}] ${redirect.source} - ${err.message}`);
  }
}

async function testAll() {
  for (let i = 0; i < redirects.length; i++) {
    await testRedirect(redirects[i], i);
  }
  
  console.log(`\n✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
}

testAll();
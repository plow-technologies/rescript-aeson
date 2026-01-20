const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'node_modules', '@rescript', 'runtime', 'lib', 'js');
const targetFile = path.join(targetDir, 'package.json');
const content = JSON.stringify({ type: 'commonjs' }, null, 2) + '\n';

try {
  if (fs.existsSync(targetDir)) {
    fs.writeFileSync(targetFile, content);
    console.log('✓ Added package.json to @rescript/runtime/lib/js/');
  } else {
    console.log('⚠ Directory @rescript/runtime/lib/js/ not found, skipping');
  }
} catch (error) {
  console.error('Error creating package.json:', error.message);
  process.exit(0);
}

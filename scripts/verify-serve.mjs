import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const base = '/lorena-cleaning-demo/';
const port = 4187;
const url = `http://127.0.0.1:${port}${base}`;
const mode = process.argv.includes('--dev') ? 'development' : 'production';
const child = spawn(process.execPath, [
  'node_modules/vite/bin/vite.js',
  ...(mode === 'production' ? ['preview'] : []),
  '--host', '127.0.0.1', '--port', String(port), '--strictPort',
], { stdio: ['ignore', 'pipe', 'pipe'] });

let startup = '';
const ready = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => reject(new Error(`Server startup timed out: ${startup}`)), 15000);
  child.stdout.on('data', chunk => {
    startup += chunk;
    if (startup.includes('127.0.0.1')) { clearTimeout(timeout); resolve(); }
  });
  child.stderr.on('data', chunk => { startup += chunk; });
  child.once('error', error => { clearTimeout(timeout); reject(error); });
  child.once('exit', code => { clearTimeout(timeout); reject(new Error(`Server exited (${code}): ${startup}`)); });
});

try {
  await ready;
  const response = await fetch(url);
  assert.equal(response.status, 200, 'Homepage must return 200');
  const html = await response.text();
  assert.match(html, /noindex, nofollow, noarchive/);
  assert.match(html, /lang="en-GB"/);
  assert.match(html, /Lorena Cleaning Services/);
  if (mode === 'production') {
    const files = await readdir('dist', { recursive: true, withFileTypes: true });
    const assets = files.filter(file => file.isFile());
    await Promise.all(assets.map(async file => {
      const full = path.join(file.parentPath, file.name);
      const relative = path.relative('dist', full).split(path.sep).join('/');
      const assetResponse = await fetch(url + relative);
      assert.equal(assetResponse.status, 200, `${relative} must return 200`);
      assert.deepEqual(Buffer.from(await assetResponse.arrayBuffer()), await readFile(full), `${relative} must serve the built file, not an HTML fallback`);
    }));
    console.log(`PASS: production homepage and all ${assets.length} built files served correctly under ${base}`);
  } else {
    const module = await fetch(`${url}src/App.tsx`);
    assert.equal(module.status, 200);
    assert.match(module.headers.get('content-type'), /javascript/);
    console.log('PASS: development homepage and compiled React entry served successfully');
  }
} finally {
  if (child.exitCode === null) {
    child.kill();
    await once(child, 'exit');
  }
}

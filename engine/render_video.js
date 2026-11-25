// usage: node engine/render_video.js <scene.html relative to project> <videoDir> <out.mp4> [--stills t1,t2,...]
const { chromium } = require('playwright'); const http = require('http'); const fs = require('fs');
const path = require('path'); const { spawn } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css',
  '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
(async () => {
  const [scene, vdir, out, flag, list] = process.argv.slice(2);
  const srv = http.createServer((q, r) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0]));
    fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); r.end(d); }); });
  await new Promise(r => srv.listen(0, r)); const port = srv.address().port;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  p.on('console', m => m.type() === 'error' && console.error('page:', m.text()));
  await p.goto(`http://localhost:${port}/${scene}${scene.includes('?')?'&':'?'}v=${vdir.replace(/\/$/,'')}`); await p.evaluate(() => window.init()); await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  const tl = JSON.parse(fs.readFileSync(path.join(vdir, 'timeline.json')));
  if (flag === '--stills') {
    for (const t of list.split(',').map(Number)) { await p.evaluate(t => window.setFrame(t), t); await p.waitForTimeout(60);
      await p.screenshot({ path: `${out}_${t}.jpg`, type: 'jpeg', quality: 85 }); }
  } else {
    const fps = 30, N = Math.round(tl.duration * fps);
    const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(fps), '-i', '-',
      '-i', path.join(vdir, 'mix.wav'), '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18',
      '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '256k', '-ar', '48000', '-shortest', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
    const t0 = Date.now();
    for (let i = 0; i < N; i++) {
      await p.evaluate(t => window.setFrame(t), i / fps);
      const buf = await p.screenshot({ type: 'jpeg', quality: 93 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (i % 300 === 0) console.log(`frame ${i}/${N}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
    console.log('wrote', out);
  }
  await b.close(); srv.close();
})();

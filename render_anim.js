// usage: node render_anim.js <html> <out.mp4> <w> <h> <dur> <fps> [query] [audio.wav]
const { chromium } = require('playwright'); const path = require('path'); const { spawn } = require('child_process');
(async () => {
  const [html, out, w, h, dur, fps, query = '', audio] = process.argv.slice(2);
  const N = Math.round(+dur * +fps);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
  await p.goto('file://' + path.resolve(html) + `?w=${w}&h=${h}&dur=${dur}&${query}`);
  await p.evaluate(() => document.fonts.ready);
  const args = ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', fps, '-i', '-'];
  if (audio) args.push('-i', audio);
  args.push('-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '16', '-preset', 'medium');
  if (audio) args.push('-c:a', 'aac', '-b:a', '256k', '-shortest');
  args.push(out);
  const ff = spawn('ffmpeg', args, { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < N; i++) {
    await p.evaluate((t) => window.setFrame(t), i / +fps);
    const buf = await p.screenshot({ type: 'png' });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close();
  console.log('wrote', out, N, 'frames');
})();

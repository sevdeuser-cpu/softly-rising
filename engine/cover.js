// usage: node engine/cover.js "<scene.html?scenes=..>" <videoDir> <t> <out.png> '<json lines>'
const { chromium } = require('playwright'); const http = require('http'); const fs = require('fs'); const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const MIME = { '.html':'text/html','.js':'text/javascript','.json':'application/json','.woff2':'font/woff2','.png':'image/png','.jpg':'image/jpeg' };
(async () => {
  const [scene, vdir, t, out, lines] = process.argv.slice(2);
  const srv = http.createServer((q, r) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0]));
    fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); r.end(d); }); });
  await new Promise(r => srv.listen(0, r));
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto(`http://localhost:${srv.address().port}/${scene}${scene.includes('?') ? '&' : '?'}v=${vdir}`);
  await p.evaluate(() => window.init()); await p.evaluate(() => document.fonts.ready);
  await p.evaluate(([t, lines, top]) => {
    window.setFrame(+t);
    for (const id of ['cap', 'pbar', 'label']) document.getElementById(id).style.display = 'none';
    const H = document.getElementById('hooktxt');
    H.innerHTML = JSON.parse(lines).map((x, j) => `<div class="${x.startsWith('~') ? 'h2' : 'h1'}">${x.replace(/^~/, '')}</div>`).join('');
    H.style.cssText = 'opacity:1;transform:none;top:' + top + 'px';
    [...H.children].forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; if (el.className === 'h1') el.style.fontSize = '104px'; });
  }, [t, lines, process.env.COVER_TOP || 1270]);
  await p.waitForTimeout(200); await p.screenshot({ path: out }); await b.close(); srv.close();
})();

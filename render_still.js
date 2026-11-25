// usage: node render_still.js <html> <out.png> <w> <h> [transparent]
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const [html, out, w, h, transp] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
  await p.goto('file://' + path.resolve(html));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(150);
  await p.screenshot({ path: out, omitBackground: !!transp });
  await b.close();
})();

import puppeteer from 'puppeteer-core';
import path from 'node:path';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const viewports = [
  { name: '360w-small', width: 360, height: 640 },
  { name: '390w-iphone', width: 390, height: 844 },
  { name: '412w-android', width: 412, height: 915 },
  { name: '430w-pro-max', width: 430, height: 932 },
];

async function run() {
  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots', { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results = [];

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });

    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    // Allow intro animations to settle
    await new Promise((r) => setTimeout(r, 4500));

    // Capture screenshot
    const screenshotPath = `screenshots/hero-${vp.name}.png`;
    await page.screenshot({ path: path.resolve(screenshotPath) });

    // Evaluate metrics
    const metrics = await page.evaluate(() => {
      const hero = document.getElementById('hero');
      const header = document.querySelector('.main-header');
      const btn1 = document.querySelector('.hero-cta-primary');
      const btn2 = document.querySelector('.hero-cta-secondary');
      const statsGrid = document.querySelector('.hero-floating-stats-grid');
      const statPillars = Array.from(document.querySelectorAll('.hero-stat-pillar'));
      const scrollIndicator = document.querySelector('.hero-scroll-indicator');

      const heroRect = hero ? hero.getBoundingClientRect() : null;
      const headerRect = header ? header.getBoundingClientRect() : null;
      const btn1Rect = btn1 ? btn1.getBoundingClientRect() : null;
      const btn2Rect = btn2 ? btn2.getBoundingClientRect() : null;
      const statsRect = statsGrid ? statsGrid.getBoundingClientRect() : null;

      // Rows heights in stats grid
      const row1Pillars = statPillars.slice(0, 2);
      const row2Pillars = statPillars.slice(2, 4);

      const row1Heights = row1Pillars.map((p) => p.getBoundingClientRect().height);
      const row2Heights = row2Pillars.map((p) => p.getBoundingClientRect().height);

      // Gap between btn2 and stats
      const gapBtnToStats = statsRect && btn2Rect ? Math.round(statsRect.top - btn2Rect.bottom) : null;

      // Edges check
      const leftEdges = {
        btn1: btn1Rect ? Math.round(btn1Rect.left) : null,
        btn2: btn2Rect ? Math.round(btn2Rect.left) : null,
        stats: statsRect ? Math.round(statsRect.left) : null,
      };
      const rightEdges = {
        btn1: btn1Rect ? Math.round(btn1Rect.right) : null,
        btn2: btn2Rect ? Math.round(btn2Rect.right) : null,
        stats: statsRect ? Math.round(statsRect.right) : null,
      };
      const widths = {
        btn1: btn1Rect ? Math.round(btn1Rect.width) : null,
        btn2: btn2Rect ? Math.round(btn2Rect.width) : null,
        stats: statsRect ? Math.round(statsRect.width) : null,
      };

      // Check header overlap
      const headline = document.querySelector('.hero-headline');
      const headlineRect = headline ? headline.getBoundingClientRect() : null;
      const headerOverlap = headlineRect && headerRect ? headlineRect.top < headerRect.bottom : false;

      // Horizontal overflow check
      const hasHorizontalOverflow = document.documentElement.scrollWidth > window.innerWidth;

      return {
        leftEdges,
        rightEdges,
        widths,
        gapBtnToStats,
        row1Heights,
        row2Heights,
        headerOverlap,
        hasHorizontalOverflow,
        heroHeight: heroRect ? heroRect.height : null,
        windowHeight: window.innerHeight,
      };
    });

    results.push({ viewport: vp.name, ...metrics, screenshotPath });
    await page.close();
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

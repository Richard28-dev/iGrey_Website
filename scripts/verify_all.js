import puppeteer from 'puppeteer-core';
import path from 'node:path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Capture the IntroLoader screen at ~1.2s to verify text & no side lines
  page.goto('http://localhost:5173/');
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.resolve('screenshots/intro-loader-at-1200ms.png') });
  console.log('Saved intro-loader-at-1200ms.png');

  // 2. Wait for page load and loader to exit
  await new Promise((r) => setTimeout(r, 3000));

  // 3. Capture Hero Stats default state
  const statsGrid = await page.$('.hero-floating-stats-grid');
  if (statsGrid) {
    await statsGrid.screenshot({ path: path.resolve('screenshots/hero-stats-default.png') });
    console.log('Saved hero-stats-default.png');

    // Click on the first stat pillar ("100+ Happy Customers")
    const firstPillar = await page.$('.hero-stat-pillar');
    if (firstPillar) {
      await firstPillar.click();
      await new Promise((r) => setTimeout(r, 600));
      await statsGrid.screenshot({ path: path.resolve('screenshots/hero-stats-clicked-floating.png') });
      console.log('Saved hero-stats-clicked-floating.png');
    }
  }

  // 4. Scroll to Footer and capture
  const footer = await page.$('footer');
  if (footer) {
    await footer.scrollIntoView();
    await new Promise((r) => setTimeout(r, 500));
    await footer.screenshot({ path: path.resolve('screenshots/footer-updated.png') });
    console.log('Saved footer-updated.png');
  }

  await browser.close();
}

main().catch(console.error);

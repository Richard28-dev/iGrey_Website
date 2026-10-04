import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOT_DIR = path.resolve(process.cwd(), 'screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function capture() {
  console.log('Launching Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // 1. Desktop full screenshot
    console.log('Capturing Desktop Screenshot (1440px)...');
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 });

    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    // Wait for IntroLoader (2.2s + 0.9s exit animation) to dismiss
    await new Promise(r => setTimeout(r, 3500));

    // Scroll through page to trigger whileInView animations
    await page.evaluate(async () => {
      const distance = 500;
      const delay = 80;
      while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
        document.scrollingElement.scrollBy(0, distance);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      document.scrollingElement.scrollTo(0, 0);
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    const desktopPath = path.join(SCREENSHOT_DIR, 'desktop-full.png');
    await page.screenshot({ path: desktopPath, fullPage: true });
    console.log('Saved:', desktopPath);

    // 2. Mobile full screenshot
    console.log('Capturing Mobile Screenshot (390px)...');
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 });

    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    await new Promise(r => setTimeout(r, 3500));
    await page.evaluate(async () => {
      const distance = 500;
      const delay = 80;
      while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
        document.scrollingElement.scrollBy(0, distance);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      document.scrollingElement.scrollTo(0, 0);
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    const mobilePath = path.join(SCREENSHOT_DIR, 'mobile-full.png');
    await page.screenshot({ path: mobilePath, fullPage: true });
    console.log('Saved:', mobilePath);

  } finally {
    await browser.close();
  }
}

capture().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});

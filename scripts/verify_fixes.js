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

  // 1. Capture the IntroLoader screen during initial animation (around 800ms)
  page.goto('http://localhost:5173/');
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: path.resolve('screenshots/intro-loader-fixed.png') });
  console.log('Saved intro-loader-fixed.png');

  // 2. Wait for IntroLoader to finish and scroll to FAQ section
  await new Promise((r) => setTimeout(r, 3000));
  const faqEl = await page.$('#faq');
  if (faqEl) {
    await faqEl.screenshot({ path: path.resolve('screenshots/faq-closed-fixed.png') });
    console.log('Saved faq-closed-fixed.png');
  }

  await browser.close();
}

main().catch(console.error);

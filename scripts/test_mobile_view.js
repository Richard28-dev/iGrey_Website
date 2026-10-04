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
  // Standard mobile phone viewport: 390x844 (iPhone 12/13/14) and 412x915 (Android)
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

  await page.goto('http://localhost:5173/');
  // Wait for loader to fully finish and slide out
  await new Promise((r) => setTimeout(r, 4200));

  // Screenshot 1: Mobile Hero View (the exact view the user photographed)
  await page.screenshot({ path: path.resolve('screenshots/mobile-hero-fixed.png') });
  console.log('Saved mobile-hero-fixed.png');

  // Screenshot 2: Scroll down to About section
  const about = await page.$('#about');
  if (about) {
    await about.scrollIntoView();
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.resolve('screenshots/mobile-about.png') });
    console.log('Saved mobile-about.png');
  }

  // Screenshot 3: Scroll down to Properties section
  const prop = await page.$('#properties');
  if (prop) {
    await prop.scrollIntoView();
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.resolve('screenshots/mobile-properties.png') });
    console.log('Saved mobile-properties.png');
  }

  // Screenshot 4: Scroll down to FAQ section
  const faq = await page.$('#faq');
  if (faq) {
    await faq.scrollIntoView();
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.resolve('screenshots/mobile-faq.png') });
    console.log('Saved mobile-faq.png');
  }

  // Screenshot 5: Scroll down to Footer
  const footer = await page.$('footer');
  if (footer) {
    await footer.scrollIntoView();
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.resolve('screenshots/mobile-footer.png') });
    console.log('Saved mobile-footer.png');
  }

  await browser.close();
}

main().catch(console.error);

import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,1200']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1800, deviceScaleFactor: 2 });
  
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    // Hide header sticky nav for clean section screenshot
    const header = document.querySelector('header');
    if (header) header.style.display = 'none';
    const propertiesEl = document.getElementById('properties');
    if (propertiesEl) propertiesEl.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 2500));

  const propertiesSection = await page.$('#properties');
  if (propertiesSection) {
    const desktopPath = path.resolve('C:\\Users\\Richard R\\.gemini\\antigravity-ide\\brain\\c3f3b9f4-ebbe-4abd-95c2-c82addfc5109\\properties_desktop.png');
    await propertiesSection.screenshot({ path: desktopPath });
    console.log('Saved desktop screenshot:', desktopPath);
  }

  // Mobile viewport
  await page.setViewport({ width: 390, height: 1200, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3500));
  await page.evaluate(() => {
    const header = document.querySelector('header');
    if (header) header.style.display = 'none';
    const propertiesEl = document.getElementById('properties');
    if (propertiesEl) propertiesEl.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 500));
  const mobileProps = await page.$('#properties');
  if (mobileProps) {
    const mobilePath = path.resolve('C:\\Users\\Richard R\\.gemini\\antigravity-ide\\brain\\c3f3b9f4-ebbe-4abd-95c2-c82addfc5109\\properties_mobile.png');
    await mobileProps.screenshot({ path: mobilePath });
    console.log('Saved mobile screenshot:', mobilePath);
  }

  await browser.close();
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});

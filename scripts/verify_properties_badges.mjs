import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--window-size=1440,1200']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3200));

  // Scroll to properties section
  await page.evaluate(() => {
    const el = document.getElementById('properties');
    if (el) el.scrollIntoView({ behavior: 'instant' });
    window.dispatchEvent(new Event('scroll'));
  });
  await new Promise(r => setTimeout(r, 1000));

  // Wait for images to load
  await page.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll('.property-card-img'));
    await Promise.all(
      imgs.map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete && img.naturalWidth > 0) return resolve();
            img.addEventListener('load', resolve);
            img.addEventListener('error', resolve);
            setTimeout(resolve, 3000);
          })
      )
    );
  });
  await new Promise(r => setTimeout(r, 500));

  // Screenshot full viewport showing header + properties section
  const fullViewPath = path.resolve('C:\\Users\\Richard R\\.gemini\\antigravity-ide\\brain\\c3f3b9f4-ebbe-4abd-95c2-c82addfc5109\\navbar_and_properties.png');
  await page.screenshot({ path: fullViewPath });
  console.log('Saved navbar_and_properties:', fullViewPath);

  // Screenshot specifically the cards showing the badges
  const grid = await page.$('.property-cards-grid');
  if (grid) {
    const badgesPath = path.resolve('C:\\Users\\Richard R\\.gemini\\antigravity-ide\\brain\\c3f3b9f4-ebbe-4abd-95c2-c82addfc5109\\property_card_badges.png');
    await grid.screenshot({ path: badgesPath });
    console.log('Saved property_card_badges:', badgesPath);
  }

  await browser.close();
}

capture().catch(console.error);

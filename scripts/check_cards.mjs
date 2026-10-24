import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function check() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1200 });
  await page.goto('http://localhost:5173/#properties', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  const cards = await page.$$eval('.property-card', els => els.map(el => ({
    title: el.querySelector('.property-card-title')?.textContent?.trim(),
    opacity: window.getComputedStyle(el).opacity,
    visibility: window.getComputedStyle(el).visibility,
    display: window.getComputedStyle(el).display,
    width: el.offsetWidth,
    height: el.offsetHeight,
    imgSrc: el.querySelector('img')?.src
  })));

  console.log('Total property-card elements in DOM:', cards.length);
  console.log(JSON.stringify(cards, null, 2));

  await browser.close();
}

check().catch(console.error);

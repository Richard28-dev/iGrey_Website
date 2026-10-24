import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  
  // Wait for intro loader to finish and remove it
  await page.evaluate(() => {
    const loader = document.querySelector('.intro-loader');
    if (loader) loader.remove();
    const header = document.querySelector('header');
    if (header) header.style.display = 'none';
  });

  await new Promise(r => setTimeout(r, 2000));

  await page.evaluate(() => {
    const props = document.getElementById('properties');
    if (props) props.scrollIntoView();
  });

  await new Promise(r => setTimeout(r, 1000));

  const propertiesSection = await page.$('#properties');
  if (propertiesSection) {
    const mobilePath = path.resolve('C:\\Users\\Richard R\\.gemini\\antigravity-ide\\brain\\c3f3b9f4-ebbe-4abd-95c2-c82addfc5109\\properties_mobile_section.png');
    await propertiesSection.screenshot({ path: mobilePath });
    console.log('Saved mobile section screenshot:', mobilePath);
  }

  await browser.close();
}

capture().catch(console.error);

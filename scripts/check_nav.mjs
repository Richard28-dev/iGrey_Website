import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function checkNav() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3200));

  await page.evaluate(() => {
    const el = document.getElementById('properties');
    if (el) el.scrollIntoView({ behavior: 'instant' });
    window.dispatchEvent(new Event('scroll'));
  });
  await new Promise(r => setTimeout(r, 500));

  const result = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('.header-desktop-nav a')).map(a => ({
      text: a.textContent.trim(),
      href: a.getAttribute('href'),
      color: window.getComputedStyle(a).color,
      html: a.innerHTML
    }));
    return {
      scrollY: window.scrollY,
      propertiesRect: document.getElementById('properties')?.getBoundingClientRect(),
      links
    };
  });
  console.log('Result:', JSON.stringify(result, null, 2));
  await browser.close();
}

checkNav().catch(console.error);

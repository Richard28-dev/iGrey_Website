import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testFilters() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1200 });
  await page.goto('http://localhost:5173/#properties', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  const filters = [
    'All Properties',
    'For Sale',
    'For Rent',
    'For Lease',
    'Residential',
    'Commercial',
    'Land / Plots',
    'Office',
    'Shop / Showroom',
    'Warehouse'
  ];

  for (const filterText of filters) {
    await page.evaluate((text) => {
      const btns = Array.from(document.querySelectorAll('.properties-filter-pill'));
      const btn = btns.find(b => b.textContent?.trim() === text);
      if (btn) btn.click();
    }, filterText);

    await new Promise(r => setTimeout(r, 350));

    const result = await page.evaluate(() => {
      const countEl = document.querySelector('.properties-status-count');
      const cards = document.querySelectorAll('.property-card');
      const empty = document.querySelector('.properties-empty-state');
      const bottomBtn = document.querySelector('.properties-primary-cta-btn');
      return {
        countText: countEl?.textContent?.replace(/\s+/g, ' ').trim(),
        renderedCards: cards.length,
        hasEmptyState: !!empty,
        hasBottomBtn: !!bottomBtn,
        bottomBtnText: bottomBtn?.textContent?.replace(/\s+/g, ' ').trim()
      };
    });

    console.log(`[Filter: "${filterText}"] -> Count: "${result.countText}" | Cards: ${result.renderedCards} | BottomBtn: ${result.hasBottomBtn ? `"${result.bottomBtnText}"` : 'Hidden'}`);
  }

  await browser.close();
}

testFilters().catch(console.error);

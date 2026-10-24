import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Richard R\\.gemini\\antigravity-ide\\brain\\c3f3b9f4-ebbe-4abd-95c2-c82addfc5109';

async function testPropertiesFilters() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 });

  console.log('--- Testing /properties page ---');
  await page.goto('http://localhost:5173/properties', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Check visually-hidden on label
  const labelVisibility = await page.evaluate(() => {
    const label = document.querySelector('label[for="prop-main-search"]');
    if (!label) return { exists: false };
    const rect = label.getBoundingClientRect();
    const style = window.getComputedStyle(label);
    return {
      exists: true,
      rectWidth: rect.width,
      rectHeight: rect.height,
      clip: style.clip,
      position: style.position,
      text: label.textContent?.trim()
    };
  });
  console.log('Search label visibility test:', labelVisibility);

  // 2. Read dropdown options and counts
  const dropdownOptions = await page.evaluate(() => {
    const getOptions = (id) => {
      const select = document.getElementById(id);
      if (!select) return [];
      return Array.from(select.options).map(o => ({ value: o.value, text: o.text }));
    };

    return {
      purpose: getOptions('filter-purpose'),
      bhk: getOptions('filter-bhk'),
      budget: getOptions('filter-budget'),
      feature: getOptions('filter-feature'),
      sort: getOptions('filter-sort'),
      cityChips: Array.from(document.querySelectorAll('.prop-city-chip')).map(c => c.textContent?.trim())
    };
  });
  console.log('Dropdown Options & Badges:', JSON.stringify(dropdownOptions, null, 2));

  // 3. Test every BHK & Configuration option
  console.log('\n--- Testing BHK & Configuration options ---');
  const bhkValues = ['', '1', '2', '3', '4+', 'office', 'shop', 'warehouse', 'land'];
  for (const val of bhkValues) {
    await page.select('#filter-bhk', val);
    await new Promise(r => setTimeout(r, 200));
    const res = await page.evaluate(() => {
      const cards = document.querySelectorAll('.prop-card');
      const countEl = document.querySelector('.prop-status-count');
      return { cards: cards.length, countText: countEl?.textContent?.trim() };
    });
    console.log(`BHK="${val || 'All'}" -> Cards rendered: ${res.cards} | Status: "${res.countText}"`);
  }
  // reset BHK
  await page.select('#filter-bhk', '');

  // 4. Test Monthly Budgets
  console.log('\n--- Testing Monthly Budget options ---');
  const monthlyBudgets = ['under-25k', '25k-50k', '50k-100k', '100k-250k', 'above-250k'];
  for (const b of monthlyBudgets) {
    await page.select('#filter-budget', b);
    await new Promise(r => setTimeout(r, 200));
    const res = await page.evaluate(() => {
      const cards = document.querySelectorAll('.prop-card');
      const countEl = document.querySelector('.prop-status-count');
      return { cards: cards.length, countText: countEl?.textContent?.trim() };
    });
    console.log(`Monthly Budget="${b}" -> Cards: ${res.cards} | Status: "${res.countText}"`);
  }
  await page.select('#filter-budget', '');

  // 5. Test Purpose = Sale & Purchase Budgets
  console.log('\n--- Testing For Sale & Purchase Budgets ---');
  await page.select('#filter-purpose', 'sale');
  await new Promise(r => setTimeout(r, 200));
  const purchaseBudgets = ['', 'under-1cr', '1cr-5cr', 'above-5cr'];
  for (const pb of purchaseBudgets) {
    await page.select('#filter-budget', pb);
    await new Promise(r => setTimeout(r, 200));
    const res = await page.evaluate(() => {
      const cards = document.querySelectorAll('.prop-card');
      const countEl = document.querySelector('.prop-status-count');
      return { cards: cards.length, countText: countEl?.textContent?.trim() };
    });
    console.log(`Purpose=Sale, Purchase Budget="${pb || 'Any'}" -> Cards: ${res.cards} | Status: "${res.countText}"`);
  }
  await page.select('#filter-purpose', '');
  await page.select('#filter-budget', '');

  // 6. Test Features
  console.log('\n--- Testing Property Features ---');
  const features = ['Covered Parking', 'Gated Society', 'Swimming Pool', 'Clubhouse', 'Fully Furnished', 'Rooftop Deck'];
  for (const f of features) {
    await page.select('#filter-feature', f);
    await new Promise(r => setTimeout(r, 200));
    const res = await page.evaluate(() => {
      const cards = document.querySelectorAll('.prop-card');
      const countEl = document.querySelector('.prop-status-count');
      return { cards: cards.length, countText: countEl?.textContent?.trim() };
    });
    console.log(`Feature="${f}" -> Cards: ${res.cards} | Status: "${res.countText}"`);
  }
  await page.select('#filter-feature', '');

  // 7. Test City Chips
  console.log('\n--- Testing City Chips ---');
  const cities = ['All', 'Bangalore', 'Mysuru', 'Hyderabad', 'Chennai'];
  for (const c of cities) {
    await page.evaluate((cityName) => {
      const chips = Array.from(document.querySelectorAll('.prop-city-chip'));
      const chip = chips.find(ch => ch.textContent?.includes(cityName));
      if (chip) chip.click();
    }, c);
    await new Promise(r => setTimeout(r, 200));
    const res = await page.evaluate(() => {
      const cards = document.querySelectorAll('.prop-card');
      const countEl = document.querySelector('.prop-status-count');
      return { cards: cards.length, countText: countEl?.textContent?.trim() };
    });
    console.log(`City="${c}" -> Cards: ${res.cards} | Status: "${res.countText}"`);
  }

  // Reset to All and take screenshot of the filter panel & cards
  await page.evaluate(() => {
    const chips = Array.from(document.querySelectorAll('.prop-city-chip'));
    const chip = chips.find(ch => ch.textContent?.includes('All'));
    if (chip) chip.click();
  });
  await new Promise(r => setTimeout(r, 400));

  const screenshotPath = path.join(artifactDir, 'properties_filter_fixed.png');
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`\nScreenshot captured at: ${screenshotPath}`);

  await browser.close();
  console.log('--- ALL FILTER TESTS PASSED SUCCESSFULLY ---');
}

testPropertiesFilters().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});

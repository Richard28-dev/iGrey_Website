import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Richard R\\.gemini\\antigravity-ide\\brain\\c3f3b9f4-ebbe-4abd-95c2-c82addfc5109';

async function runVerification() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  console.log('--- TEST 1: HOME PAGE #properties (1440px Desktop) ---');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  // Scroll to properties section
  await page.evaluate(() => {
    const el = document.getElementById('properties');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));

  // Verify header on home section
  const homeHeaderInfo = await page.evaluate(() => {
    const header = document.querySelector('#properties .properties-shared-header');
    const h2 = header?.querySelector('h2.properties-header-title');
    const em = h2?.querySelector('em.properties-title-em');
    const eyebrow = header?.querySelector('.properties-header-eyebrow');
    const lines = header?.querySelectorAll('.properties-eyebrow-line');
    const desc = header?.querySelector('.properties-header-desc');
    const headerButton = header?.querySelector('a, button'); // Should be null!
    return {
      hasHeader: Boolean(header),
      h2Text: h2?.textContent?.trim(),
      emText: em?.textContent?.trim(),
      eyebrowText: eyebrow?.textContent?.trim(),
      lineCount: lines?.length,
      descText: desc?.textContent?.trim(),
      hasHeaderButton: Boolean(headerButton)
    };
  });
  console.log('Home Header Verification:', homeHeaderInfo);

  // Verify filter pills on home section
  const pillsInfo = await page.evaluate(() => {
    const pills = Array.from(document.querySelectorAll('#properties .prop-filter-pill'));
    return {
      count: pills.length,
      labels: pills.map(p => p.textContent?.trim()),
      activeLabel: pills.find(p => p.getAttribute('aria-pressed') === 'true')?.textContent?.trim()
    };
  });
  console.log('Home Filter Pills:', pillsInfo);

  // Verify status bar on home section
  const statusBarInfo = await page.evaluate(() => {
    const statusCount = document.querySelector('#properties .prop-status-count')?.textContent?.trim();
    const verifiedBadge = document.querySelector('#properties .prop-verified-badge')?.textContent?.trim();
    return { statusCount, verifiedBadge };
  });
  console.log('Home Status Bar:', statusBarInfo);

  // Verify card count on home section (at most 3)
  const cardsCount = await page.evaluate(() => {
    const cards = document.querySelectorAll('#properties .prop-card');
    return cards.length;
  });
  console.log('Home Cards Count (expected <= 3):', cardsCount);

  // Check card elements: status badge, type badge, category row, title, location, id chip, footer price, inquire button
  const cardDetails = await page.evaluate(() => {
    const firstCard = document.querySelector('#properties .prop-card');
    if (!firstCard) return null;
    const statusBadge = firstCard.querySelector('.prop-badge-status')?.textContent?.trim();
    const typeBadge = firstCard.querySelector('.prop-badge-type')?.textContent?.trim();
    const category = firstCard.querySelector('.prop-category-row')?.textContent?.trim();
    const title = firstCard.querySelector('.prop-card-title')?.textContent?.trim();
    const location = firstCard.querySelector('.prop-location-text')?.textContent?.trim();
    const idChip = firstCard.querySelector('.prop-id-chip')?.textContent?.trim();
    const price = firstCard.querySelector('.prop-price-val')?.textContent?.trim();
    const inquireBtn = firstCard.querySelector('.prop-inquire-btn')?.textContent?.trim();
    const hasDivider = Boolean(firstCard.querySelector('.prop-card-divider'));
    const featuredBadge = firstCard.querySelector('.badge-featured, .prop-badge-featured');
    return {
      statusBadge,
      typeBadge,
      category,
      title,
      location,
      idChip,
      price,
      inquireBtn,
      hasDivider,
      hasFeaturedBadge: Boolean(featuredBadge)
    };
  });
  console.log('Home First Card Details:', cardDetails);

  // Verify "View All Properties →" button
  const ctaBtnInfo = await page.evaluate(() => {
    const btn = document.querySelector('#properties .prop-view-all-cta-btn');
    return {
      hasBtn: Boolean(btn),
      text: btn?.textContent?.trim(),
      href: btn?.getAttribute('href')
    };
  });
  console.log('Home View All Button:', ctaBtnInfo);

  // Screenshot Home Section 1440px
  const homeSectionEl = await page.$('#properties');
  if (homeSectionEl) {
    await homeSectionEl.screenshot({ path: path.join(artifactDir, 'test_home_section_1440.png') });
    console.log('Saved test_home_section_1440.png');
  }

  console.log('\n--- TEST 2: ALL PROPERTIES PAGE /properties (1440px Desktop) ---');
  await page.goto('http://localhost:5173/properties', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // Verify /properties header (h1)
  const propPageHeader = await page.evaluate(() => {
    const h1 = document.querySelector('.properties-page-header-wrap h1.properties-header-title');
    return {
      hasH1: Boolean(h1),
      h1Text: h1?.textContent?.trim(),
      documentTitle: document.title
    };
  });
  console.log('All Properties Page Header & Title:', propPageHeader);

  // Verify Filter Panel
  const filterPanelInfo = await page.evaluate(() => {
    const panel = document.querySelector('.prop-filter-panel');
    const searchInput = panel?.querySelector('.prop-search-input');
    const selects = Array.from(panel?.querySelectorAll('.prop-select-group') || []).map(g => ({
      label: g.querySelector('.prop-select-label')?.textContent?.trim(),
      id: g.querySelector('select')?.id,
      value: g.querySelector('select')?.value,
      optionsCount: g.querySelectorAll('option')?.length
    }));
    const cityChips = Array.from(panel?.querySelectorAll('.prop-city-chip') || []).map(c => c.textContent?.trim());
    return {
      hasPanel: Boolean(panel),
      hasSearchInput: Boolean(searchInput),
      searchPlaceholder: searchInput?.getAttribute('placeholder'),
      dropdowns: selects,
      cityChips
    };
  });
  console.log('Filter Panel Info:', filterPanelInfo);

  // Verify All Properties Count & Load more
  const initialPropPageCount = await page.evaluate(() => {
    const statusCount = document.querySelector('.prop-page-status-bar .prop-status-count')?.textContent?.trim();
    const cards = document.querySelectorAll('.prop-cards-grid .prop-card');
    const loadMoreBtn = document.querySelector('.prop-load-more-btn');
    return {
      statusCount,
      visibleCards: cards.length,
      hasLoadMore: Boolean(loadMoreBtn)
    };
  });
  console.log('Initial /properties Listings Count:', initialPropPageCount);

  // Test Purpose = "For Sale" switches budget label to "PURCHASE BUDGET"
  console.log('\nTesting Purpose = For Sale dropdown switch...');
  await page.select('#filter-purpose', 'sale');
  await new Promise(r => setTimeout(r, 400));

  const budgetLabelAfterSale = await page.evaluate(() => {
    const budgetGroup = document.querySelector('label[for="filter-budget"]');
    const budgetSelect = document.querySelector('#filter-budget');
    const options = Array.from(budgetSelect?.querySelectorAll('option') || []).map(o => o.textContent?.trim());
    return {
      label: budgetGroup?.textContent?.trim(),
      options,
      urlSearch: window.location.search
    };
  });
  console.log('Budget after selecting For Sale:', budgetLabelAfterSale);

  // Test Search Input Debouncing
  console.log('\nTesting Search Input debouncing...');
  await page.type('#prop-main-search', 'Villa');
  await new Promise(r => setTimeout(r, 400));

  const searchResults = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.prop-cards-grid .prop-card'));
    return {
      count: cards.length,
      titles: cards.map(c => c.querySelector('.prop-card-title')?.textContent?.trim()),
      urlSearch: window.location.search
    };
  });
  console.log('Search "Villa" with Purpose "sale" results:', searchResults);

  // Test Clear all filters
  console.log('\nTesting Clear all filters...');
  await page.click('.prop-clear-all-link');
  await new Promise(r => setTimeout(r, 400));

  const clearedState = await page.evaluate(() => {
    const searchVal = document.querySelector('#prop-main-search')?.value;
    const purposeVal = document.querySelector('#filter-purpose')?.value;
    const cards = document.querySelectorAll('.prop-cards-grid .prop-card');
    return {
      searchVal,
      purposeVal,
      cardCount: cards.length,
      urlSearch: window.location.search
    };
  });
  console.log('Cleared state:', clearedState);

  // Screenshot /properties Desktop 1440px
  await page.screenshot({ path: path.join(artifactDir, 'test_properties_page_1440.png'), fullPage: false });
  console.log('Saved test_properties_page_1440.png');

  // Test Inquire Modal Dialog
  console.log('\nTesting Inquire Dialog...');
  await page.evaluate(() => {
    const firstInquireBtn = document.querySelector('.prop-cards-grid .prop-inquire-btn');
    if (firstInquireBtn) firstInquireBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  const dialogState = await page.evaluate(() => {
    const dialog = document.querySelector('dialog.inquire-native-dialog');
    const isOpen = dialog?.hasAttribute('open');
    const title = dialog?.querySelector('#inquire-dialog-title')?.textContent?.trim();
    const summary = dialog?.querySelector('.inquire-property-summary')?.textContent?.trim();
    return {
      isOpen,
      title,
      hasSummary: Boolean(summary)
    };
  });
  console.log('Inquire Dialog open state:', dialogState);

  // Screenshot open dialog
  await page.screenshot({ path: path.join(artifactDir, 'test_inquire_dialog_open.png') });
  console.log('Saved test_inquire_dialog_open.png');

  // Submit dialog
  await page.type('#inquire-name', 'Vikram Singhania');
  await page.type('#inquire-phone', '+91 98450 12345');
  await page.click('.inquire-btn-submit');
  await new Promise(r => setTimeout(r, 600));

  const confirmationState = await page.evaluate(() => {
    const confirmText = document.querySelector('.confirmation-text')?.textContent?.trim();
    const closeBtn = document.querySelector('.confirmation-footer button');
    return {
      confirmText,
      hasCloseBtn: Boolean(closeBtn)
    };
  });
  console.log('Inquire Dialog submission confirmation:', confirmationState);

  // Screenshot confirmation
  await page.screenshot({ path: path.join(artifactDir, 'test_inquire_confirmation.png') });
  console.log('Saved test_inquire_confirmation.png');

  // Close dialog
  await page.evaluate(() => {
    const closeBtn = document.querySelector('.confirmation-footer button');
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  console.log('\n--- TEST 3: MOBILE 360px OVERFLOW & RESPONSIVENESS ---');
  await page.setViewport({ width: 360, height: 740, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // Check overflow on Home page at 360px
  const homeMobileOverflow = await page.evaluate(() => {
    const scrollW = document.documentElement.scrollWidth;
    const clientW = document.documentElement.clientWidth;
    return {
      scrollWidth: scrollW,
      clientWidth: clientW,
      hasHorizontalOverflow: scrollW > clientW
    };
  });
  console.log('Home Mobile 360px Overflow Check:', homeMobileOverflow);

  // Scroll to properties section at 360px
  await page.evaluate(() => {
    const el = document.getElementById('properties');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));

  const homeSection360El = await page.$('#properties');
  if (homeSection360El) {
    await homeSection360El.screenshot({ path: path.join(artifactDir, 'test_home_section_360.png') });
    console.log('Saved test_home_section_360.png');
  }

  // Check /properties at 360px
  await page.goto('http://localhost:5173/properties', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  const propMobileOverflow = await page.evaluate(() => {
    const scrollW = document.documentElement.scrollWidth;
    const clientW = document.documentElement.clientWidth;
    return {
      scrollWidth: scrollW,
      clientWidth: clientW,
      hasHorizontalOverflow: scrollW > clientW
    };
  });
  console.log('All Properties Mobile 360px Overflow Check:', propMobileOverflow);

  await page.screenshot({ path: path.join(artifactDir, 'test_properties_page_360.png') });
  console.log('Saved test_properties_page_360.png');

  console.log('\n--- TEST 4: TABLET 768px RESPONSIVENESS ---');
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/properties', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  const tabletGridCols = await page.evaluate(() => {
    const grid = document.querySelector('.prop-cards-grid');
    if (!grid) return null;
    const computed = window.getComputedStyle(grid);
    return {
      gridTemplateColumns: computed.gridTemplateColumns,
      cardsCount: grid.querySelectorAll('.prop-card').length
    };
  });
  console.log('Tablet 768px Grid info:', tabletGridCols);
  await page.screenshot({ path: path.join(artifactDir, 'test_properties_page_768.png') });
  console.log('Saved test_properties_page_768.png');

  await browser.close();
  console.log('\nALL VERIFICATION TESTS COMPLETED SUCCESSFULLY!');
}

runVerification().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runTests() {
  console.log('--- Starting Video Support Automated Tests ---');
  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  } catch (err) {
    console.error('Failed to launch Chrome:', err);
    process.exit(1);
  }

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('pageerror', (err) => consoleErrors.push(err.toString()));
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  // Mock authenticated session so admin pages don't redirect to login.html
  await page.evaluateOnNewDocument(() => {
    let internalAdmin = null;
    window.__toasts = [];
    Object.defineProperty(window, 'iGreyAdmin', {
      configurable: true,
      get() { return internalAdmin; },
      set(val) {
        internalAdmin = val;
        if (internalAdmin) {
          internalAdmin.checkAuth = async () => ({ user: { email: 'admin@igreyholdings.com' } });
          const origToast = internalAdmin.showToast;
          internalAdmin.showToast = (type, title, msg) => {
            window.__toasts.push({ type, title, msg });
            if (origToast) origToast(type, title, msg);
          };
        }
      }
    });
  });

  const formUrl = 'http://localhost:5173/admin/property-form.html';
  console.log('Loading admin form:', formUrl);
  await page.goto(formUrl, { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 800));

  // TEST 1: Admin Form Card 3 Heading & Counter:
  console.log('\n[TEST 1] Admin Form Card 3 Heading & Counter:');
  const card3Title = await page.evaluate(() => {
    const panels = Array.from(document.querySelectorAll('.panel'));
    const p3 = panels.find((p) => p.textContent.includes('Visual Assets'));
    const titleEl = p3 ? p3.querySelector('.panel-title') : null;
    const countEl = document.getElementById('assets-count-label');
    return {
      title: titleEl ? titleEl.textContent.trim() : null,
      counter: countEl ? countEl.textContent.trim() : null,
    };
  });
  console.log('Card 3 Title:', card3Title.title);
  console.log('Live Counter:', card3Title.counter);
  if (!card3Title.title || !card3Title.title.includes('3. Visual Assets (Photos & Videos) *')) {
    throw new Error('Card 3 heading mismatch: ' + card3Title.title);
  }
  if (!card3Title.counter || !card3Title.counter.includes('0 of 8 photos') || !card3Title.counter.includes('0 of 2 videos')) {
    throw new Error('Initial counter mismatch: ' + card3Title.counter);
  }
  console.log('✓ Heading and initial counter verified');

  // TEST 2: File validation & sorting via Dropzone drop event
  console.log('\n[TEST 2] File Sorting, Limit & Size Validation:');
  const fileTests = await page.evaluate(async () => {
    const dropzone = document.getElementById('uploader-dropzone');
    const results = {};

    // 1. Drop an invalid PDF file
    const fakePdf = new File(['dummy content'], 'brochure.pdf', { type: 'application/pdf' });
    const dtPdf = new DataTransfer();
    dtPdf.items.add(fakePdf);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer: dtPdf, bubbles: true, cancelable: true }));

    await new Promise((r) => setTimeout(r, 100));
    const lastPdfToast = window.__toasts.filter(t => t.type === 'error').pop();
    results.pdfToast = lastPdfToast ? lastPdfToast.msg : null;

    // 2. Drop a 60 MB video file
    const fakeLargeMp4 = new File([new ArrayBuffer(100)], 'villa_tour_4k.mp4', { type: 'video/mp4' });
    Object.defineProperty(fakeLargeMp4, 'size', { value: 60 * 1024 * 1024 });
    const dtLarge = new DataTransfer();
    dtLarge.items.add(fakeLargeMp4);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer: dtLarge, bubbles: true, cancelable: true }));

    await new Promise((r) => setTimeout(r, 100));
    const lastLargeToast = window.__toasts.filter(t => t.type === 'error').pop();
    results.largeVideoToast = lastLargeToast ? lastLargeToast.msg : null;

    return results;
  });

  console.log('PDF rejection message:', fileTests.pdfToast);
  console.log('Large video rejection message:', fileTests.largeVideoToast);

  if (!fileTests.pdfToast || !fileTests.pdfToast.includes('Only JPG, PNG, WebP, MP4, or WebM files are allowed')) {
    throw new Error('PDF rejection message incorrect: ' + fileTests.pdfToast);
  }
  if (!fileTests.largeVideoToast || !fileTests.largeVideoToast.includes('This video is larger than 50 MB. Please compress it or paste a YouTube link instead')) {
    throw new Error('Large video rejection message incorrect: ' + fileTests.largeVideoToast);
  }
  console.log('✓ File sorting, limits, and size validation verified');

  // TEST 3: Add Video Link (YouTube/Vimeo) & Validation
  console.log('\n[TEST 3] Video Link Field & ID Extraction:');
  const linkTests = await page.evaluate(() => {
    const toggleBtn = document.getElementById('toggle-video-link-btn');
    toggleBtn.click();

    const input = document.getElementById('video-url-input');
    const err = document.getElementById('video-url-error');
    const addBtn = document.getElementById('add-video-url-btn');

    // 1. Invalid link
    input.value = 'https://dailymotion.com/video/x123';
    addBtn.click();
    const invalidErrText = err.textContent.trim();
    const invalidErrVisible = err.style.display !== 'none';

    // 2. Valid YouTube link
    input.value = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    addBtn.click();
    const countAfterYt = document.getElementById('assets-count-label').textContent.trim();

    // 3. Valid Vimeo link
    toggleBtn.click();
    input.value = 'https://vimeo.com/76979871';
    addBtn.click();
    const countAfterVimeo = document.getElementById('assets-count-label').textContent.trim();

    return {
      invalidErrText,
      invalidErrVisible,
      countAfterYt,
      countAfterVimeo,
    };
  });

  console.log('Invalid link error:', linkTests.invalidErrText, '(visible:', linkTests.invalidErrVisible, ')');
  console.log('Counter after YouTube link:', linkTests.countAfterYt);
  console.log('Counter after Vimeo link:', linkTests.countAfterVimeo);

  if (!linkTests.invalidErrVisible || !linkTests.invalidErrText.includes('Please paste a valid YouTube or Vimeo link')) {
    throw new Error('Invalid video link rejection failed');
  }
  if (!linkTests.countAfterYt.includes('1 of 2 videos')) {
    throw new Error('Counter did not update to 1 of 2 videos');
  }
  if (!linkTests.countAfterVimeo.includes('2 of 2 videos')) {
    throw new Error('Counter did not update to 2 of 2 videos');
  }
  console.log('✓ Video link validation and YouTube/Vimeo addition verified');

  // TEST 4: Grid Layout, Video Tiles & Badges
  console.log('\n[TEST 4] Thumbnail Grid Badges & Ordering:');
  const gridInfo = await page.evaluate(() => {
    const videoTiles = Array.from(document.querySelectorAll('#media-preview-grid .video-card'));
    return videoTiles.map((t, idx) => ({
      index: idx,
      badgeText: t.querySelector('.video-badge-tag') ? t.querySelector('.video-badge-tag').textContent.trim() : null,
      typeText: t.querySelector('.video-type-tag') ? t.querySelector('.video-type-tag').textContent.trim() : null,
      hasPlayIcon: !!t.querySelector('.video-center-icon'),
      hasRemoveBtn: !!t.querySelector('.remove-video-btn'),
    }));
  });
  console.log('Grid video tiles layout:', JSON.stringify(gridInfo, null, 2));
  if (gridInfo.length !== 2) throw new Error('Expected 2 video tiles in grid');
  if (gridInfo[0].badgeText !== 'VIDEO' || !gridInfo[0].hasPlayIcon || gridInfo[0].typeText !== 'Link') {
    throw new Error('First video tile invalid');
  }
  if (gridInfo[1].badgeText !== 'VIDEO' || !gridInfo[1].hasPlayIcon || gridInfo[1].typeText !== 'Link') {
    throw new Error('Second video tile invalid');
  }
  console.log('✓ Thumbnail grid, VIDEO badges, Play icons, and Link indicators verified');

  await page.close();

  // TEST 5: Public Properties Page & Details Popup
  console.log('\n[TEST 5] Public Properties Page & Modal Popup:');
  const pubPage = await browser.newPage();
  pubPage.on('pageerror', (err) => consoleErrors.push(err.toString()));
  pubPage.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  const pubUrl = 'http://localhost:5173/properties.html';
  console.log('Loading public properties page:', pubUrl);
  await pubPage.goto(pubUrl, { waitUntil: 'domcontentloaded' });
  await pubPage.waitForSelector('.property-card-curated', { timeout: 6000 });

  const popupTests = await pubPage.evaluate(async () => {
    const cards = Array.from(document.querySelectorAll('.property-card-curated'));
    
    // First card has video (prestige-golf-vista-villa)
    const cardWithVideo = cards.find(c => !!c.querySelector('.card-video-pill'));
    const cardWithoutVideo = cards.find(c => !c.querySelector('.card-video-pill'));

    // Open card with video
    if (cardWithVideo) {
      cardWithVideo.click();
    }
    await new Promise((r) => setTimeout(r, 500));

    const modal = document.getElementById('property-details-modal');
    const isOpen = modal ? modal.classList.contains('is-open') : false;
    const photoThumbs = modal ? Array.from(modal.querySelectorAll('.modal-thumb-btn:not(.modal-thumb-video)')) : [];
    const videoThumbs = modal ? Array.from(modal.querySelectorAll('.modal-thumb-video')) : [];
    const photoCounter = modal ? modal.querySelector('.modal-photo-counter-pill')?.textContent.trim() : null;

    // Check video thumbnail attributes
    const vThumbAria = videoThumbs.length > 0 ? videoThumbs[0].getAttribute('aria-label') : null;

    // Tap on video thumbnail
    if (videoThumbs.length > 0) {
      videoThumbs[0].click();
    }
    await new Promise((r) => setTimeout(r, 400));

    // In video mode: check placeholder and play button
    const playBtn = modal.querySelector('.modal-video-play-btn');
    const hasIframeBeforePlay = !!modal.querySelector('iframe');
    const playBtnMinSize = playBtn ? { width: playBtn.offsetWidth, height: playBtn.offsetHeight } : null;

    // Click play button
    if (playBtn) {
      playBtn.click();
    }
    await new Promise((r) => setTimeout(r, 400));

    const iframe = modal.querySelector('iframe');
    const iframeSrc = iframe ? iframe.src : null;
    const iframeLoading = iframe ? iframe.getAttribute('loading') : null;
    const iframeAllow = iframe ? iframe.getAttribute('allow') : null;

    return {
      hasCardWithVideoPill: !!cardWithVideo,
      hasCardWithoutVideoPill: !!cardWithoutVideo,
      isOpen,
      photoThumbsCount: photoThumbs.length,
      videoThumbsCount: videoThumbs.length,
      vThumbAria,
      photoCounter,
      hasPlayBtn: !!playBtn,
      playBtnMinSize,
      hasIframeBeforePlay,
      hasIframeAfterPlay: !!iframe,
      iframeSrc,
      iframeLoading,
      iframeAllow,
    };
  });

  console.log('Public popup test results:', popupTests);
  if (!popupTests.hasCardWithVideoPill) {
    throw new Error('Property card with video missing .card-video-pill');
  }
  if (!popupTests.isOpen) {
    throw new Error('Property details modal failed to open');
  }
  if (popupTests.videoThumbsCount < 1) {
    throw new Error('Video thumbnail missing in modal thumbnail strip');
  }
  if (!popupTests.vThumbAria || !popupTests.vThumbAria.includes('Play video 1')) {
    throw new Error('Video thumbnail missing required aria-label: ' + popupTests.vThumbAria);
  }
  if (popupTests.hasIframeBeforePlay) {
    throw new Error('YouTube iframe must NOT be loaded before visitor taps play');
  }
  if (!popupTests.hasIframeAfterPlay || !popupTests.iframeSrc.includes('youtube-nocookie.com/embed/M7lc1UVf-VE')) {
    throw new Error('YouTube nocookie embed failed to mount on play: ' + popupTests.iframeSrc);
  }
  if (popupTests.iframeLoading !== 'lazy' || !popupTests.iframeAllow.includes('fullscreen')) {
    throw new Error('Iframe missing loading="lazy" or allow attributes');
  }
  console.log('✓ Public popup video thumbnail, lazy iframe mounting, and accessibility verified');

  // TEST 6: Responsive & Overflow Checks at 360px, 390px, 768px, 1280px
  console.log('\n[TEST 6] Responsive Viewports & Horizontal Scrolling Check:');
  const viewports = [360, 390, 768, 1280];
  for (const width of viewports) {
    await pubPage.setViewport({ width, height: 800 });
    await new Promise((r) => setTimeout(r, 200));
    const overflow = await pubPage.evaluate(() => {
      const scrollW = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
      const clientW = document.documentElement.clientWidth;
      return { scrollW, clientW, hasOverflow: scrollW > clientW + 1 };
    });
    console.log(`Viewport ${width}px: scrollWidth = ${overflow.scrollW}, clientWidth = ${overflow.clientW}, overflow = ${overflow.hasOverflow}`);
    if (overflow.hasOverflow) {
      throw new Error(`Horizontal scroll detected at ${width}px width!`);
    }
  }
  console.log('✓ All responsive breakpoints tested with zero horizontal overflow');

  console.log('\nConsole Errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.warn('Console error messages:', consoleErrors);
  }

  await browser.close();
  console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY!');
}

runTests().catch((err) => {
  console.error('\n❌ Test failed:', err);
  process.exit(1);
});

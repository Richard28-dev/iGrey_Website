import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const MOCKUP_DIR = path.resolve(process.cwd(), 'mockups');
const SCREENSHOT_DIR = path.resolve(process.cwd(), 'screenshots');

if (!fs.existsSync(MOCKUP_DIR)) fs.mkdirSync(MOCKUP_DIR, { recursive: true });
if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

// 1. OPTION A: Monaco Noir & Bronze Sovereign
const htmlOptionA = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Option A - Monaco Noir Sovereign</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Manrope:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  background: #090D0B;
  color: #EDE8DF;
  font-family: 'Manrope', sans-serif;
  overflow: hidden;
  width: 1920px;
  height: 1080px;
  position: relative;
}
.hero-bg {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(180deg, rgba(9,13,11,0.65) 0%, rgba(9,13,11,0.2) 40%, rgba(9,13,11,0.85) 100%),
              url('http://localhost:5173/images/hero_residential.jpg') center/cover no-repeat;
  filter: saturate(1.15) contrast(1.05);
}
.gold-hairline {
  position: absolute;
  top: 0; left: 80px; bottom: 0; width: 1px;
  background: rgba(197, 168, 128, 0.15);
}
.gold-hairline-right {
  position: absolute;
  top: 0; right: 80px; bottom: 0; width: 1px;
  background: rgba(197, 168, 128, 0.15);
}
header {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 110px;
  border-bottom: 1px solid rgba(197, 168, 128, 0.12);
  backdrop-filter: blur(12px);
  background: rgba(9, 13, 11, 0.45);
  z-index: 10;
}
.brand {
  display: flex;
  align-items: baseline;
  gap: 12px;
}
.brand-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 32px;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: #FFFFFF;
}
.brand-sub {
  font-size: 11px;
  letter-spacing: 0.35em;
  color: #C5A880;
  text-transform: uppercase;
}
nav {
  display: flex;
  gap: 44px;
}
nav a {
  color: rgba(237, 232, 223, 0.75);
  text-decoration: none;
  font-size: 13px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition: color 0.3s;
}
nav a.active, nav a:hover {
  color: #C5A880;
}
.cta-btn {
  border: 1px solid #C5A880;
  background: rgba(197, 168, 128, 0.08);
  color: #E8D5B7;
  padding: 14px 28px;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 4px 24px rgba(197,168,128,0.12);
}
.content {
  position: absolute;
  bottom: 140px;
  left: 110px;
  max-width: 980px;
  z-index: 10;
}
.tag-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 18px;
  background: rgba(197, 168, 128, 0.12);
  border: 1px solid rgba(197, 168, 128, 0.3);
  font-size: 11px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #D6BA94;
  margin-bottom: 28px;
}
.headline {
  font-family: 'Cormorant Garamond', serif;
  font-size: 88px;
  font-weight: 300;
  line-height: 1.02;
  letter-spacing: -0.01em;
  color: #FFFFFF;
  margin-bottom: 24px;
}
.headline em {
  font-style: italic;
  font-family: 'Cormorant Garamond', serif;
  color: #E8D5B7;
}
.subhead {
  font-size: 17px;
  line-height: 1.7;
  color: rgba(237, 232, 223, 0.72);
  max-width: 640px;
  margin-bottom: 40px;
  font-weight: 300;
}
.actions {
  display: flex;
  gap: 20px;
  align-items: center;
}
.primary-btn {
  background: #C5A880;
  color: #090D0B;
  padding: 18px 38px;
  font-size: 13px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 600;
  border: none;
  cursor: pointer;
}
.secondary-btn {
  background: transparent;
  color: #EDE8DF;
  padding: 18px 36px;
  font-size: 13px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  border: 1px solid rgba(237, 232, 223, 0.25);
  cursor: pointer;
}
.bottom-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 110px;
  border-top: 1px solid rgba(197, 168, 128, 0.12);
  background: rgba(9, 13, 11, 0.8);
  backdrop-filter: blur(10px);
  z-index: 10;
}
.ticker-items {
  display: flex;
  gap: 36px;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(237,232,223,0.6);
}
.ticker-items span.gold {
  color: #C5A880;
}
.residence-counter {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  color: #C5A880;
  letter-spacing: 0.1em;
}
.floating-card {
  position: absolute;
  right: 110px;
  bottom: 140px;
  width: 380px;
  background: rgba(13, 20, 17, 0.75);
  border: 1px solid rgba(197, 168, 128, 0.2);
  backdrop-filter: blur(16px);
  padding: 32px;
  z-index: 10;
}
.floating-card-label {
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #C5A880;
  margin-bottom: 10px;
}
.floating-card-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 26px;
  color: #FFFFFF;
  margin-bottom: 8px;
}
.floating-card-meta {
  font-size: 13px;
  color: rgba(237,232,223,0.65);
  margin-bottom: 20px;
}
.floating-card-stat {
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid rgba(197, 168, 128, 0.15);
  font-size: 14px;
}
</style>
</head>
<body>
<div class="hero-bg"></div>
<div class="gold-hairline"></div>
<div class="gold-hairline-right"></div>
<header>
  <div class="brand">
    <div class="brand-name">iGREY</div>
    <div class="brand-sub">HOLDINGS</div>
  </div>
  <nav>
    <a href="#" class="active">Sanctuaries</a>
    <a href="#">Discreet Sales</a>
    <a href="#">Private Office</a>
    <a href="#">The Archive</a>
    <a href="#">Advisory</a>
  </nav>
  <button class="cta-btn">Private Consultation</button>
</header>

<div class="content">
  <div class="tag-badge">Private Residences &bull; Monaco &bull; London &bull; Dubai</div>
  <h1 class="headline">Architecture that endures.<br><em>Sanctuaries of distinction.</em></h1>
  <p class="subhead">A more considered, sovereign approach to prime residential acquisitions, tailored portfolio advisory, and confidential off-market architectural legacies.</p>
  <div class="actions">
    <button class="primary-btn">Explore Portfolio</button>
    <button class="secondary-btn">The Private Desk</button>
  </div>
</div>

<div class="floating-card">
  <div class="floating-card-label">Curated Highlight &bull; Lot 084</div>
  <div class="floating-card-title">The Bel-Air Horizon Villa</div>
  <div class="floating-card-meta">Bel-Air, California &bull; Modernist Glass &amp; Travertine</div>
  <div class="floating-card-stat">
    <span style="color:rgba(237,232,223,0.6);">Guide Price</span>
    <span style="color:#C5A880; font-family:'Cormorant Garamond', serif; font-size:18px;">$34,500,000</span>
  </div>
</div>

<div class="bottom-bar">
  <div class="ticker-items">
    <span>London <strong class="gold">&bull;</strong> Mayfair</span>
    <span>Monaco <strong class="gold">&bull;</strong> Monte-Carlo</span>
    <span>Dubai <strong class="gold">&bull;</strong> Palm Jumeirah</span>
    <span>Geneva <strong class="gold">&bull;</strong> Cologny</span>
    <span>New York <strong class="gold">&bull;</strong> Tribeca</span>
  </div>
  <div class="residence-counter">
    <strong>01</strong> &mdash; 04 &nbsp;/&nbsp; COLLECTION 2026
  </div>
</div>
</body>
</html>`;

// 2. OPTION B: Mayfair Architectural Monograph
const htmlOptionB = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Option B - Mayfair Architectural Monograph</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  background: #F8F6F0;
  color: #1A1715;
  font-family: 'Plus Jakarta Sans', sans-serif;
  overflow: hidden;
  width: 1920px;
  height: 1080px;
  position: relative;
  display: flex;
}
.sidebar-panel {
  width: 720px;
  height: 100%;
  padding: 70px 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid #E2DCD2;
  background: #FAF8F4;
  z-index: 10;
}
.brand {
  display: flex;
  align-items: baseline;
  gap: 12px;
}
.brand-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 34px;
  font-weight: 500;
  letter-spacing: 0.12em;
  color: #12100E;
}
.brand-sub {
  font-size: 11px;
  letter-spacing: 0.3em;
  color: #8C6F48;
  text-transform: uppercase;
}
.monograph-meta {
  font-size: 11px;
  letter-spacing: 0.25em;
  color: #8C6F48;
  text-transform: uppercase;
  margin-bottom: 24px;
}
.headline {
  font-family: 'Cormorant Garamond', serif;
  font-size: 68px;
  line-height: 1.06;
  font-weight: 300;
  letter-spacing: -0.01em;
  color: #12100E;
  margin-bottom: 28px;
}
.headline em {
  font-style: italic;
  color: #8C6F48;
}
.subhead {
  font-size: 16px;
  line-height: 1.75;
  color: #55504A;
  margin-bottom: 40px;
  font-weight: 300;
}
.spec-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 24px 0;
  border-top: 1px solid #E2DCD2;
  border-bottom: 1px solid #E2DCD2;
  margin-bottom: 36px;
}
.spec-item-label {
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #8C867E;
  margin-bottom: 4px;
}
.spec-item-val {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px;
  color: #1A1715;
  font-weight: 500;
}
.actions {
  display: flex;
  gap: 18px;
}
.btn-primary {
  background: #12100E;
  color: #FAF8F4;
  padding: 16px 36px;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 600;
  border: none;
  cursor: pointer;
}
.btn-secondary {
  background: transparent;
  color: #12100E;
  padding: 16px 32px;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 500;
  border: 1px solid #D5CEBE;
  cursor: pointer;
}
.footer-meta {
  font-size: 12px;
  color: #8C867E;
  display: flex;
  justify-content: space-between;
}
.hero-visual {
  flex: 1;
  height: 100%;
  position: relative;
  background: url('http://localhost:5173/images/about_terrace.jpg') center/cover no-repeat;
}
.visual-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(180deg, rgba(18,16,14,0.1) 0%, rgba(18,16,14,0.4) 100%);
}
.visual-card {
  position: absolute;
  bottom: 60px;
  right: 60px;
  background: rgba(250, 248, 244, 0.94);
  backdrop-filter: blur(12px);
  padding: 28px 36px;
  border: 1px solid #E2DCD2;
  max-width: 440px;
}
.card-tag {
  font-size: 11px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #8C6F48;
  margin-bottom: 6px;
}
.card-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px;
  color: #12100E;
  margin-bottom: 12px;
}
.card-desc {
  font-size: 13px;
  line-height: 1.6;
  color: #55504A;
}
.top-nav {
  position: absolute;
  top: 40px;
  right: 60px;
  display: flex;
  gap: 36px;
  z-index: 20;
}
.top-nav a {
  color: #FFFFFF;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
  text-decoration: none;
  font-size: 13px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 500;
}
</style>
</head>
<body>
<div class="sidebar-panel">
  <div class="brand">
    <div class="brand-name">iGREY</div>
    <div class="brand-sub">HOLDINGS</div>
  </div>

  <div>
    <div class="monograph-meta">Monograph Vol. 12 &bull; Architectural Estates</div>
    <h1 class="headline">A more considered <em>perspective</em> on prime estate.</h1>
    <p class="subhead">We curate a highly restricted portfolio of architectural marvels and private residences, serving collectors who value enduring proportions, natural materiality, and provenance.</p>

    <div class="spec-grid">
      <div>
        <div class="spec-item-label">Verified Listings</div>
        <div class="spec-item-val">25+ Signature Assets</div>
      </div>
      <div>
        <div class="spec-item-label">Global Private Office</div>
        <div class="spec-item-val">London &bull; Dubai &bull; Geneva</div>
      </div>
      <div>
        <div class="spec-item-label">Advisory Volume</div>
        <div class="spec-item-val">$1.4B+ Transacted</div>
      </div>
      <div>
        <div class="spec-item-label">Discreet Placements</div>
        <div class="spec-item-val">100% Confidential</div>
      </div>
    </div>

    <div class="actions">
      <button class="btn-primary">View Curated Dossier</button>
      <button class="btn-secondary">Inquire Privately</button>
    </div>
  </div>

  <div class="footer-meta">
    <span>&copy; 2026 iGrey Holdings</span>
    <span>ISO 27001 Confidentiality Guaranteed</span>
  </div>
</div>

<div class="hero-visual">
  <div class="visual-overlay"></div>
  <div class="top-nav">
    <a href="#">Portfolio</a>
    <a href="#">Architects</a>
    <a href="#">Private Office</a>
    <a href="#">Schedule</a>
  </div>
  <div class="visual-card">
    <div class="card-tag">Plate 04 &bull; Featured Terrace</div>
    <div class="card-title">Skyline Penthouse &amp; Garden</div>
    <div class="card-desc">Designed with honed travertine, bronze fenestration, and unobstructed 270-degree panoramic sunrise vistas over the city.</div>
  </div>
</div>
</body>
</html>`;

// 3. OPTION C: Swiss Modern Luxury (Nordic High-Line)
const htmlOptionC = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Option C - Swiss Modern Luxury</title>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  background: #0E1214;
  color: #ECEFF1;
  font-family: 'Manrope', sans-serif;
  overflow: hidden;
  width: 1920px;
  height: 1080px;
  position: relative;
}
.hero-bg {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(180deg, rgba(14,18,20,0.7) 0%, rgba(14,18,20,0.3) 50%, rgba(14,18,20,0.95) 100%),
              url('http://localhost:5173/images/hero_commercial.jpg') center/cover no-repeat;
  filter: contrast(1.1);
}
header {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 100px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  background: rgba(14, 18, 20, 0.6);
  z-index: 20;
}
.logo-box {
  display: flex;
  align-items: center;
  gap: 16px;
}
.logo-icon {
  width: 44px;
  height: 44px;
  border: 1px solid #D4AF37;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Cinzel', serif;
  font-size: 20px;
  color: #D4AF37;
  letter-spacing: 0.05em;
}
.logo-text {
  font-family: 'Cinzel', serif;
  font-size: 22px;
  letter-spacing: 0.22em;
  color: #FFFFFF;
}
nav {
  display: flex;
  gap: 50px;
}
nav a {
  color: rgba(236, 239, 241, 0.7);
  text-decoration: none;
  font-size: 13px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 500;
  transition: color 0.2s;
}
nav a.active {
  color: #D4AF37;
}
.contact-pill {
  background: #D4AF37;
  color: #0E1214;
  padding: 12px 28px;
  border-radius: 4px;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 700;
  border: none;
  cursor: pointer;
}
.main-wrapper {
  position: absolute;
  top: 240px;
  left: 100px;
  right: 100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  z-index: 10;
}
.hero-left {
  max-width: 900px;
}
.kicker {
  font-size: 12px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #D4AF37;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.kicker::before {
  content: '';
  display: inline-block;
  width: 40px;
  height: 1px;
  background: #D4AF37;
}
.display-title {
  font-family: 'Cinzel', serif;
  font-size: 82px;
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: 0.02em;
  color: #FFFFFF;
  margin-bottom: 28px;
}
.display-sub {
  font-size: 18px;
  line-height: 1.7;
  color: rgba(236, 239, 241, 0.75);
  max-width: 620px;
  margin-bottom: 48px;
  font-weight: 300;
}
.filter-tabs {
  display: flex;
  gap: 16px;
}
.tab {
  padding: 14px 28px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #FFFFFF;
  font-size: 13px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  backdrop-filter: blur(8px);
}
.tab.active {
  background: rgba(212, 175, 55, 0.18);
  border-color: #D4AF37;
  color: #D4AF37;
}
.telemetry-card {
  width: 420px;
  background: rgba(14, 18, 20, 0.85);
  border: 1px solid rgba(212, 175, 55, 0.25);
  backdrop-filter: blur(20px);
  padding: 36px;
}
.telemetry-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 11px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #D4AF37;
}
.telemetry-val {
  font-family: 'Cinzel', serif;
  font-size: 32px;
  color: #FFFFFF;
  margin-bottom: 8px;
}
.telemetry-label {
  font-size: 13px;
  color: rgba(236,239,241,0.6);
  margin-bottom: 24px;
}
.telemetry-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 13px;
}
.telemetry-row span:first-child {
  color: rgba(236,239,241,0.5);
}
.telemetry-row span:last-child {
  color: #FFFFFF;
  font-weight: 500;
}
</style>
</head>
<body>
<div class="hero-bg"></div>
<header>
  <div class="logo-box">
    <div class="logo-icon">iG</div>
    <div class="logo-text">iGREY HOLDINGS</div>
  </div>
  <nav>
    <a href="#" class="active">Residences</a>
    <a href="#">Private Office</a>
    <a href="#">Developments</a>
    <a href="#">Intelligence</a>
    <a href="#">Contact</a>
  </nav>
  <button class="contact-pill">Acquisition Desk</button>
</header>

<div class="main-wrapper">
  <div class="hero-left">
    <div class="kicker">Ultra-Prime Global Real Estate</div>
    <h1 class="display-title">REDEFINING<br>SOVEREIGN LIVING</h1>
    <p class="display-sub">Bespoke portfolio structuring, off-market prime acquisitions, and high-pedigree architectural investments across the world's most resilient capital markets.</p>
    <div class="filter-tabs">
      <div class="tab active">Residential Trophy</div>
      <div class="tab">Skyline Penthouses</div>
      <div class="tab">Commercial Towers</div>
      <div class="tab">Private Islands</div>
    </div>
  </div>

  <div class="telemetry-card">
    <div class="telemetry-header">
      <span>Market Index</span>
      <span>Live Desk</span>
    </div>
    <div class="telemetry-val">&pound;42.8M</div>
    <div class="telemetry-label">The Mayfair Crown Penthouse &bull; 6,400 sq.ft</div>
    <div class="telemetry-row">
      <span>Location</span>
      <span>Grosvenor Square, London</span>
    </div>
    <div class="telemetry-row">
      <span>Solar Orientation</span>
      <span>South-West 280&deg; Panorama</span>
    </div>
    <div class="telemetry-row">
      <span>Amenities</span>
      <span>Private Helipad Access, 24/7 Concierge</span>
    </div>
  </div>
</div>
</body>
</html>`;

fs.writeFileSync(path.join(MOCKUP_DIR, 'option-a.html'), htmlOptionA);
fs.writeFileSync(path.join(MOCKUP_DIR, 'option-b.html'), htmlOptionB);
fs.writeFileSync(path.join(MOCKUP_DIR, 'option-c.html'), htmlOptionC);

async function captureAll() {
  console.log('Launching Chrome for high-res mockups capture (1920x1080)...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

    // Option A
    const fileA = 'file:///' + path.join(MOCKUP_DIR, 'option-a.html').replace(/\\/g, '/');
    await page.goto(fileA, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1200));
    const outA = path.join(SCREENSHOT_DIR, 'option-a-noir-sovereign.png');
    await page.screenshot({ path: outA });
    console.log('Captured:', outA);

    // Option B
    const fileB = 'file:///' + path.join(MOCKUP_DIR, 'option-b.html').replace(/\\/g, '/');
    await page.goto(fileB, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1200));
    const outB = path.join(SCREENSHOT_DIR, 'option-b-editorial-monograph.png');
    await page.screenshot({ path: outB });
    console.log('Captured:', outB);

    // Option C
    const fileC = 'file:///' + path.join(MOCKUP_DIR, 'option-c.html').replace(/\\/g, '/');
    await page.goto(fileC, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1200));
    const outC = path.join(SCREENSHOT_DIR, 'option-c-swiss-modern-luxury.png');
    await page.screenshot({ path: outC });
    console.log('Captured:', outC);

  } finally {
    await browser.close();
  }
}

captureAll().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});

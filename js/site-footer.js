/**
 * iGrey Holdings — Global Shared Site Footer Controller & Renderer
 * Provides single-source-of-truth footer rendering across all public pages (Home, Properties, etc.)
 */

(function () {
  'use strict';

  var FOOTER_HTML = [
    '<footer class="igrey-site-footer" id="igrey-site-footer" role="contentinfo">',
    '  <div class="footer-container">',
    '    <!-- Main Content Columns -->',
    '    <div class="footer-main-grid">',
    '      <!-- COLUMN 1: Brand & Socials -->',
    '      <div class="footer-col-brand">',
    '        <div class="footer-brand-info">',
    '          <a href="./" class="footer-logo-link" aria-label="iGrey Holdings Home">',
    '            <img src="./logo-white.png" alt="iGrey Holdings" class="footer-logo-img" width="168" height="42" onerror="if(this.src.indexOf(\'public/\')===-1)this.src=\'./public/logo-white.png\';" />',
    '          </a>',
    '          <p class="footer-brand-desc">',
    '            Redefining luxury real estate advisory and residential acquisitions across South India.',
    '          </p>',
    '        </div>',
    '',
    '        <!-- Social Buttons -->',
    '        <div class="footer-social-row" role="region" aria-label="Social media links">',
    '          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="Facebook">',
    '            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#c9a77c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
    '              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    '            </svg>',
    '          </a>',
    '          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="Instagram">',
    '            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#c9a77c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
    '              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>',
    '              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>',
    '              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
    '            </svg>',
    '          </a>',
    '          <a href="https://x.com" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="X (formerly Twitter)">',
    '            <svg width="15" height="15" viewBox="0 0 24 24" fill="#c9a77c" aria-hidden="true">',
    '              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
    '            </svg>',
    '          </a>',
    '          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="LinkedIn">',
    '            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#c9a77c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
    '              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>',
    '              <rect width="4" height="12" x="2" y="9"/>',
    '              <circle cx="4" cy="4" r="2"/>',
    '            </svg>',
    '          </a>',
    '        </div>',
    '      </div>',
    '',
    '      <!-- NAV WRAPPER (Quick Links & Our Services) -->',
    '      <div class="footer-nav-wrapper">',
    '        <!-- COLUMN 2: Quick Links -->',
    '        <nav class="footer-col-quicklinks" aria-label="Quick Links">',
    '          <h3 class="footer-col-heading">Quick Links</h3>',
    '          <div class="footer-heading-underline" aria-hidden="true"></div>',
    '          <ul class="footer-links-list">',
    '            <li><a href="./" class="footer-link">Home</a></li>',
    '            <li><a href="./#about" class="footer-link">About iGrey</a></li>',
    '            <li><a href="./#services" class="footer-link">Our Services</a></li>',
    '            <li><a href="./properties.html" class="footer-link">All Properties</a></li>',
    '            <li><a href="./#contact" class="footer-link">List Your Property</a></li>',
    '          </ul>',
    '        </nav>',
    '',
    '        <!-- COLUMN 3: Our Services -->',
    '        <nav class="footer-col-services" aria-label="Our Services">',
    '          <h3 class="footer-col-heading">Our Services</h3>',
    '          <div class="footer-heading-underline" aria-hidden="true"></div>',
    '          <ul class="footer-links-list">',
    '            <li><a href="./#services" class="footer-link">Rent Payouts</a></li>',
    '            <li><a href="./#services" class="footer-link">Tenant KYC</a></li>',
    '            <li><a href="./#services" class="footer-link">Inspections &amp; Repairs</a></li>',
    '            <li><a href="./#services" class="footer-link">Legal Agreements</a></li>',
    '          </ul>',
    '        </nav>',
    '      </div>',
    '',
    '      <!-- COLUMN 4: Get in Touch -->',
    '      <div class="footer-col-contact">',
    '        <h3 class="footer-col-heading">Get in Touch</h3>',
    '        <div class="footer-heading-underline" aria-hidden="true"></div>',
    '        <div class="footer-contact-list">',
    '          <!-- PLACEHOLDER: Replace with actual office address -->',
    '          <div class="footer-contact-item">',
    '            <svg class="footer-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a77c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
    '              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>',
    '              <circle cx="12" cy="10" r="3"/>',
    '            </svg>',
    '            <span class="footer-contact-text">Office address line,<br/>Mysuru, Karnataka</span>',
    '          </div>',
    '',
    '          <!-- PLACEHOLDER: Replace with official email address -->',
    '          <div class="footer-contact-item">',
    '            <svg class="footer-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a77c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
    '              <rect width="20" height="16" x="2" y="4" rx="2"/>',
    '              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    '            </svg>',
    '            <a href="mailto:hello@igreyholdings.com" class="footer-contact-text footer-contact-link">hello@igreyholdings.com</a>',
    '          </div>',
    '',
    '          <!-- PLACEHOLDER: Replace with direct phone number -->',
    '          <div class="footer-contact-item">',
    '            <svg class="footer-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a77c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
    '              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    '            </svg>',
    '            <a href="tel:+919876500000" class="footer-contact-text footer-contact-link">+91 98765 00000</a>',
    '          </div>',
    '',
    '          <!-- PLACEHOLDER: Replace with business hours -->',
    '          <div class="footer-contact-item">',
    '            <svg class="footer-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a77c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
    '              <circle cx="12" cy="12" r="10"/>',
    '              <polyline points="12 6 12 12 16 14"/>',
    '            </svg>',
    '            <span class="footer-contact-text">Mon to Sat, 9:30 am to 7 pm</span>',
    '          </div>',
    '        </div>',
    '      </div>',
    '    </div>',
    '',
    '    <!-- BOTTOM BAR: Copyright & Legal Policies -->',
    '    <div class="footer-bottom-bar">',
    '      <div class="footer-copyright">',
    '        &copy; <span class="footer-year-value">2026</span> iGrey Holdings. All rights reserved.',
    '      </div>',
    '      <div class="footer-legal-links" style="display: none;">',
    '        <a href="./privacy.html" class="footer-legal-link">Privacy Policy</a>',
    '        <span class="footer-legal-dot" aria-hidden="true">&bull;</span>',
    '        <a href="./terms.html" class="footer-legal-link">Terms &amp; Conditions</a>',
    '      </div>',
    '    </div>',
    '  </div>',
    '</footer>'
  ].join('\n');

  /**
   * Renders the shared footer into target container
   * @param {HTMLElement|string} target - Container element or CSS selector
   * @param {Object} [options]
   */
  function renderSiteFooter(target, options) {
    var container = typeof target === 'string' ? document.querySelector(target) : target;
    if (!container) return null;

    // Check if container itself is a footer or a wrapper
    if (container.tagName && container.tagName.toLowerCase() === 'footer') {
      // If container is already <footer class="igrey-site-footer">, just replace its inner HTML
      container.className = 'igrey-site-footer';
      container.id = 'igrey-site-footer';
      container.setAttribute('role', 'contentinfo');
      
      // Extract contents from FOOTER_HTML
      var temp = document.createElement('div');
      temp.innerHTML = FOOTER_HTML;
      var inner = temp.querySelector('.footer-container');
      if (inner) {
        container.innerHTML = inner.outerHTML;
      } else {
        container.innerHTML = FOOTER_HTML;
      }
    } else {
      container.innerHTML = FOOTER_HTML;
    }

    // 1. Automatically update copyright year
    var yearEl = container.querySelector('.footer-year-value');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // 2. Hide Privacy and Terms links unless the files exist
    var legalLinksEl = container.querySelector('.footer-legal-links');
    if (legalLinksEl && typeof window.fetch === 'function' && window.location.protocol.indexOf('http') === 0) {
      // Only perform HEAD check in http/https environments without throwing errors
      fetch('./privacy.html', { method: 'HEAD' })
        .then(function (res) {
          if (res.ok) {
            legalLinksEl.style.display = 'flex';
          } else {
            legalLinksEl.style.display = 'none';
          }
        })
        .catch(function () {
          legalLinksEl.style.display = 'none';
        });
    }

    // 3. Navigation link handling for in-page anchors on home page vs properties page
    var isPropertiesPage = window.location.pathname.indexOf('properties.html') !== -1;
    var links = container.querySelectorAll('.footer-link');
    
    Array.prototype.forEach.call(links, function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (!href) return;

        // If clicking All Properties while already on properties.html: smooth scroll to top
        if (isPropertiesPage && href.indexOf('properties.html') !== -1) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // If on home page and link has a hash anchor like ./#about or ./#services
        if (!isPropertiesPage && href.indexOf('#') !== -1) {
          var hash = href.slice(href.indexOf('#'));
          var targetEl = document.querySelector(hash);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (window.history && window.history.pushState) {
              window.history.pushState(null, '', hash);
            }
          }
        }
      });
    });

    return container;
  }

  // Expose globally
  window.renderSiteFooter = renderSiteFooter;

  // Auto-initialize on load if container exists
  function autoInit() {
    var mountPoint = document.getElementById('site-footer-container') ||
                     document.querySelector('[data-igrey-footer]') ||
                     document.getElementById('site-footer') ||
                     document.querySelector('footer.properties-page-footer');

    if (mountPoint) {
      renderSiteFooter(mountPoint);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
})();

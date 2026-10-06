/**
 * iGREY HOLDINGS — Public Website Properties Loader
 * 
 * Fetches published real estate listings from Supabase in real-time,
 * renders luxury property cards matching the site design with touch carousels,
 * provides loading skeletons, empty state, and non-destructive retry fallback.
 */

(function () {
  'use strict';

  // --- XSS PROTECTION HELPER ---
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // --- INDIAN CURRENCY FORMATTER ---
  function formatIndianPrice(amount) {
    const num = Number(amount);
    if (isNaN(num) || num <= 0) return 'Price on Request';
    if (num >= 10000000) {
      const cr = num / 10000000;
      return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2).replace(/\.?0+$/, '')} Cr`;
    }
    if (num >= 100000) {
      const lakh = num / 100000;
      return `₹${lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(2).replace(/\.?0+$/, '')} L`;
    }
    return `₹${num.toLocaleString('en-IN')}`;
  }

  // --- STATUS BADGE MAPPER ---
  function formatStatusBadge(status) {
    const s = String(status || '').toLowerCase().trim();
    if (s === 'under_offer' || s === 'under offer') return 'UNDER OFFER';
    if (s === 'sold') return 'SOLD';
    return 'AVAILABLE';
  }

  // --- SVG ASSETS ---
  const SVG_TAG_ICON = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c9a77c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
      <line x1="7" y1="7" x2="7.01" y2="7"></line>
    </svg>
  `;

  const SVG_CHEVRON_LEFT = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  `;

  const SVG_CHEVRON_RIGHT = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  `;

  const SVG_HEART = `
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  `;

  // --- SUPABASE DATA ACCESS ---
  async function fetchPublishedProperties(options = {}) {
    const { featuredOnly = false } = options;

    if (!window.supabaseClient) {
      throw new Error('Supabase client is not initialized or configured.');
    }

    let query = window.supabaseClient
      .from('properties')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (featuredOnly) {
      query = query.eq('is_featured', true);
    }

    const { data, error } = await query;
    if (error) {
      throw error;
    }
    return data || [];
  }

  // --- SKELETON LOADER GENERATION ---
  function createSkeletonHTML(count = 3) {
    let items = '';
    for (let i = 0; i < count; i++) {
      items += `
        <div class="igrey-prop-card igrey-prop-skeleton" aria-hidden="true">
          <div class="skeleton-image-wrapper"></div>
          <div class="skeleton-body">
            <div class="skeleton-line skeleton-meta"></div>
            <div class="skeleton-line skeleton-title"></div>
            <div class="skeleton-line skeleton-sub"></div>
            <div class="skeleton-divider"></div>
            <div class="skeleton-line skeleton-footer"></div>
          </div>
        </div>
      `;
    }
    return items;
  }

  // --- EMPTY LISTINGS STATE ---
  function createEmptyStateHTML() {
    return `
      <div class="igrey-prop-empty-state">
        <div class="empty-icon-ring">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c9a77c" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
        <h3 class="empty-title">New listings are coming soon</h3>
        <p class="empty-subtitle">Our curated architectural portfolio is currently being updated. Contact our private office for off-market residences.</p>
        <a href="#contact" class="empty-contact-btn">Inquire Privately &rarr;</a>
      </div>
    `;
  }

  // --- RETRY ERROR BANNER ---
  function createErrorStateHTML(onRetryCallbackName) {
    return `
      <div class="igrey-prop-error-banner" role="alert">
        <div class="error-msg">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e07a6f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>Unable to connect to property directory. Showing archived showcase.</span>
        </div>
        <button type="button" class="btn-retry-sync" onclick="${escapeHtml(onRetryCallbackName)}()">
          Retry Connection
        </button>
      </div>
    `;
  }

  // --- CAROUSEL BINDINGS ---
  function initCardCarousel(cardEl) {
    const container = cardEl.querySelector('.property-carousel-container');
    if (!container) return;

    const images = container.querySelectorAll('.carousel-slide-img');
    const dots = container.querySelectorAll('.carousel-dot-btn');
    const prevBtn = container.querySelector('.carousel-arrow-prev');
    const nextBtn = container.querySelector('.carousel-arrow-next');
    const total = images.length;
    if (total <= 1) return;

    let currentIndex = 0;
    let touchStartX = null;
    let touchStartY = null;

    function showIndex(idx) {
      currentIndex = ((idx % total) + total) % total;
      images.forEach((img, i) => {
        img.style.opacity = i === currentIndex ? '1' : '0';
        img.style.zIndex = i === currentIndex ? '2' : '1';
      });
      dots.forEach((dot, i) => {
        const isActive = i === currentIndex;
        dot.style.width = isActive ? '16px' : '5px';
        dot.style.backgroundColor = isActive ? '#c9a77c' : 'rgba(255, 255, 255, 0.45)';
        dot.style.boxShadow = isActive ? '0 0 8px rgba(197, 168, 128, 0.75)' : 'none';
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showIndex(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showIndex(currentIndex + 1);
      });
    }

    dots.forEach((dot, dotIdx) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showIndex(dotIdx);
      });
    });

    container.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      if (touchStartX === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const deltaY = e.changedTouches[0].clientY - (touchStartY ?? 0);
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
        if (deltaX < 0) {
          showIndex(currentIndex + 1);
        } else {
          showIndex(currentIndex - 1);
        }
      }
      touchStartX = null;
      touchStartY = null;
    }, { passive: true });
  }

  // --- CARD DOM GENERATION ---
  function renderSinglePropertyCard(property) {
    const statusText = formatStatusBadge(property.status);
    const formattedPrice = formatIndianPrice(property.price);
    const propType = escapeHtml(property.property_type || 'Residence');
    const bedrooms = escapeHtml(property.bedrooms || '2');
    const title = escapeHtml(property.title || 'Untitled Property');
    const locality = escapeHtml(property.locality || '');
    const city = escapeHtml(property.city || '');
    const code = escapeHtml(property.property_code || '');
    const id = escapeHtml(property.id || '');
    const targetIdentifier = code || id;

    const rawImages = Array.isArray(property.images) && property.images.length > 0
      ? property.images
      : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'];
    const totalPhotos = rawImages.length;

    const card = document.createElement('article');
    card.className = 'igrey-public-card';
    card.dataset.propertyId = targetIdentifier;
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View details for ${title}, ${locality}`);

    // Build Photos Markup
    let imagesMarkup = '';
    rawImages.forEach((imgUrl, idx) => {
      const isFirst = idx === 0;
      imagesMarkup += `
        <img 
          src="${escapeHtml(imgUrl)}" 
          alt="${title} photo ${idx + 1}"
          class="carousel-slide-img"
          loading="${isFirst ? 'eager' : 'lazy'}"
          decoding="async"
          style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: ${isFirst ? '1' : '0'}; z-index: ${isFirst ? '2' : '1'}; transition: opacity 300ms ease-in-out;"
        />
      `;
    });

    let arrowsMarkup = '';
    let dotsMarkup = '';
    if (totalPhotos > 1) {
      arrowsMarkup = `
        <button type="button" class="carousel-arrow carousel-arrow-prev" aria-label="Previous photo">
          ${SVG_CHEVRON_LEFT}
        </button>
        <button type="button" class="carousel-arrow carousel-arrow-next" aria-label="Next photo">
          ${SVG_CHEVRON_RIGHT}
        </button>
      `;

      let dotButtons = '';
      rawImages.forEach((_, dIdx) => {
        const isFirst = dIdx === 0;
        dotButtons += `
          <button 
            type="button" 
            class="carousel-dot-btn" 
            aria-label="Photo ${dIdx + 1}" 
            style="width: ${isFirst ? '16px' : '5px'}; height: 5px; border-radius: 3px; background-color: ${isFirst ? '#c9a77c' : 'rgba(255, 255, 255, 0.45)'}; box-shadow: ${isFirst ? '0 0 8px rgba(197, 168, 128, 0.75)' : 'none'}; border: none; padding: 0; cursor: pointer; transition: all 0.25s ease;"
          ></button>
        `;
      });

      dotsMarkup = `
        <div class="carousel-dots-pill">
          ${dotButtons}
        </div>
      `;
    }

    card.innerHTML = `
      <div class="property-carousel-container" style="position: relative; width: 100%; aspect-ratio: 16 / 11; overflow: hidden; background-color: #070B09; user-select: none;">
        <div class="carousel-images-stack" style="position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none;">
          ${imagesMarkup}
        </div>
        <div class="carousel-bottom-gradient" style="position: absolute; left: 0; right: 0; bottom: 0; height: 45px; background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.45) 100%); pointer-events: none; z-index: 3;"></div>
        
        <!-- Status Badge -->
        <div class="property-card-status-badge">
          ${statusText}
        </div>

        <!-- Wishlist Button -->
        <button type="button" class="property-card-heart-btn" aria-label="Save ${title} to wishlist">
          ${SVG_HEART}
        </button>

        ${arrowsMarkup}
        ${dotsMarkup}
      </div>

      <div class="property-card-details">
        <div class="property-card-top-row">
          <span class="property-card-category">${propType.toUpperCase()} • ${bedrooms} BHK</span>
          <span class="property-card-price">${formattedPrice}</span>
        </div>

        <h3 class="property-card-title">${title}</h3>

        <div class="property-card-location">
          ${locality ? `${locality}, ` : ''}${city} • ID: ${code}
        </div>

        <div class="property-card-footer-row">
          <div class="property-card-sale-tag">
            ${SVG_TAG_ICON}
            <span>Property for Sale</span>
          </div>

          <a href="#contact" class="property-card-inquire-link" onclick="event.stopPropagation();">
            <span>Inquire</span>
            <span class="inquire-arrow">&rarr;</span>
          </a>
        </div>
      </div>
    `;

    // Navigation on Card Click
    const navigateToDetails = (e) => {
      // Don't navigate if user clicked the wishlist heart or carousel controls
      if (e.target.closest('.property-card-heart-btn') || e.target.closest('.carousel-arrow') || e.target.closest('.carousel-dot-btn')) {
        return;
      }
      e.preventDefault();
      const basePath = window.location.pathname.includes('/iGrey_Website') ? '/iGrey_Website' : '';
      try {
        window.history.pushState({}, '', `${basePath}/properties/${targetIdentifier}`);
      } catch (_) {}
      window.location.hash = `#/properties/${targetIdentifier}`;
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    card.addEventListener('click', navigateToDetails);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        navigateToDetails(e);
      }
    });

    // Wishlist Toggle
    const heartBtn = card.querySelector('.property-card-heart-btn');
    if (heartBtn) {
      heartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const svg = heartBtn.querySelector('svg');
        const isFaved = heartBtn.classList.toggle('is-favorited');
        if (isFaved) {
          heartBtn.style.color = '#E11D48';
          if (svg) {
            svg.setAttribute('fill', '#E11D48');
            svg.setAttribute('stroke', '#E11D48');
          }
        } else {
          heartBtn.style.color = '#FFFFFF';
          if (svg) {
            svg.setAttribute('fill', 'none');
            svg.setAttribute('stroke', '#FFFFFF');
          }
        }
      });
    }

    // Inquire Link Scroll
    const inquireLink = card.querySelector('.property-card-inquire-link');
    if (inquireLink) {
      inquireLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = '#contact';
        }
      });
    }

    // Initialize photo carousel controls
    initCardCarousel(card);

    return card;
  }

  // --- RENDER COLLECTION INTO CONTAINER ---
  async function renderPropertyCards(targetElementOrSelector, options = {}) {
    const container = typeof targetElementOrSelector === 'string'
      ? document.querySelector(targetElementOrSelector)
      : targetElementOrSelector;

    if (!container) return;

    const { featuredOnly = false } = options;

    // Cache initial static cards as fallback
    if (!container._staticFallback) {
      container._staticFallback = container.innerHTML;
    }

    // Show Skeleton Loading State
    container.innerHTML = createSkeletonHTML(3);

    try {
      const properties = await fetchPublishedProperties({ featuredOnly });

      if (!properties || properties.length === 0) {
        container.innerHTML = createEmptyStateHTML();
        return;
      }

      container.innerHTML = '';
      const grid = document.createElement('div');
      grid.className = 'igrey-public-properties-grid';
      
      properties.forEach((prop) => {
        const card = renderSinglePropertyCard(prop);
        grid.appendChild(card);
      });

      container.appendChild(grid);
    } catch (err) {
      console.warn('[iGrey Properties] Failed to load Supabase listings, retaining fallback showcase:', err);
      // Restore fallback static markup and show a polite retry badge
      if (container._staticFallback) {
        container.innerHTML = container._staticFallback;
      }
      const retryName = `retryLoadProps_${Date.now()}`;
      window[retryName] = () => renderPropertyCards(container, options);
      const banner = document.createElement('div');
      banner.innerHTML = createErrorStateHTML(retryName);
      container.prepend(banner.firstElementChild);
    }
  }

  // --- AUTO-INITIALIZE ON DOM CONTENT LOADED ---
  document.addEventListener('DOMContentLoaded', () => {
    // Inject property card styles dynamically so zero manual CSS edit is required
    injectDynamicPropertyStyles();

    // Look for target containers
    const featuredMount = document.querySelector('[data-igrey-properties="featured"], #featured-properties-container');
    if (featuredMount) {
      renderPropertyCards(featuredMount, { featuredOnly: true });
    }

    const allMount = document.querySelector('[data-igrey-properties="all"], #all-properties-container');
    if (allMount) {
      renderPropertyCards(allMount, { featuredOnly: false });
    }
  });

  // --- CSS INJECTION FOR ZERO-BUILD COMPATIBILITY ---
  function injectDynamicPropertyStyles() {
    if (document.getElementById('igrey-properties-injected-styles')) return;

    const style = document.createElement('style');
    style.id = 'igrey-properties-injected-styles';
    style.textContent = `
      .igrey-public-properties-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 32px;
        width: 100%;
      }
      @media (min-width: 1024px) {
        .igrey-public-properties-grid {
          grid-template-columns: repeat(3, 1fr);
          gap: 36px;
        }
      }
      .igrey-public-card {
        background-color: #0E1412;
        border: 1px solid rgba(197, 168, 128, 0.22);
        border-radius: 4px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.35s ease;
        cursor: pointer;
        outline: none;
      }
      .igrey-public-card:hover, .igrey-public-card:focus-visible {
        transform: translateY(-6px);
        border-color: rgba(197, 168, 128, 0.55);
        box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
      }
      .property-card-status-badge {
        position: absolute;
        top: 16px;
        left: 16px;
        background-color: #FFFFFF;
        padding: 6px 14px;
        font-family: var(--font-sans, 'Manrope', sans-serif);
        font-size: 11px;
        letter-spacing: 0.15em;
        font-weight: 700;
        text-transform: uppercase;
        color: #9a7432;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18);
        border-radius: 2px;
        line-height: 1.2;
        z-index: 30;
        pointer-events: none;
      }
      .property-card-heart-btn {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background-color: rgba(23, 31, 28, 0.65);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        border: 1px solid rgba(255, 255, 255, 0.18);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 30;
        transition: all 0.25s ease;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
        color: #FFFFFF;
        outline: none;
      }
      .property-card-heart-btn:hover {
        background-color: rgba(23, 31, 28, 0.9);
        border-color: rgba(255, 255, 255, 0.35);
        transform: scale(1.08);
      }
      .carousel-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        border: 1px solid rgba(255, 255, 255, 0.28);
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 25;
        padding: 0;
        transition: background-color 0.2s ease, transform 0.2s ease;
        outline: none;
      }
      .carousel-arrow:hover {
        background-color: rgba(0, 0, 0, 0.85);
        transform: translateY(-50%) scale(1.06);
      }
      .carousel-arrow-prev { left: 10px; }
      .carousel-arrow-next { right: 10px; }
      .carousel-dots-pill {
        position: absolute;
        bottom: 12px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 6px;
        background-color: rgba(10, 16, 13, 0.65);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.15);
        padding: 4px 8px;
        border-radius: 999px;
        z-index: 25;
      }
      .property-card-details {
        padding: 24px 22px 20px;
        display: flex;
        flex-direction: column;
        flex: 1;
      }
      .property-card-top-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        gap: 12px;
      }
      .property-card-category {
        font-family: var(--font-sans, 'Manrope', sans-serif);
        font-size: 11px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #c9a77c;
        font-weight: 600;
      }
      .property-card-price {
        font-family: var(--font-sans, 'Manrope', sans-serif);
        font-size: 16px;
        font-weight: 700;
        color: #FAF8F4;
      }
      .property-card-title {
        font-family: var(--font-serif, 'Cormorant Garamond', Georgia, serif);
        font-size: 23px;
        font-weight: 500;
        line-height: 1.25;
        color: #FAF8F4;
        margin: 0 0 8px 0;
      }
      .property-card-location {
        font-family: var(--font-sans, 'Manrope', sans-serif);
        font-size: 13px;
        color: rgba(250, 248, 244, 0.65);
        margin-bottom: 20px;
      }
      .property-card-footer-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 16px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        margin-top: auto;
      }
      .property-card-sale-tag {
        display: flex;
        align-items: center;
        gap: 6px;
        font-family: var(--font-sans, 'Manrope', sans-serif);
        font-size: 12.5px;
        color: #b9b2a2;
      }
      .property-card-inquire-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-family: var(--font-sans, 'Manrope', sans-serif);
        font-size: 12.5px;
        font-weight: 600;
        color: #c9a77c;
        text-decoration: none;
        transition: gap 0.2s ease, color 0.2s ease;
      }
      .property-card-inquire-link:hover {
        color: #dec29f;
        gap: 9px;
      }
      /* Skeletons */
      .igrey-prop-skeleton {
        animation: igreyShimmer 1.6s infinite ease-in-out;
      }
      @keyframes igreyShimmer {
        0% { opacity: 0.55; }
        50% { opacity: 0.85; }
        100% { opacity: 0.55; }
      }
      .skeleton-image-wrapper {
        width: 100%;
        aspect-ratio: 16 / 11;
        background-color: #151d1a;
      }
      .skeleton-body {
        padding: 24px 22px;
      }
      .skeleton-line {
        height: 14px;
        background-color: #17221e;
        border-radius: 3px;
        margin-bottom: 12px;
      }
      .skeleton-meta { width: 45%; }
      .skeleton-title { width: 80%; height: 20px; }
      .skeleton-sub { width: 60%; }
      .skeleton-divider { height: 1px; background-color: rgba(255,255,255,0.06); margin: 18px 0 14px; }
      .skeleton-footer { width: 40%; height: 12px; }
      /* Empty State */
      .igrey-prop-empty-state {
        grid-column: 1 / -1;
        padding: 60px 24px;
        text-align: center;
        background: #0E1412;
        border: 1px dashed rgba(197, 168, 128, 0.3);
        border-radius: 6px;
      }
      .empty-icon-ring {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: rgba(201, 167, 124, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 18px;
      }
      .empty-title {
        font-family: var(--font-serif, 'Cormorant Garamond', Georgia, serif);
        font-size: 26px;
        color: #FAF8F4;
        margin: 0 0 8px 0;
      }
      .empty-subtitle {
        font-family: var(--font-sans, 'Manrope', sans-serif);
        font-size: 14px;
        color: #b9b2a2;
        max-width: 460px;
        margin: 0 auto 22px;
        line-height: 1.5;
      }
      .empty-contact-btn {
        display: inline-block;
        padding: 10px 24px;
        background: #c9a77c;
        color: #0a0f0e;
        font-family: var(--font-sans, 'Manrope', sans-serif);
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        text-decoration: none;
        border-radius: 2px;
        transition: background 0.2s ease;
      }
      .empty-contact-btn:hover { background: #deb88b; }
      /* Retry Error Banner */
      .igrey-prop-error-banner {
        grid-column: 1 / -1;
        background: rgba(224, 122, 111, 0.12);
        border: 1px solid rgba(224, 122, 111, 0.35);
        border-radius: 4px;
        padding: 12px 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 24px;
      }
      .igrey-prop-error-banner .error-msg {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #e07a6f;
        font-family: var(--font-sans, 'Manrope', sans-serif);
        font-size: 13px;
      }
      .btn-retry-sync {
        background: transparent;
        border: 1px solid #e07a6f;
        color: #e07a6f;
        font-family: var(--font-sans, 'Manrope', sans-serif);
        font-size: 12px;
        font-weight: 600;
        padding: 5px 12px;
        border-radius: 2px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .btn-retry-sync:hover {
        background: #e07a6f;
        color: #0a0f0e;
      }
    `;
    document.head.appendChild(style);
  }

  // --- EXPOSE GLOBALS ---
  window.iGreyProperties = {
    fetchPublishedProperties,
    renderPropertyCards,
    renderSinglePropertyCard,
    formatIndianPrice,
    formatStatusBadge,
    escapeHtml,
  };
})();

/**
 * iGREY HOLDINGS — PROPERTIES PAGE CONTROLLER
 * 
 * Implements:
 * (05) Featured & Available Properties:
 *      - Client-side single-select filter chips with instant updates & aria-pressed.
 *      - Property card rendering following the strict typed data model.
 *      - Verified listings only (verified === true).
 *      - Strict pricing rules (salePrice on sale; monthlyRent, deposit, maintenance, tenure, availability on rent/lease).
 *      - "Enquire Now" & "Schedule a Visit" prefilling into Section 06.
 * (06) Tenants & Commercial Occupiers:
 *      - Responsive 2-column layout & 3 occupier cards.
 *      - Tenant enquiry form with segment, tenure, conditional BHK (Residential only),
 *        phone/email/name/consent validation, spam honeypot, double-submit protection,
 *        and integration with enquiryService / localStorage CRM.
 * (07) Property-Backed Insurance for Lease Customers:
 *      - Strict verbatim legal text & shield highlight panel.
 * 
 * TODO:
 * 1. Destination CRM / Email API endpoint: Route lead payloads to webhook or POST /api/leads.
 * 2. Insurance details page: Link #btn-lease-protection to final policy URL.
 * 3. Real property data source: Connect window.IGREY_PROPERTIES_DATA to CMS or Supabase table.
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DATA SOURCE INITIALIZATION
  // =========================================================================

  // Fallback dark placeholder SVG for missing or broken images
  const DARK_PLACEHOLDER_SVG =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%230D1513'/%3E%3Crect x='20' y='20' width='760' height='460' rx='16' fill='none' stroke='%231F2B27' stroke-width='2'/%3E%3Cpath d='M360 210h80v80h-80z' fill='%23DEB686' opacity='0.25'/%3E%3Ctext x='50%25' y='52%25' font-family='sans-serif' font-size='18' fill='%23A3AEA9' text-anchor='middle'%3EiGREY HOLDINGS PROPERTY%3C/text%3E%3C/svg%3E";

  let rawProperties = [];
  if (Array.isArray(window.IGREY_PROPERTIES_DATA) && window.IGREY_PROPERTIES_DATA.length > 0) {
    rawProperties = window.IGREY_PROPERTIES_DATA;
  } else {
    rawProperties = [];
  }

  // Enforce CRITICAL requirement: Only render properties where verified is true!
  const verifiedProperties = rawProperties.filter((p) => p && p.verified === true);

  let activeFilter = 'all';
  let searchQuery = '';
  let currentOpenProperty = null;

  // =========================================================================
  // 2. ESCAPE HTML HELPER
  // =========================================================================
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // =========================================================================
  // 3. FILTERING & SEARCH LOGIC
  // =========================================================================
  function getFilteredProperties() {
    return verifiedProperties.filter((p) => {
      // 1. Search Query Match
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const titleMatch = (p.title || '').toLowerCase().includes(q);
        const locMatch = (p.location || '').toLowerCase().includes(q);
        const idMatch = (p.id || '').toLowerCase().includes(q);
        const typeMatch = (p.type || '').toLowerCase().includes(q);
        if (!titleMatch && !locMatch && !idMatch && !typeMatch) {
          return false;
        }
      }

      // 2. Filter Chip Match
      // All Properties | For Sale | For Rent | For Lease | Residential | Commercial | Land / Plots | Office, Shop / Showroom and Warehouse
      switch (activeFilter) {
        case 'all':
          return true;

        case 'sale':
          return p.listingType === 'sale';

        case 'rent':
          return p.listingType === 'rent';

        case 'lease':
          return p.listingType === 'lease';

        case 'residential': {
          const cat = (p.category || '').toLowerCase();
          const t = (p.type || '').toLowerCase();
          return (
            cat === 'residential' ||
            t.includes('villa') ||
            t.includes('apartment') ||
            t.includes('residence') ||
            t.includes('penthouse') ||
            t.includes('duplex')
          );
        }

        case 'commercial': {
          const cat = (p.category || '').toLowerCase();
          const t = (p.type || '').toLowerCase();
          return (
            cat.includes('commercial') ||
            cat.includes('office') ||
            t.includes('office') ||
            t.includes('shop') ||
            t.includes('showroom') ||
            t.includes('warehouse') ||
            t.includes('commercial')
          );
        }

        case 'land': {
          const cat = (p.category || '').toLowerCase();
          const t = (p.type || '').toLowerCase();
          return cat.includes('land') || cat.includes('plot') || t.includes('land') || t.includes('plot');
        }

        case 'office-warehouse': {
          const cat = (p.category || '').toLowerCase();
          const t = (p.type || '').toLowerCase();
          return (
            cat === 'office, shop / showroom and warehouse' ||
            t.includes('office') ||
            t.includes('shop') ||
            t.includes('showroom') ||
            t.includes('warehouse') ||
            t.includes('logistics')
          );
        }

        default:
          return true;
      }
    });
  }

  // =========================================================================
  // 4. PROPERTY CARD RENDERER
  // =========================================================================
  function renderPropertyCard(prop) {
    const safeId = escapeHtml(prop.id);
    const safeTitle = escapeHtml(prop.title);
    const safeType = escapeHtml(prop.type);
    const safeLocation = escapeHtml(prop.location);

    // Status Badge determination
    // Available green, Upcoming blue, Under Offer amber, Rented/Leased/Sold neutral grey
    const statusLower = (prop.status || 'Available').toLowerCase();
    let statusClass = 'status-available';
    let statusLabel = 'Available';

    if (statusLower.includes('sold') || statusLower.includes('rented') || statusLower.includes('leased')) {
      statusClass = 'status-closed';
      statusLabel = prop.status;
    } else if (statusLower.includes('offer')) {
      statusClass = 'status-under-offer';
      statusLabel = 'Under Offer';
    } else if (statusLower.includes('upcoming')) {
      statusClass = 'status-upcoming';
      statusLabel = 'Upcoming';
    } else {
      statusClass = 'status-available';
      statusLabel = 'Available';
    }

    // Listing Type Tag
    let listingTypeLabel = 'For Sale';
    if (prop.listingType === 'rent') listingTypeLabel = 'For Rent';
    if (prop.listingType === 'lease') listingTypeLabel = 'For Lease';

    // Primary Image with fallback
    const coverImage = Array.isArray(prop.images) && prop.images.length > 0 ? prop.images[0] : DARK_PLACEHOLDER_SVG;

    // Key Specs Chips
    const specsHtml = Array.isArray(prop.keySpecs)
      ? prop.keySpecs
          .slice(0, 4)
          .map((s) => `<li class="property-spec-chip">${escapeHtml(s)}</li>`)
          .join('')
      : '';

    // Pricing Block
    // Sale listings: sale price.
    // Rental/lease listings: monthly rent, security deposit, maintenance charges where applicable, lease tenure and availability date.
    // NEVER show a sale price on a rental or lease listing.
    let pricingHtml = '';
    if (prop.listingType === 'sale') {
      const priceText = escapeHtml(prop.salePrice || 'Price on Request');
      pricingHtml = `
        <div class="property-pricing-box">
          <div class="sale-pricing-wrap">
            <span class="pricing-label">Guide Price</span>
            <span class="pricing-figure-sale">${priceText}</span>
          </div>
        </div>
      `;
    } else {
      const rentText = escapeHtml(prop.monthlyRent || 'Rent on Request');
      const depositText = escapeHtml(prop.securityDeposit || 'N/A');
      const maintText = prop.maintenanceCharges ? escapeHtml(prop.maintenanceCharges) : null;
      const tenureText = escapeHtml(prop.leaseTenure || 'Flexible');
      const availText = escapeHtml(prop.availabilityDate || 'Immediate');

      pricingHtml = `
        <div class="property-pricing-box">
          <div class="rent-pricing-wrap">
            <div class="rent-main-row">
              <span class="pricing-label">Monthly Rent</span>
              <div>
                <span class="pricing-figure-rent">${rentText}</span>
              </div>
            </div>
            <div class="rent-specs-grid">
              <div class="rent-spec-item">
                <span class="lbl">Deposit:</span>
                <span class="val">${depositText}</span>
              </div>
              <div class="rent-spec-item">
                <span class="lbl">Tenure:</span>
                <span class="val">${tenureText}</span>
              </div>
              ${
                maintText
                  ? `
                <div class="rent-spec-item">
                  <span class="lbl">Maint:</span>
                  <span class="val">${maintText}</span>
                </div>
              `
                  : ''
              }
              <div class="rent-spec-item">
                <span class="lbl">Available:</span>
                <span class="val">${availText}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <article
        class="property-card"
        data-property-id="${safeId}"
        tabindex="0"
        role="region"
        aria-label="${safeTitle} - ${listingTypeLabel}"
      >
        <div class="property-card-media">
          <img
            src="${escapeHtml(coverImage)}"
            alt="${safeTitle} - ${safeType}"
            class="property-card-img"
            loading="lazy"
            decoding="async"
            onerror="if(this.src!=='${DARK_PLACEHOLDER_SVG}'){this.onerror=null;this.src='${DARK_PLACEHOLDER_SVG}';}"
          />
          <span class="card-badge-status ${statusClass}">${statusLabel}</span>
          <span class="card-badge-listing-type">${listingTypeLabel}</span>
        </div>

        <div class="property-card-body">
          <div class="property-type-tag">${safeType}</div>
          <h3 class="property-card-title">${safeTitle}</h3>

          <div class="property-card-location">
            <div class="location-inner">
              <span class="location-diamond" aria-hidden="true">✦</span>
              <span>${safeLocation}</span>
            </div>
            <span class="property-id-pill">ID: ${safeId}</span>
          </div>

          <ul class="property-specs-list" aria-label="Key specifications">
            ${specsHtml}
          </ul>

          ${pricingHtml}

          <!-- Actions: Enquire Now & Schedule a Visit -->
          <div class="property-card-actions">
            <button
              type="button"
              class="btn-primary-gold card-action-btn"
              data-action="enquire"
              data-prop-id="${safeId}"
              data-prop-title="${safeTitle}"
              aria-label="Enquire about ${safeTitle}"
            >
              Enquire Now
            </button>
            <button
              type="button"
              class="btn-secondary-outline card-action-btn"
              data-action="schedule"
              data-prop-id="${safeId}"
              data-prop-title="${safeTitle}"
              aria-label="Schedule a visit for ${safeTitle}"
            >
              Schedule a Visit
            </button>
          </div>
        </div>
      </article>
    `;
  }

  // =========================================================================
  // 5. GRID RENDER & DOM BINDINGS
  // =========================================================================
  function renderGrid() {
    const grid = document.getElementById('properties-grid');
    const resultsCountEl = document.getElementById('results-count');
    if (!grid) return;

    const filtered = getFilteredProperties();

    if (resultsCountEl) {
      resultsCountEl.textContent = filtered.length;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="properties-empty-state">
          <div class="empty-state-icon" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/>
            </svg>
          </div>
          <h3 class="empty-state-title">No Properties Match Your Filter</h3>
          <p class="empty-state-desc">
            We currently do not have matching listings under this specific filter. Explore other categories or contact our advisory desk directly.
          </p>
          <button type="button" class="btn-primary-gold" id="btn-reset-filters">
            Show All Properties
          </button>
        </div>
      `;

      const resetBtn = document.getElementById('btn-reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeFilter = 'all';
          searchQuery = '';
          const searchInput = document.getElementById('properties-search-input');
          if (searchInput) searchInput.value = '';
          const clearBtn = document.getElementById('search-clear-btn');
          if (clearBtn) clearBtn.style.display = 'none';

          updateFilterChipUI();
          renderGrid();
        });
      }
      return;
    }

    grid.innerHTML = filtered.map(renderPropertyCard).join('');
    bindCardEvents();
  }

  function updateFilterChipUI() {
    const chips = document.querySelectorAll('.filter-chip');
    chips.forEach((chip) => {
      const chipFilter = chip.getAttribute('data-filter');
      const isActive = chipFilter === activeFilter;
      chip.classList.toggle('active', isActive);
      chip.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  // =========================================================================
  // 6. CARD ACTIONS & MODAL EVENTS
  // =========================================================================
  function bindCardEvents() {
    const cards = document.querySelectorAll('.property-card');

    cards.forEach((card) => {
      const propId = card.getAttribute('data-property-id');
      const prop = verifiedProperties.find((p) => p.id === propId);

      // Card click opens full modal details
      card.addEventListener('click', (e) => {
        // Do not trigger modal if clicking directly on buttons
        if (e.target.closest('.card-action-btn')) {
          return;
        }
        if (prop) openPropertyModal(prop);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          if (!e.target.closest('.card-action-btn') && prop) {
            openPropertyModal(prop);
          }
        }
      });
    });

    // Action button clicks: Enquire Now & Schedule a Visit
    const actionBtns = document.querySelectorAll('.card-action-btn');
    actionBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const propId = btn.getAttribute('data-prop-id');
        const propTitle = btn.getAttribute('data-prop-title');
        const action = btn.getAttribute('data-action');
        triggerEnquiryFlow(propId, propTitle, action);
      });
    });
  }

  // =========================================================================
  // 7. PREFILL ENQUIRY FLOW (Section 06 wiring)
  // =========================================================================
  function triggerEnquiryFlow(propertyId, propertyTitle, actionType) {
    const formSection = document.getElementById('section-06-tenants');
    const form = document.getElementById('tenant-enquiry-form');
    const prefillBanner = document.getElementById('enquiry-prefill-banner');
    const prefillTitleEl = document.getElementById('prefill-property-title');
    const prefillIdEl = document.getElementById('prefill-property-id');

    const prop = verifiedProperties.find((p) => p.id === propertyId);

    // Update banner
    if (prefillBanner && prefillTitleEl && prefillIdEl) {
      prefillTitleEl.textContent = propertyTitle || (prop ? prop.title : 'Selected Property');
      prefillIdEl.textContent = `(${propertyId})`;
      prefillBanner.style.display = 'flex';
    }

    if (form && prop) {
      // 1. Segment radio
      let targetSegment = 'Residential';
      if (prop.category === 'Commercial' || prop.category === 'Office, Shop / Showroom and Warehouse') {
        targetSegment = 'Commercial';
      } else if (prop.type.toLowerCase().includes('warehouse') || prop.type.toLowerCase().includes('industrial')) {
        targetSegment = 'Industrial';
      }
      const segmentRadio = form.querySelector(`input[name="segment"][value="${targetSegment}"]`);
      if (segmentRadio) {
        segmentRadio.checked = true;
        updateBhkVisibility(targetSegment);
      }

      // 2. Tenure Type
      const tenureRadio = form.querySelector(
        `input[name="tenureType"][value="${prop.listingType === 'lease' ? 'Lease' : 'Rent'}"]`
      );
      if (tenureRadio) tenureRadio.checked = true;

      // 3. Location
      const locInput = form.querySelector('#tenant-location');
      if (locInput) locInput.value = prop.location || '';

      // 4. Budget
      const budgetInput = form.querySelector('#tenant-budget');
      if (budgetInput) {
        budgetInput.value = prop.salePrice || prop.monthlyRent || '';
      }

      // 5. Additional Requirements Note
      const reqInput = form.querySelector('#tenant-requirements');
      if (reqInput) {
        const actionVerb = actionType === 'schedule' ? 'Schedule an in-person viewing visit' : 'Inquire for acquisition/lease particulars';
        reqInput.value = `Enquiry for ${prop.title} [ID: ${prop.id}]. Request: ${actionVerb}.`;
      }
    }

    // Smooth scroll down to enquiry form
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const nameInput = document.getElementById('tenant-name');
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 600);
      }
    }
  }

  // Clear prefilled property banner
  function clearPrefillBanner() {
    const prefillBanner = document.getElementById('enquiry-prefill-banner');
    if (prefillBanner) prefillBanner.style.display = 'none';
  }

  // =========================================================================
  // 8. TENANT ENQUIRY FORM VALIDATION & HANDLING
  // =========================================================================
  function updateBhkVisibility(segmentValue) {
    const bhkGroup = document.getElementById('tenant-bhk-group');
    if (!bhkGroup) return;
    // BHK: show ONLY when Residential is selected
    if (segmentValue === 'Residential') {
      bhkGroup.style.display = 'flex';
    } else {
      bhkGroup.style.display = 'none';
    }
  }

  function initTenantForm() {
    const form = document.getElementById('tenant-enquiry-form');
    if (!form) return;

    // Segment radio change: toggle BHK
    const segmentRadios = form.querySelectorAll('input[name="segment"]');
    segmentRadios.forEach((radio) => {
      radio.addEventListener('change', (e) => {
        updateBhkVisibility(e.target.value);
      });
    });

    // Clear prefill button
    const clearPrefillBtn = document.getElementById('clear-prefill-btn');
    if (clearPrefillBtn) {
      clearPrefillBtn.addEventListener('click', clearPrefillBanner);
    }

    // Submit handler with rate limiting, honeypot spam protection, validation, and double-submit prevention
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Clear previous error states
      const errorSpans = form.querySelectorAll('.field-error-msg');
      errorSpans.forEach((s) => {
        s.textContent = '';
        s.classList.remove('has-error');
      });
      const invalidInputs = form.querySelectorAll('.is-invalid');
      invalidInputs.forEach((i) => i.classList.remove('is-invalid'));
      const generalError = document.getElementById('tenant-form-general-error');
      if (generalError) {
        generalError.textContent = '';
        generalError.style.display = 'none';
      }

      // 1. Honeypot check (silent drop for bot traffic)
      const honeypot = form.querySelector('input[name="_gotcha_honey"]');
      if (honeypot && honeypot.value.trim() !== '') {
        console.warn('Spam submission detected by honeypot.');
        showFormSuccess({ fullName: 'Guest' });
        return;
      }

      // 2. Client-side rate limiting (max 3 submissions per minute)
      const now = Date.now();
      const lastSubmits = JSON.parse(sessionStorage.getItem('igrey_submit_timestamps') || '[]');
      const recentSubmits = lastSubmits.filter((ts) => now - ts < 60000);
      if (recentSubmits.length >= 3) {
        if (generalError) {
          generalError.textContent = 'Too many requests. Please wait a moment before submitting again.';
          generalError.style.display = 'block';
        }
        return;
      }

      // 3. Validation: name, phone and email required with proper formats, and consent must be ticked
      const nameInput = form.querySelector('#tenant-name');
      const phoneInput = form.querySelector('#tenant-phone');
      const emailInput = form.querySelector('#tenant-email');
      const consentCheckbox = form.querySelector('#tenant-consent');

      let hasErrors = false;

      // Name validation
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal || nameVal.length < 2) {
        markFieldError('tenant-name', 'Please enter your full name.');
        hasErrors = true;
      }

      // Phone validation (at least 10 digits/characters, standard phone regex)
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;
      const digitsOnly = phoneVal.replace(/[^0-9]/g, '');
      if (!phoneVal || digitsOnly.length < 10 || !phoneRegex.test(phoneVal)) {
        markFieldError('tenant-phone', 'Please enter a valid phone number (at least 10 digits).');
        hasErrors = true;
      }

      // Email validation
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailRegex.test(emailVal)) {
        markFieldError('tenant-email', 'Please provide a valid corporate or personal email address.');
        hasErrors = true;
      }

      // Consent validation
      if (!consentCheckbox || !consentCheckbox.checked) {
        markFieldError('tenant-consent', 'You must consent to being contacted regarding this enquiry.');
        hasErrors = true;
      }

      if (hasErrors) {
        return;
      }

      // 4. Submission processing: disable submit button to prevent double submits
      const submitBtn = document.getElementById('tenant-submit-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Transmitting Enquiry...</span>';
      }

      // Collect complete payload
      const formData = new FormData(form);
      const prefillIdEl = document.getElementById('prefill-property-id');
      const prefillTitleEl = document.getElementById('prefill-property-title');
      const selectedPropId = prefillIdEl && prefillBanner && prefillBanner.style.display !== 'none'
        ? prefillIdEl.textContent.replace(/[()]/g, '').trim()
        : '';
      const selectedPropTitle = prefillTitleEl && prefillBanner && prefillBanner.style.display !== 'none'
        ? prefillTitleEl.textContent.trim()
        : '';

      const payload = {
        customerName: nameVal,
        email: emailVal,
        phone: phoneVal,
        role: formData.get('segment') || 'Residential',
        tenureType: formData.get('tenureType') || 'Rent',
        preferredLocation: formData.get('preferredLocation') || '',
        propertyType: formData.get('propertyType') || '',
        bhk: formData.get('bhk') || '',
        budget: formData.get('budget') || '',
        moveInDate: formData.get('moveInDate') || '',
        tenure: formData.get('tenure') || '',
        message: formData.get('additionalRequirements') || '',
        interestedPropertyId: selectedPropId,
        interestedPropertyTitle: selectedPropTitle,
        consentGiven: true,
        status: 'New',
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
      };

      try {
        // Record rate-limit timestamp
        recentSubmits.push(now);
        sessionStorage.setItem('igrey_submit_timestamps', JSON.stringify(recentSubmits));

        // Save to project's localStorage enquiry database (CRM sync)
        const ENQUIRIES_KEY = 'igrey_admin_enquiries_v1';
        let existing = [];
        try {
          existing = JSON.parse(localStorage.getItem(ENQUIRIES_KEY) || '[]');
        } catch (_err) {
          existing = [];
        }

        const newLead = {
          ...payload,
          id: `enq-${Date.now()}`,
          internalNotes: [`Submitted from Properties page form. Pre-qualified: ${payload.role} (${payload.tenureType})`],
        };
        existing.unshift(newLead);
        localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(existing));

        // Dispatch project event so admin dashboard picks it up live
        window.dispatchEvent(new CustomEvent('igrey_enquiries_updated'));

        /**
         * TODO: BACKEND / CRM ENDPOINT INTEGRATION
         * Destination Inbox / CRM Webhook:
         * e.g., await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
         */

        // Artificial smooth delay for UX
        await new Promise((res) => setTimeout(res, 600));

        showFormSuccess(payload);
      } catch (err) {
        console.error('Failed to submit enquiry:', err);
        if (generalError) {
          generalError.textContent = 'A network error occurred while submitting. Please try again.';
          generalError.style.display = 'block';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Submit Enquiry</span>';
        }
      }
    });

    // Reset button in success state
    const resetFormBtn = document.getElementById('btn-submit-another');
    if (resetFormBtn) {
      resetFormBtn.addEventListener('click', () => {
        form.reset();
        clearPrefillBanner();
        const successBox = document.getElementById('tenant-form-success');
        if (successBox) successBox.style.display = 'none';
        form.style.display = 'flex';
      });
    }
  }

  function markFieldError(fieldId, errorText) {
    const errorEl = document.getElementById(`err-${fieldId}`);
    const inputEl = document.getElementById(fieldId);
    if (errorEl) {
      errorEl.textContent = errorText;
      errorEl.classList.add('has-error');
    }
    if (inputEl) {
      inputEl.classList.add('is-invalid');
      inputEl.focus();
    }
  }

  function showFormSuccess(payload) {
    const form = document.getElementById('tenant-enquiry-form');
    const successBox = document.getElementById('tenant-form-success');
    const successMsg = document.getElementById('tenant-success-message');

    if (form) form.style.display = 'none';
    if (successMsg) {
      const name = payload.fullName || payload.customerName || 'Valued Client';
      successMsg.textContent = `Thank you, ${name}. Your requirements have been registered with the iGREY HOLDINGS leasing team. A dedicated client partner will contact you shortly.`;
    }
    if (successBox) successBox.style.display = 'block';
  }

  // =========================================================================
  // 9. PROPERTY DETAILS MODAL
  // =========================================================================
  function openPropertyModal(prop) {
    currentOpenProperty = prop;
    const modal = document.getElementById('property-details-modal');
    if (!modal) return;

    const safeTitle = escapeHtml(prop.title);
    const safeType = escapeHtml(prop.type);
    const safeLocation = escapeHtml(prop.location);
    const safeDesc = escapeHtml(prop.description || 'Exclusive architectural residence curated by iGrey Holdings.');
    const images = Array.isArray(prop.images) && prop.images.length > 0 ? prop.images : [DARK_PLACEHOLDER_SVG];

    // Price string
    const priceDisplay = prop.listingType === 'sale'
      ? escapeHtml(prop.salePrice || 'Price on Request')
      : `${escapeHtml(prop.monthlyRent || 'Rent on Request')} (Deposit: ${escapeHtml(prop.securityDeposit || 'N/A')})`;

    // Specs
    const specsHtml = Array.isArray(prop.keySpecs)
      ? prop.keySpecs.map((s) => `<div class="modal-spec-row">✦ ${escapeHtml(s)}</div>`).join('')
      : '';

    // Thumbnails
    const thumbsHtml = images
      .map(
        (src, idx) => `
        <button type="button" class="modal-thumb-btn ${idx === 0 ? 'active' : ''}" data-thumb-idx="${idx}" aria-label="View photo ${idx + 1}">
          <img src="${escapeHtml(src)}" alt="Thumbnail ${idx + 1}" onerror="this.src='${DARK_PLACEHOLDER_SVG}';" />
        </button>
      `
      )
      .join('');

    modal.innerHTML = `
      <div class="property-modal-card" role="document">
        <button type="button" class="modal-close-btn" id="modal-close-action" aria-label="Close dialog">✕</button>

        <!-- Gallery Column -->
        <div class="modal-gallery-col">
          <div class="modal-main-image-box">
            <img id="modal-main-image" src="${escapeHtml(images[0])}" alt="${safeTitle}" onerror="this.src='${DARK_PLACEHOLDER_SVG}';" />
          </div>
          ${images.length > 1 ? `<div class="modal-thumbnails-row">${thumbsHtml}</div>` : ''}
        </div>

        <!-- Info Column -->
        <div class="modal-info-col">
          <span class="modal-type-tag">${safeType} • ID: ${escapeHtml(prop.id)}</span>
          <h2 class="modal-property-title">${safeTitle}</h2>
          <div class="modal-property-location">✦ ${safeLocation}</div>

          <div class="modal-price-box">
            <div class="modal-price-val">${priceDisplay}</div>
          </div>

          <p class="modal-desc-text">${safeDesc}</p>

          <div class="modal-specs-grid">
            ${specsHtml}
          </div>

          <div class="modal-actions-row">
            <button
              type="button"
              class="btn-primary-gold"
              id="modal-btn-enquire"
              aria-label="Enquire about this property"
            >
              Enquire Now
            </button>
            <button
              type="button"
              class="btn-secondary-outline"
              id="modal-btn-schedule"
              aria-label="Schedule a visit for this property"
            >
              Schedule a Visit
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Close button
    const closeBtn = modal.querySelector('#modal-close-action');
    if (closeBtn) closeBtn.addEventListener('click', closePropertyModal);

    // Thumbnail click
    const thumbBtns = modal.querySelectorAll('.modal-thumb-btn');
    const mainImg = modal.querySelector('#modal-main-image');
    thumbBtns.forEach((tb) => {
      tb.addEventListener('click', () => {
        const idx = parseInt(tb.getAttribute('data-thumb-idx'), 10) || 0;
        if (mainImg) mainImg.src = images[idx] || images[0];
        thumbBtns.forEach((b) => b.classList.remove('active'));
        tb.classList.add('active');
      });
    });

    // Enquire / Schedule buttons inside modal
    const modalEnquire = modal.querySelector('#modal-btn-enquire');
    if (modalEnquire) {
      modalEnquire.addEventListener('click', () => {
        closePropertyModal();
        triggerEnquiryFlow(prop.id, prop.title, 'enquire');
      });
    }
    const modalSchedule = modal.querySelector('#modal-btn-schedule');
    if (modalSchedule) {
      modalSchedule.addEventListener('click', () => {
        closePropertyModal();
        triggerEnquiryFlow(prop.id, prop.title, 'schedule');
      });
    }
  }

  function closePropertyModal() {
    const modal = document.getElementById('property-details-modal');
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    currentOpenProperty = null;
  }

  // Keyboard escape closes modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePropertyModal();
    }
  });

  // Click outside modal card closes modal
  const modalBackdrop = document.getElementById('property-details-modal');
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closePropertyModal();
      }
    });
  }

  // =========================================================================
  // 10. SECTION 07 INSURANCE CTA INTERACTION
  // =========================================================================
  function initInsuranceSection() {
    const btn = document.getElementById('btn-lease-protection');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      /**
       * TODO: Point this CTA to the dedicated lease protection page when ready:
       * window.location.href = './lease-protection.html';
       */
      const formSection = document.getElementById('section-06-tenants');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const tenureRadio = document.querySelector('input[name="tenureType"][value="Lease"]');
        if (tenureRadio) tenureRadio.checked = true;
        const reqInput = document.getElementById('tenant-requirements');
        if (reqInput) {
          reqInput.value = 'Inquiry regarding Property-Backed Insurance for Eligible Lease Arrangements.';
        }
      }
    });
  }

  // =========================================================================
  // 11. INITIALIZATION & CONTROLS BINDING
  // =========================================================================
  function initControls() {
    // 0. Initial Filter from URL search params (e.g. ?type=rent or ?filter=lease)
    try {
      if (typeof window !== 'undefined' && window.location.search) {
        const urlParams = new URLSearchParams(window.location.search);
        const param = (urlParams.get('type') || urlParams.get('filter') || '').toLowerCase();
        if (param === 'rent' || param === 'for rent') {
          activeFilter = 'rent';
        } else if (param === 'lease' || param === 'for lease') {
          activeFilter = 'lease';
        } else if (param === 'sale' || param === 'for sale') {
          activeFilter = 'sale';
        } else if (param === 'residential') {
          activeFilter = 'residential';
        } else if (param === 'commercial') {
          activeFilter = 'commercial';
        } else if (param === 'land') {
          activeFilter = 'land';
        }
        updateFilterChipUI();
      }
    } catch (_) {}

    // 1. Filter Chips Click Handling
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        activeFilter = chip.getAttribute('data-filter') || 'all';
        updateFilterChipUI();
        renderGrid();
      });
    });

    // 2. Search Input Handling (instant debounced filter)
    const searchInput = document.getElementById('properties-search-input');
    const searchClearBtn = document.getElementById('search-clear-btn');
    let debounceTimer = null;

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        searchQuery = e.target.value.trim();
        if (searchClearBtn) {
          searchClearBtn.style.display = searchQuery ? 'block' : 'none';
        }
        debounceTimer = setTimeout(() => {
          renderGrid();
        }, 180);
      });
    }

    if (searchClearBtn) {
      searchClearBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        searchQuery = '';
        searchClearBtn.style.display = 'none';
        renderGrid();
      });
    }

    // 3. Section 06 CTA buttons
    const findPropertyBtn = document.getElementById('btn-find-property');
    if (findPropertyBtn) {
      findPropertyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const form = document.getElementById('tenant-enquiry-form');
        if (form) {
          form.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const nameInput = document.getElementById('tenant-name');
          if (nameInput) setTimeout(() => nameInput.focus(), 500);
        }
      });
    }

    const browsePropertiesBtn = document.getElementById('btn-browse-properties');
    if (browsePropertiesBtn) {
      browsePropertiesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const sec5 = document.getElementById('section-05-properties');
        if (sec5) {
          sec5.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  }

  // DOMContentLoaded / Script Exec
  function init() {
    initControls();
    initTenantForm();
    initInsuranceSection();
    renderGrid();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

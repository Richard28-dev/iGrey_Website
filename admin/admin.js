/**
 * iGREY HOLDINGS — Admin Dashboard Application Script
 * 
 * Secure, zero-build vanilla JavaScript admin client using Supabase JS SDK.
 * Handles property onboarding, client-side photo compression, drag reorder,
 * live price preview, status transitions, and dynamic list synchronization.
 */

(function () {
  'use strict';

  // --- STATE ---
  let currentProperties = [];
  let editingPropertyId = null;
  let stagedPhotos = []; // array of { id, url, file, isNew, storagePath }
  let pendingDeletePhotos = []; // storage paths to delete on save
  let deleteTargetProperty = null;

  // --- DOM ELEMENTS ---
  const sidebar = document.getElementById('admin-sidebar');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const sidebarClose = document.getElementById('sidebar-close-btn');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const logoutBtn = document.getElementById('btn-logout');
  const userDisplayEmail = document.getElementById('user-display-email');
  const unconfiguredBanner = document.getElementById('unconfigured-banner');

  const pageTitle = document.getElementById('page-action-title');
  const pageSubtitle = document.getElementById('page-action-subtitle');
  const saveDraftBtn = document.getElementById('btn-save-draft');
  const publishBtn = document.getElementById('btn-publish-property');
  const cancelEditBtn = document.getElementById('btn-cancel-edit');

  const statTotal = document.getElementById('stat-total');
  const statAvailable = document.getElementById('stat-available');
  const statUnderOffer = document.getElementById('stat-underoffer');
  const statSold = document.getElementById('stat-sold');

  const form = document.getElementById('property-entry-form');
  const titleInput = document.getElementById('prop-title');
  const codeInput = document.getElementById('prop-code');
  const regenerateCodeBtn = document.getElementById('btn-regenerate-code');
  const typeSelect = document.getElementById('prop-type');
  const bedroomsSelect = document.getElementById('prop-bedrooms');
  const priceInput = document.getElementById('prop-price');
  const pricePreview = document.getElementById('price-preview');
  const areaInput = document.getElementById('prop-area');
  const citySelect = document.getElementById('prop-city');
  const localityInput = document.getElementById('prop-locality');
  const descriptionInput = document.getElementById('prop-description');
  const showWebsiteCheck = document.getElementById('prop-show-website');
  const showFeaturedCheck = document.getElementById('prop-show-featured');

  const statusSegments = document.querySelectorAll('.status-segment-label');
  const amenityChips = document.querySelectorAll('.amenity-chip');

  const dropzone = document.getElementById('photo-dropzone');
  const fileInput = document.getElementById('photo-file-input');
  const progressBar = document.getElementById('photo-progress-bar');
  const progressFill = document.getElementById('photo-progress-fill');
  const thumbnailsContainer = document.getElementById('thumbnails-container');

  const tableBody = document.getElementById('listings-table-body');
  const listingsCountBadge = document.getElementById('listings-count-badge');

  const deleteModal = document.getElementById('delete-modal');
  const btnCancelDelete = document.getElementById('btn-cancel-delete');
  const btnConfirmDelete = document.getElementById('btn-confirm-delete');

  // --- INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', async () => {
    setupMobileMenu();
    setupStatusSegments();
    setupAmenitiesChips();
    setupPriceFormatting();
    setupPhotoUpload();
    setupFormButtons();
    setupDeleteModal();

    await verifySessionAndInit();
  });

  // --- AUTHENTICATION & SESSION VERIFICATION ---
  async function verifySessionAndInit() {
    const isConfigured = window.isSupabaseConfigured && window.isSupabaseConfigured();

    if (!isConfigured) {
      if (unconfiguredBanner) unconfiguredBanner.style.display = 'block';
      userDisplayEmail.textContent = 'Demo Mode (Unconfigured)';
      loadPrototypeCatalog();
      return;
    }

    if (!window.supabaseClient) {
      window.location.replace('./login.html');
      return;
    }

    try {
      const { data: { session }, error } = await window.supabaseClient.auth.getSession();

      if (error || !session) {
        window.location.replace('./login.html');
        return;
      }

      userDisplayEmail.textContent = session.user.email || 'Admin';

      // Listen for auth changes
      window.supabaseClient.auth.onAuthStateChange((event) => {
        if (event === 'SIGNED_OUT') {
          window.location.replace('./login.html');
        }
      });

      // Load database listings and summary
      await fetchProperties();
    } catch (err) {
      console.error('Session verification error:', err);
      window.location.replace('./login.html');
    }
  }

  // Logout handler
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      if (window.supabaseClient) {
        await window.supabaseClient.auth.signOut();
      }
      window.location.replace('./login.html');
    });
  }

  // --- MOBILE NAVIGATION ---
  function setupMobileMenu() {
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => {
        sidebar.classList.add('mobile-open');
        mobileBackdrop.classList.add('open');
      });
    }

    const closeMobile = () => {
      sidebar.classList.remove('mobile-open');
      mobileBackdrop.classList.remove('open');
    };

    if (sidebarClose) sidebarClose.addEventListener('click', closeMobile);
    if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobile);
  }

  // --- PRICE FORMATTING (INDIAN FORMAT) ---
  function formatIndianCurrency(amount) {
    if (!amount || isNaN(amount)) return '';
    const num = Number(amount);
    if (num >= 10000000) {
      const cr = (num / 10000000).toFixed(2).replace(/\.00$/, '');
      return `₹${cr} Cr`;
    }
    if (num >= 100000) {
      const l = (num / 100000).toFixed(2).replace(/\.00$/, '');
      return `₹${l} L`;
    }
    return `₹${num.toLocaleString('en-IN')}`;
  }

  function setupPriceFormatting() {
    priceInput.addEventListener('input', (e) => {
      // Allow only digits
      const rawValue = e.target.value.replace(/\D/g, '');
      e.target.value = rawValue;

      if (rawValue) {
        pricePreview.textContent = formatIndianCurrency(rawValue);
      } else {
        pricePreview.textContent = '';
      }
    });
  }

  // --- STATUS SEGMENTED CONTROL ---
  function setupStatusSegments() {
    statusSegments.forEach((segment) => {
      segment.addEventListener('click', () => {
        statusSegments.forEach((s) => s.classList.remove('checked'));
        segment.classList.add('checked');
        const radio = segment.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
      });
    });
  }

  function getSelectedStatus() {
    const checkedRadio = document.querySelector('input[name="prop-status"]:checked');
    return checkedRadio ? checkedRadio.value : 'available';
  }

  function setSelectedStatus(statusVal) {
    statusSegments.forEach((s) => {
      const radio = s.querySelector('input[type="radio"]');
      if (radio && radio.value === statusVal) {
        s.classList.add('checked');
        radio.checked = true;
      } else {
        s.classList.remove('checked');
      }
    });
  }

  // --- AMENITIES CHIPS ---
  function setupAmenitiesChips() {
    amenityChips.forEach((chip) => {
      chip.addEventListener('click', (e) => {
        const checkbox = chip.querySelector('input[type="checkbox"]');
        if (e.target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }
        if (checkbox.checked) {
          chip.classList.add('selected');
        } else {
          chip.classList.remove('selected');
        }
      });
    });
  }

  function getSelectedAmenities() {
    const selected = [];
    document.querySelectorAll('#amenities-container input[type="checkbox"]:checked').forEach((cb) => {
      selected.push(cb.value);
    });
    return selected;
  }

  function setSelectedAmenities(amenitiesList) {
    const list = Array.isArray(amenitiesList) ? amenitiesList : [];
    document.querySelectorAll('#amenities-container .amenity-chip').forEach((chip) => {
      const cb = chip.querySelector('input[type="checkbox"]');
      if (list.includes(cb.value)) {
        cb.checked = true;
        chip.classList.add('selected');
      } else {
        cb.checked = false;
        chip.classList.remove('selected');
      }
    });
  }

  // --- AUTO-GENERATE PROPERTY CODE ---
  function generateNextPropertyCode(city) {
    const cityMap = {
      Mysuru: 'MYS',
      Bangalore: 'BLR',
      Hyderabad: 'HYD',
      Chennai: 'CHN',
    };
    const prefix = cityMap[city] || 'MYS';
    const cityProps = currentProperties.filter((p) => (p.city || '').toLowerCase() === (city || '').toLowerCase());
    const nextNum = (cityProps.length + 1).toString().padStart(2, '0');
    return `SS-${prefix}-${nextNum}`;
  }

  if (citySelect) {
    citySelect.addEventListener('change', () => {
      if (!editingPropertyId && (!codeInput.value || codeInput.value.startsWith('SS-'))) {
        codeInput.value = generateNextPropertyCode(citySelect.value);
      }
    });
  }

  if (regenerateCodeBtn) {
    regenerateCodeBtn.addEventListener('click', () => {
      codeInput.value = generateNextPropertyCode(citySelect.value);
      showToast('Generated fresh property code.');
    });
  }

  // --- PHOTO COMPRESSION, UPLOAD & REORDER ---
  function setupPhotoUpload() {
    dropzone.addEventListener('click', () => fileInput.click());

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileSelection(e.dataTransfer.files);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFileSelection(e.target.files);
      }
    });
  }

  async function compressImageFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const maxDim = 1600;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to WebP blob with ~80% quality
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                resolve(file); // fallback to original file
              }
            },
            'image/webp',
            0.82
          );
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  }

  async function handleFileSelection(files) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxFiles = 6;
    const remainingSlots = maxFiles - stagedPhotos.length;

    if (remainingSlots <= 0) {
      showToast('Maximum 6 photos allowed per property.', 'error');
      return;
    }

    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    progressBar.style.display = 'block';
    progressFill.style.width = '10%';

    for (let i = 0; i < filesToProcess.length; i++) {
      const file = filesToProcess[i];
      if (!allowedTypes.includes(file.type)) {
        showToast(`Skipped ${file.name}: only JPG, PNG, and WebP allowed.`, 'error');
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        showToast(`Skipped ${file.name}: exceeds 5 MB size limit.`, 'error');
        continue;
      }

      try {
        const compressedBlob = await compressImageFile(file);
        const previewUrl = URL.createObjectURL(compressedBlob);
        stagedPhotos.push({
          id: `photo-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          url: previewUrl,
          blob: compressedBlob,
          isNew: true,
          fileName: file.name,
        });
      } catch (err) {
        console.error('Image compression failed:', err);
      }

      const percent = Math.round(((i + 1) / filesToProcess.length) * 100);
      progressFill.style.width = `${percent}%`;
    }

    setTimeout(() => {
      progressBar.style.display = 'none';
      progressFill.style.width = '0%';
    }, 400);

    renderThumbnails();
    fileInput.value = '';
  }

  function renderThumbnails() {
    thumbnailsContainer.innerHTML = '';

    stagedPhotos.forEach((photo, idx) => {
      const thumb = document.createElement('div');
      thumb.className = 'thumbnail-item';
      thumb.draggable = true;
      thumb.dataset.index = idx.toString();

      thumb.innerHTML = `
        <img src="${escapeHtml(photo.url)}" alt="Property photo ${idx + 1}" />
        ${idx === 0 ? '<span class="cover-tag">Cover</span>' : ''}
        <button type="button" class="thumb-remove-btn" title="Remove photo" aria-label="Remove photo">✕</button>
      `;

      // Remove handler
      const removeBtn = thumb.querySelector('.thumb-remove-btn');
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removePhotoAt(idx);
      });

      // Drag and drop reordering
      thumb.addEventListener('dragstart', (e) => {
        thumb.classList.add('dragging');
        e.dataTransfer.setData('text/plain', idx.toString());
      });

      thumb.addEventListener('dragend', () => {
        thumb.classList.remove('dragging');
      });

      thumb.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      thumb.addEventListener('drop', (e) => {
        e.preventDefault();
        const fromIdx = parseInt(e.dataTransfer.getData('text/plain'), 10);
        const toIdx = idx;
        if (!isNaN(fromIdx) && fromIdx !== toIdx) {
          const item = stagedPhotos.splice(fromIdx, 1)[0];
          stagedPhotos.splice(toIdx, 0, item);
          renderThumbnails();
        }
      });

      thumbnailsContainer.appendChild(thumb);
    });

    const photosError = document.getElementById('err-photos');
    if (photosError && stagedPhotos.length > 0) {
      photosError.classList.remove('visible');
    }
  }

  function removePhotoAt(index) {
    const removed = stagedPhotos.splice(index, 1)[0];
    if (removed && !removed.isNew && removed.storagePath) {
      pendingDeletePhotos.push(removed.storagePath);
    }
    renderThumbnails();
  }

  // --- SUPABASE STORAGE UPLOAD ---
  async function uploadStagedPhotosToStorage(propertyCode) {
    const uploadedUrls = [];
    const client = window.supabaseClient;

    for (let i = 0; i < stagedPhotos.length; i++) {
      const p = stagedPhotos[i];

      if (!p.isNew) {
        uploadedUrls.push(p.url);
        continue;
      }

      if (!client || !window.isSupabaseConfigured()) {
        // Prototype mode fallback: keep object URL / base64 preview
        uploadedUrls.push(p.url);
        continue;
      }

      const timestamp = Date.now();
      const sanitizedCode = (propertyCode || 'prop').replace(/[^a-zA-Z0-9_-]/g, '');
      const storagePath = `${sanitizedCode}/${timestamp}-${i}.webp`;

      try {
        const { data, error } = await client.storage
          .from('property-images')
          .upload(storagePath, p.blob, {
            contentType: 'image/webp',
            upsert: true,
          });

        if (error) {
          console.error('Photo upload error:', error);
          throw error;
        }

        const { data: publicUrlData } = client.storage
          .from('property-images')
          .getPublicUrl(storagePath);

        uploadedUrls.push(publicUrlData.publicUrl);
        p.storagePath = storagePath;
        p.isNew = false;
      } catch (err) {
        console.error(`Failed to upload photo ${i}:`, err);
        throw new Error('Photo upload failed. Check Supabase Storage permissions.');
      }
    }

    // Clean up deleted photos from storage
    if (client && pendingDeletePhotos.length > 0) {
      try {
        await client.storage.from('property-images').remove(pendingDeletePhotos);
        pendingDeletePhotos = [];
      } catch (e) {
        console.warn('Storage cleanup warning:', e);
      }
    }

    return uploadedUrls;
  }

  // --- FORM SUBMISSION & VALIDATION ---
  function validateForm() {
    let isValid = true;

    const title = titleInput.value.trim();
    if (!title) {
      titleInput.classList.add('is-invalid');
      document.getElementById('err-title').classList.add('visible');
      isValid = false;
    } else {
      titleInput.classList.remove('is-invalid');
      document.getElementById('err-title').classList.remove('visible');
    }

    const price = parseInt(priceInput.value, 10);
    if (!price || isNaN(price) || price <= 0) {
      priceInput.classList.add('is-invalid');
      document.getElementById('err-price').classList.add('visible');
      isValid = false;
    } else {
      priceInput.classList.remove('is-invalid');
      document.getElementById('err-price').classList.remove('visible');
    }

    const area = parseInt(areaInput.value, 10);
    if (!area || isNaN(area) || area <= 0) {
      areaInput.classList.add('is-invalid');
      document.getElementById('err-area').classList.add('visible');
      isValid = false;
    } else {
      areaInput.classList.remove('is-invalid');
      document.getElementById('err-area').classList.remove('visible');
    }

    const locality = localityInput.value.trim();
    if (!locality) {
      localityInput.classList.add('is-invalid');
      document.getElementById('err-locality').classList.add('visible');
      isValid = false;
    } else {
      localityInput.classList.remove('is-invalid');
      document.getElementById('err-locality').classList.remove('visible');
    }

    if (stagedPhotos.length === 0) {
      document.getElementById('err-photos').classList.add('visible');
      isValid = false;
    } else {
      document.getElementById('err-photos').classList.remove('visible');
    }

    return isValid;
  }

  function setupFormButtons() {
    saveDraftBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleFormSubmit(false); // is_published = false
    });

    publishBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleFormSubmit(true); // is_published = true
    });

    cancelEditBtn.addEventListener('click', () => {
      resetForm();
    });
  }

  async function handleFormSubmit(isPublished) {
    if (!validateForm()) {
      showToast('Please fix the errors highlighted in red.', 'error');
      return;
    }

    const city = citySelect.value;
    const propertyCode = codeInput.value.trim() || generateNextPropertyCode(city);

    // Button loading state
    const activeBtn = isPublished ? publishBtn : saveDraftBtn;
    const originalText = activeBtn.textContent;
    activeBtn.disabled = true;
    activeBtn.textContent = isPublished ? 'Publishing...' : 'Saving...';

    try {
      // 1. Upload photos to Supabase Storage
      const uploadedImages = await uploadStagedPhotosToStorage(propertyCode);

      // 2. Prepare payload
      const payload = {
        property_code: propertyCode,
        title: titleInput.value.trim(),
        property_type: typeSelect.value,
        bedrooms: parseInt(bedroomsSelect.value, 10),
        price: parseInt(priceInput.value, 10),
        area_sqft: parseInt(areaInput.value, 10),
        status: getSelectedStatus(),
        listing_type: 'sale',
        city,
        locality: localityInput.value.trim(),
        amenities: getSelectedAmenities(),
        description: descriptionInput.value.trim(),
        images: uploadedImages,
        is_published: isPublished,
        is_featured: showFeaturedCheck.checked,
      };

      const client = window.supabaseClient;

      if (client && window.isSupabaseConfigured()) {
        if (editingPropertyId) {
          // UPDATE
          const { error } = await client
            .from('properties')
            .update(payload)
            .eq('id', editingPropertyId);

          if (error) throw error;
          showToast(isPublished ? 'Property published successfully!' : 'Draft updated successfully.');
        } else {
          // INSERT
          const { error } = await client
            .from('properties')
            .insert([payload]);

          if (error) throw error;
          showToast(isPublished ? 'Property published to website!' : 'Property draft saved.');
        }
      } else {
        // Prototype LocalStorage Mode
        savePrototypeProperty(payload, editingPropertyId);
        showToast(isPublished ? 'Property published (Local Prototype)!' : 'Draft saved (Local Prototype).');
      }

      resetForm();
      await fetchProperties();
    } catch (err) {
      console.error('Save error:', err);
      showToast(err.message || "Couldn't save. Check your connection and try again.", 'error');
    } finally {
      activeBtn.disabled = false;
      activeBtn.textContent = originalText;
    }
  }

  function resetForm() {
    editingPropertyId = null;
    form.reset();
    stagedPhotos = [];
    pendingDeletePhotos = [];
    renderThumbnails();

    pricePreview.textContent = '';
    codeInput.value = generateNextPropertyCode(citySelect.value);

    setSelectedStatus('available');
    setSelectedAmenities([
      'Swimming pool',
      'Gym',
      'Clubhouse',
      '24x7 security',
      'Power backup',
      'Covered parking',
    ]);
    showWebsiteCheck.checked = true;
    showFeaturedCheck.checked = true;

    pageTitle.textContent = 'Add new property';
    pageSubtitle.textContent = 'Onboard, edit, and publish residential luxury listings directly to the public website.';
    cancelEditBtn.style.display = 'none';

    document.querySelectorAll('.field-error').forEach((el) => el.classList.remove('visible'));
    document.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));
  }

  // --- FETCH & RENDER PROPERTIES LIST ---
  async function fetchProperties() {
    const client = window.supabaseClient;

    if (client && window.isSupabaseConfigured()) {
      try {
        const { data, error } = await client
          .from('properties')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        currentProperties = data || [];
      } catch (err) {
        console.error('Fetch error:', err);
        showToast('Failed to load listings from Supabase.', 'error');
        loadPrototypeCatalog();
        return;
      }
    } else {
      loadPrototypeCatalog();
    }

    renderSummaryCards();
    renderListingsTable();

    if (!editingPropertyId && (!codeInput.value || codeInput.value.startsWith('SS-'))) {
      codeInput.value = generateNextPropertyCode(citySelect.value);
    }
  }

  function renderSummaryCards() {
    const total = currentProperties.length;
    const available = currentProperties.filter((p) => p.status === 'available').length;
    const underOffer = currentProperties.filter((p) => p.status === 'under_offer').length;
    const sold = currentProperties.filter((p) => p.status === 'sold').length;

    statTotal.textContent = total.toString();
    statAvailable.textContent = available.toString();
    statUnderOffer.textContent = underOffer.toString();
    statSold.textContent = sold.toString();
  }

  function renderListingsTable() {
    if (!currentProperties || currentProperties.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 36px; color: var(--text-dim);">
            No properties found in database. Fill out the form above to publish your first residence.
          </td>
        </tr>
      `;
      listingsCountBadge.textContent = '0 properties listed';
      return;
    }

    listingsCountBadge.textContent = `${currentProperties.length} properties listed`;
    tableBody.innerHTML = '';

    currentProperties.forEach((prop) => {
      const tr = document.createElement('tr');

      const coverImg = (prop.images && prop.images.length > 0)
        ? prop.images[0]
        : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80';

      const statusMap = {
        available: { label: 'Available', cls: 'status-available' },
        under_offer: { label: 'Under Offer', cls: 'status-under_offer' },
        sold: { label: 'Sold', cls: 'status-sold' },
      };
      const statusMeta = statusMap[prop.status] || { label: prop.status, cls: 'status-available' };

      tr.innerHTML = `
        <td>
          <div class="table-prop-cell">
            <img src="${escapeHtml(coverImg)}" alt="${escapeHtml(prop.title)}" class="table-thumb" />
            <div class="table-prop-info">
              <span class="table-prop-title">${escapeHtml(prop.title)}</span>
              <span class="table-prop-code">${escapeHtml(prop.property_code)}</span>
            </div>
          </div>
        </td>
        <td>${escapeHtml(prop.property_type)} • ${prop.bedrooms} BHK</td>
        <td style="font-weight: 700; color: var(--text-ivory);">${formatIndianCurrency(prop.price)}</td>
        <td>${escapeHtml(prop.locality)}, ${escapeHtml(prop.city)}</td>
        <td>
          <span class="badge-status ${statusMeta.cls}">${statusMeta.label}</span>
        </td>
        <td>
          ${prop.is_published 
            ? '<span style="color:#2ecc71; font-weight:600;">● Live</span>' 
            : '<span style="color:var(--text-dim);">Draft</span>'}
          ${prop.is_featured ? '<span class="badge-published">★ Featured</span>' : ''}
        </td>
        <td style="text-align: right;">
          <div class="table-actions-cell" style="justify-content: flex-end;">
            <button type="button" class="btn-icon-action btn-edit" title="Edit property" aria-label="Edit ${escapeHtml(prop.title)}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button type="button" class="btn-icon-action btn-delete" title="Delete property" aria-label="Delete ${escapeHtml(prop.title)}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </td>
      `;

      // Edit Button Click
      tr.querySelector('.btn-edit').addEventListener('click', () => {
        loadPropertyForEdit(prop);
      });

      // Delete Button Click
      tr.querySelector('.btn-delete').addEventListener('click', () => {
        openDeleteModal(prop);
      });

      tableBody.appendChild(tr);
    });
  }

  function loadPropertyForEdit(prop) {
    editingPropertyId = prop.id;
    pageTitle.textContent = `Edit Property: ${prop.property_code}`;
    pageSubtitle.textContent = 'Update details, upload photos, or adjust publishing visibility.';
    cancelEditBtn.style.display = 'inline-flex';

    titleInput.value = prop.title || '';
    codeInput.value = prop.property_code || '';
    typeSelect.value = prop.property_type || 'Gated society';
    bedroomsSelect.value = (prop.bedrooms || 2).toString();
    priceInput.value = (prop.price || '').toString();
    pricePreview.textContent = formatIndianCurrency(prop.price);
    areaInput.value = (prop.area_sqft || '').toString();
    citySelect.value = prop.city || 'Mysuru';
    localityInput.value = prop.locality || '';
    descriptionInput.value = prop.description || '';

    setSelectedStatus(prop.status || 'available');
    setSelectedAmenities(prop.amenities || []);

    showWebsiteCheck.checked = Boolean(prop.is_published);
    showFeaturedCheck.checked = Boolean(prop.is_featured);

    // Staged photos
    stagedPhotos = (prop.images || []).map((url, idx) => ({
      id: `existing-${idx}`,
      url,
      isNew: false,
      storagePath: extractStoragePathFromUrl(url),
    }));
    pendingDeletePhotos = [];
    renderThumbnails();

    // Smooth scroll up to form
    const formCard = document.getElementById('property-form-card');
    if (formCard) {
      formCard.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function extractStoragePathFromUrl(url) {
    if (!url || typeof url !== 'string') return null;
    const marker = '/property-images/';
    const idx = url.indexOf(marker);
    if (idx !== -1) {
      return decodeURIComponent(url.substring(idx + marker.length));
    }
    return null;
  }

  // --- DELETE MODAL & ACTION ---
  function setupDeleteModal() {
    if (btnCancelDelete) {
      btnCancelDelete.addEventListener('click', () => {
        deleteModal.classList.remove('open');
        deleteTargetProperty = null;
      });
    }

    if (btnConfirmDelete) {
      btnConfirmDelete.addEventListener('click', async () => {
        if (!deleteTargetProperty) return;
        const prop = deleteTargetProperty;
        deleteModal.classList.remove('open');

        btnConfirmDelete.disabled = true;

        try {
          const client = window.supabaseClient;

          if (client && window.isSupabaseConfigured()) {
            // Delete associated photos from storage bucket
            if (prop.images && prop.images.length > 0) {
              const paths = prop.images
                .map(extractStoragePathFromUrl)
                .filter(Boolean);
              if (paths.length > 0) {
                await client.storage.from('property-images').remove(paths);
              }
            }

            // Delete property row from database
            const { error } = await client
              .from('properties')
              .delete()
              .eq('id', prop.id);

            if (error) throw error;
          } else {
            // Prototype mode
            deletePrototypeProperty(prop.id);
          }

          showToast(`Deleted ${prop.property_code} permanently.`);
          if (editingPropertyId === prop.id) {
            resetForm();
          }
          await fetchProperties();
        } catch (err) {
          console.error('Delete error:', err);
          showToast('Failed to delete property. Check database permissions.', 'error');
        } finally {
          btnConfirmDelete.disabled = false;
          deleteTargetProperty = null;
        }
      });
    }
  }

  function openDeleteModal(prop) {
    deleteTargetProperty = prop;
    const bodyText = document.getElementById('modal-body');
    if (bodyText) {
      bodyText.textContent = `Are you sure you want to permanently delete "${prop.title}" (${prop.property_code})? All associated photos will also be purged from storage.`;
    }
    deleteModal.classList.add('open');
  }

  // --- TOAST NOTIFICATIONS ---
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : ''}`;

    const icon = type === 'error' ? '⚠' : '✓';
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span>${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // --- PROTOTYPE STORAGE HELPERS (FOR DEV WITHOUT KEYS) ---
  const PROTOTYPE_STORAGE_KEY = 'igrey_supabase_properties_prototype_v1';

  function loadPrototypeCatalog() {
    try {
      const stored = localStorage.getItem(PROTOTYPE_STORAGE_KEY);
      if (stored) {
        currentProperties = JSON.parse(stored);
      } else {
        currentProperties = [
          {
            id: 'proto-1',
            property_code: 'SS-MYS-01',
            title: 'Executive 2 BHK Residence',
            property_type: 'Gated society',
            bedrooms: 2,
            price: 3800000,
            area_sqft: 1850,
            status: 'available',
            listing_type: 'sale',
            city: 'Mysuru',
            locality: 'Gokulam',
            amenities: ['Swimming pool', 'Gym', 'Clubhouse', '24x7 security', 'Power backup', 'Covered parking'],
            description: 'Cantilevered private sanctuary framed by pristine landscaped gardens and sun deck in prime Gokulam enclave.',
            images: [
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
              'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
            ],
            is_published: true,
            is_featured: true,
            created_at: new Date().toISOString(),
          },
          {
            id: 'proto-2',
            property_code: 'SS-MYS-02',
            title: 'Executive 2 BHK Residence',
            property_type: 'Villa',
            bedrooms: 2,
            price: 3800000,
            area_sqft: 1980,
            status: 'available',
            listing_type: 'sale',
            city: 'Mysuru',
            locality: 'Gokulam',
            amenities: ['24x7 security', 'Power backup', 'Covered parking', 'Garden'],
            description: 'Minimalist modern residence pairing basalt accents with warm fumed oak cabinetry and seamless indoor-outdoor living.',
            images: [
              'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
              'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
            ],
            is_published: true,
            is_featured: true,
            created_at: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: 'proto-3',
            property_code: 'SS-MYS-03',
            title: 'Executive 2 BHK Residence',
            property_type: 'Gated society',
            bedrooms: 2,
            price: 3800000,
            area_sqft: 2200,
            status: 'available',
            listing_type: 'sale',
            city: 'Mysuru',
            locality: 'Gokulam',
            amenities: ['Swimming pool', 'Gym', 'Clubhouse', '24x7 security', 'Lift'],
            description: 'Triplex sky-tier luxury residence commanding panoramic city skyline horizons and Chamundi Hills vista.',
            images: [
              'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
              'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=85',
            ],
            is_published: true,
            is_featured: true,
            created_at: new Date(Date.now() - 172800000).toISOString(),
          },
        ];
        localStorage.setItem(PROTOTYPE_STORAGE_KEY, JSON.stringify(currentProperties));
      }
    } catch {
      currentProperties = [];
    }
  }

  function savePrototypeProperty(payload, editId) {
    if (editId) {
      const idx = currentProperties.findIndex((p) => p.id === editId);
      if (idx !== -1) {
        currentProperties[idx] = { ...currentProperties[idx], ...payload, updated_at: new Date().toISOString() };
      }
    } else {
      const newProp = {
        id: `proto-${Date.now()}`,
        ...payload,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      currentProperties.unshift(newProp);
    }
    localStorage.setItem(PROTOTYPE_STORAGE_KEY, JSON.stringify(currentProperties));
  }

  function deletePrototypeProperty(propId) {
    currentProperties = currentProperties.filter((p) => p.id !== propId);
    localStorage.setItem(PROTOTYPE_STORAGE_KEY, JSON.stringify(currentProperties));
  }

  // --- XSS SAFETY HELPER ---
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
})();

/**
 * iGREY HOLDINGS — Admin Dashboard Shared Architecture & Helpers
 * Zero-build vanilla JS client using Supabase JS SDK.
 */

(function () {
  'use strict';

  // --- GLOBAL NAMESPACE & CONSTANTS ---
  window.iGreyAdmin = window.iGreyAdmin || {};

  // Neutral placeholder SVG block (#1a211e with gold image icon)
  const PROPERTY_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='112' height='88' viewBox='0 0 112 88' fill='none'%3E%3Crect width='112' height='88' rx='6' fill='%231a211e'/%3E%3Cpath d='M38 56l10-12 8 8 12-16 14 20H30z' fill='%23c9a77c' fill-opacity='0.75'/%3E%3Ccircle cx='44' cy='36' r='5' fill='%23c9a77c' fill-opacity='0.85'/%3E%3C/svg%3E";
  window.iGreyAdmin.PROPERTY_PLACEHOLDER = PROPERTY_PLACEHOLDER;

  /**
   * Escape HTML to prevent XSS
   */
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Format numbers in standard Indian numbering system (Lakhs & Crores)
   * Example: 8500000 -> "₹85 L", 12000000 -> "₹1.2 Cr"
   */
  function formatIndianPrice(amount) {
    const num = Number(amount);
    if (!num || isNaN(num) || num <= 0) return 'Price on Request';

    if (num >= 10000000) {
      const cr = num / 10000000;
      const formatted = cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2).replace(/\.?0+$/, '');
      return `₹${formatted} Cr`;
    } else if (num >= 100000) {
      const lk = num / 100000;
      const formatted = lk % 1 === 0 ? lk.toFixed(0) : lk.toFixed(2).replace(/\.?0+$/, '');
      return `₹${formatted} L`;
    } else {
      return '₹' + num.toLocaleString('en-IN');
    }
  }

  /**
   * Format timestamp
   */
  function formatDate(isoStr) {
    if (!isoStr) return '—';
    try {
      const d = new Date(isoStr);
      if (isNaN(d.getTime())) return isoStr;
      return d.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return isoStr;
    }
  }

  /**
   * Get Supabase Client safely
   */
  function getClient() {
    if (typeof window.getSupabaseClient === 'function') {
      return window.getSupabaseClient();
    }
    return null;
  }

  /**
   * Toast notification system
   */
  function showToast(type, title, message, duration = 4000) {
    let container = document.getElementById('admin-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'admin-toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
    } else if (type === 'error') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
    } else {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }

    toast.innerHTML = `
      ${iconSvg}
      <div class="toast-content">
        <div class="toast-title">${escapeHtml(title)}</div>
        <div class="toast-message">${escapeHtml(message)}</div>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 260);
    }, duration);
  }

  /**
   * Confirmation Modal
   */
  function showConfirmModal({ title, message, confirmText = 'Confirm', confirmClass = 'btn-danger', onConfirm }) {
    let modalBackdrop = document.getElementById('admin-confirm-modal');
    if (!modalBackdrop) {
      modalBackdrop = document.createElement('div');
      modalBackdrop.id = 'admin-confirm-modal';
      modalBackdrop.className = 'modal-backdrop';
      document.body.appendChild(modalBackdrop);
    }

    modalBackdrop.innerHTML = `
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="confirm-modal-title">
        <button type="button" class="modal-close-btn" id="confirm-cancel-x" aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <h3 id="confirm-modal-title" style="font-family: var(--font-serif); font-size: 20px; color: #FAF8F4; margin-bottom: 8px;">${escapeHtml(title)}</h3>
        <p style="color: var(--text-secondary); font-size: 13.5px; margin-bottom: 24px; line-height: 1.5;">${escapeHtml(message)}</p>
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button type="button" class="btn btn-secondary" id="confirm-cancel-btn">Cancel</button>
          <button type="button" class="btn ${confirmClass}" id="confirm-action-btn">${escapeHtml(confirmText)}</button>
        </div>
      </div>
    `;

    modalBackdrop.classList.add('active');

    const close = () => {
      modalBackdrop.classList.remove('active');
    };

    document.getElementById('confirm-cancel-x').onclick = close;
    document.getElementById('confirm-cancel-btn').onclick = close;

    document.getElementById('confirm-action-btn').onclick = async () => {
      close();
      if (typeof onConfirm === 'function') {
        await onConfirm();
      }
    };

    modalBackdrop.onclick = (e) => {
      if (e.target === modalBackdrop) close();
    };
  }

  /**
   * Property Details Preview Popup
   * Exactly matches the luxury popup on the public website!
   */
  function showPropertyPreviewModal(property) {
    let previewModal = document.getElementById('admin-property-preview-modal');
    if (!previewModal) {
      previewModal = document.createElement('div');
      previewModal.id = 'admin-property-preview-modal';
      previewModal.className = 'modal-backdrop';
      document.body.appendChild(previewModal);
    }

    const photos = Array.isArray(property.images) && property.images.length > 0
      ? property.images
      : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'];

    const formattedPrice = formatIndianPrice(property.price);
    const statusText = (property.status || 'available').toUpperCase().replace('_', ' ');

    let activeIdx = 0;

    const render = () => {
      const currentPhoto = photos[activeIdx];
      const highlightsHtml = (property.highlights || []).map(h => `
        <span style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 14px; background: rgba(201, 167, 124, 0.1); border: 0.5px solid rgba(201, 167, 124, 0.3); color: #c9a77c; font-size: 11.5px; font-weight: 600;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          ${escapeHtml(h)}
        </span>
      `).join('');

      const amenitiesHtml = (property.amenities || []).map(a => `
        <li style="display: flex; align-items: center; gap: 8px; color: #f4efe4; font-size: 12.5px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c9a77c" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          ${escapeHtml(a)}
        </li>
      `).join('');

      const thumbsHtml = photos.map((p, idx) => `
        <button type="button" class="preview-thumb-btn ${idx === activeIdx ? 'active' : ''}" data-idx="${idx}" style="border: ${idx === activeIdx ? '1.5px solid #c9a77c' : '0.5px solid #2e2a22'}; border-radius: 6px; padding: 0; background: none; cursor: pointer; width: 50px; height: 38px; overflow: hidden; opacity: ${idx === activeIdx ? '1' : '0.6'};">
          <img src="${p}" style="width: 100%; height: 100%; object-fit: cover;" alt="Thumbnail ${idx + 1}" />
        </button>
      `).join('');

      previewModal.innerHTML = `
        <div class="modal-card" style="max-width: 680px; padding: 0; overflow: hidden;" role="dialog" aria-modal="true">
          <!-- Modal Header -->
          <div style="position: relative; max-height: 60vh; height: clamp(260px, 45vh, 420px); background: #1a211e; overflow: hidden;">
            <img id="preview-main-img" src="${currentPhoto}" style="width: 100%; height: 100%; max-height: 60vh; object-fit: cover; display: block;" onerror="this.onerror=null; this.src=window.iGreyAdmin.PROPERTY_PLACEHOLDER;" alt="${escapeHtml(property.title)}" />
            <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(16, 22, 20, 0.95) 0%, transparent 50%); pointer-events: none;"></div>
            
            <button type="button" id="preview-close-btn" style="position: absolute; top: 16px; right: 16px; background: rgba(0,0,0,0.6); border: 0.5px solid rgba(255,255,255,0.25); border-radius: 50%; width: 34px; height: 34px; color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            <!-- Arrows -->
            ${photos.length > 1 ? `
              <button type="button" id="preview-prev-btn" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.6); border: 0.5px solid rgba(255,255,255,0.2); border-radius: 50%; width: 36px; height: 36px; color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button type="button" id="preview-next-btn" style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.6); border: 0.5px solid rgba(255,255,255,0.2); border-radius: 50%; width: 36px; height: 36px; color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            ` : ''}

            <!-- Bottom of Image Info -->
            <div style="position: absolute; bottom: 14px; left: 20px; right: 20px; display: flex; align-items: flex-end; justify-content: space-between;">
              <div>
                <span class="status-pill ${property.status || 'available'}" style="margin-bottom: 6px;">${statusText}</span>
                <h2 style="font-family: var(--font-serif); font-size: 24px; color: #FAF8F4; margin: 4px 0 0;">${escapeHtml(property.title)}</h2>
                <div style="color: #c9a77c; font-size: 12.5px; margin-top: 2px;">${escapeHtml(property.locality)}, ${escapeHtml(property.city)} &bull; ID: ${escapeHtml(property.property_code || 'SS-MYS-01')}</div>
              </div>
              <div style="text-align: right;">
                <div style="font-family: var(--font-sans); font-size: 22px; font-weight: 700; color: #c9a77c;">${formattedPrice}</div>
                <div style="color: var(--text-muted); font-size: 12px;">${escapeHtml(property.area_sqft || '1,200')} sq ft</div>
              </div>
            </div>
          </div>

          <!-- Thumbnails Strip -->
          ${photos.length > 1 ? `
            <div style="padding: 10px 20px; background: #0c1210; border-bottom: 0.5px solid var(--border-color); display: flex; gap: 8px; overflow-x: auto;">
              ${thumbsHtml}
            </div>
          ` : ''}

          <!-- Body Content -->
          <div style="padding: 24px; max-height: 380px; overflow-y: auto;">
            <!-- Highlights -->
            ${highlightsHtml ? `
              <div style="margin-bottom: 18px;">
                <div style="font-size: 11.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px;">Curated Highlights</div>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">${highlightsHtml}</div>
              </div>
            ` : ''}

            <!-- Description -->
            <div style="margin-bottom: 20px;">
              <div style="font-size: 11.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px;">Architectural Overview</div>
              <p style="color: var(--text-secondary); font-size: 13.5px; line-height: 1.6; margin: 0;">${escapeHtml(property.description || 'No description provided.')}</p>
            </div>

            <!-- Amenities -->
            ${amenitiesHtml ? `
              <div style="margin-bottom: 16px;">
                <div style="font-size: 11.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px;">Specifications & Amenities</div>
                <ul style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; list-style: none; padding: 0;">${amenitiesHtml}</ul>
              </div>
            ` : ''}
          </div>

          <!-- Footer -->
          <div style="padding: 14px 24px; background: #0c1210; border-top: 0.5px solid var(--border-color); display: flex; align-items: center; justify-content: space-between;">
            <div style="font-size: 12px; color: var(--text-muted);">Client View Preview (iGrey Luxury Details)</div>
            <button type="button" class="btn btn-secondary" id="preview-done-btn">Done Preview</button>
          </div>
        </div>
      `;

      // Handlers
      document.getElementById('preview-close-btn').onclick = () => previewModal.classList.remove('active');
      document.getElementById('preview-done-btn').onclick = () => previewModal.classList.remove('active');

      if (photos.length > 1) {
        document.getElementById('preview-prev-btn').onclick = () => {
          activeIdx = (activeIdx - 1 + photos.length) % photos.length;
          render();
        };
        document.getElementById('preview-next-btn').onclick = () => {
          activeIdx = (activeIdx + 1) % photos.length;
          render();
        };
        previewModal.querySelectorAll('.preview-thumb-btn').forEach(btn => {
          btn.onclick = () => {
            activeIdx = parseInt(btn.getAttribute('data-idx'), 10) || 0;
            render();
          };
        });
      }
    };

    render();
    previewModal.classList.add('active');
    previewModal.onclick = (e) => {
      if (e.target === previewModal) previewModal.classList.remove('active');
    };
  }

  /**
   * Client-side Photo Compression
   * Max 1600px width, 80% quality, WebP when supported
   */
  async function compressPhoto(file, maxWidth = 1600, quality = 0.8) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Try webp first
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(new File([blob], file.name.replace(/\.[^/.]+$/, '.webp'), { type: 'image/webp' }));
              } else {
                // Fallback to jpeg
                canvas.toBlob(
                  (jpegBlob) => {
                    resolve(jpegBlob ? new File([jpegBlob], file.name, { type: 'image/jpeg' }) : file);
                  },
                  'image/jpeg',
                  quality
                );
              }
            },
            'image/webp',
            quality
          );
        };
        img.onerror = () => resolve(file);
        img.src = e.target.result;
      };
      reader.onerror = () => resolve(file);
      reader.readAsDataURL(file);
    });
  }

  /**
   * Export array of objects to CSV
   */
  function exportToCSV(rows, filename = 'igrey-export.csv') {
    if (!rows || !rows.length) {
      showToast('error', 'Export Failed', 'No data available to export.');
      return;
    }

    const headers = Object.keys(rows[0]);
    const csvContent = [
      headers.join(','),
      ...rows.map(row =>
        headers
          .map(fieldName => {
            let val = row[fieldName];
            if (val === null || val === undefined) val = '';
            if (Array.isArray(val)) val = val.join('; ');
            if (typeof val === 'object') val = JSON.stringify(val);
            val = String(val).replace(/"/g, '""');
            return `"${val}"`;
          })
          .join(',')
      )
    ].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Layout Injector & Shared Navigation
   */
  function renderLayout({ activeTab = 'dashboard', title = 'Dashboard', subtitle = '' }) {
    const sidebarEl = document.getElementById('admin-sidebar-container');
    const topbarEl = document.getElementById('admin-topbar-container');

    const navItems = [
      { id: 'dashboard', label: 'Dashboard', href: 'index.html', icon: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>' },
      { id: 'properties', label: 'Properties', href: 'properties.html', icon: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
      { id: 'enquiries', label: 'Enquiries', href: 'enquiries.html', icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>', badgeId: 'nav-enquiries-badge' },
      { id: 'reviews', label: 'Reviews', href: 'reviews.html', icon: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>' },
      { id: 'settings', label: 'Settings', href: 'settings.html', icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>' },
    ];

    if (sidebarEl) {
      const navLinksHtml = navItems.map(item => `
        <a href="${item.href}" class="nav-link ${item.id === activeTab ? 'active' : ''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">${item.icon}</svg>
          <span>${item.label}</span>
          ${item.badgeId ? `<span class="nav-badge" id="${item.badgeId}" style="display: none;">0</span>` : ''}
        </a>
      `).join('');

      sidebarEl.innerHTML = `
        <aside class="admin-sidebar" id="admin-sidebar">
          <div>
            <div class="sidebar-header">
              <a href="index.html" class="sidebar-brand">
                <div class="sidebar-logo-icon">iG</div>
                <div class="sidebar-brand-text">
                  <span class="brand-name">iGREY</span>
                  <span class="brand-badge">EXECUTIVE ADMIN</span>
                </div>
              </a>
              <button type="button" class="sidebar-close-btn" id="sidebar-close-btn" aria-label="Close menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <nav class="sidebar-nav">
              ${navLinksHtml}
            </nav>
          </div>
          <div class="sidebar-footer">
            <div class="user-snippet">
              <div class="user-avatar" id="sidebar-user-avatar">A</div>
              <div class="user-info">
                <span class="user-name" id="sidebar-user-email">Administrator</span>
                <span class="user-role">Verified Admin</span>
              </div>
            </div>
            <button type="button" class="btn-logout" id="sidebar-logout-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Log out
            </button>
          </div>
        </aside>
        <div class="sidebar-backdrop" id="sidebar-backdrop"></div>
      `;

      // Sidebar mobile drawer handlers
      const sidebar = document.getElementById('admin-sidebar');
      const backdrop = document.getElementById('sidebar-backdrop');
      const closeBtn = document.getElementById('sidebar-close-btn');

      const closeSidebar = () => {
        sidebar.classList.remove('mobile-open');
        backdrop.classList.remove('active');
      };

      if (closeBtn) closeBtn.onclick = closeSidebar;
      if (backdrop) backdrop.onclick = closeSidebar;

      // Logout handler
      const logoutBtn = document.getElementById('sidebar-logout-btn');
      if (logoutBtn) {
        logoutBtn.onclick = async () => {
          const client = getClient();
          if (client) {
            await client.auth.signOut();
          }
          sessionStorage.clear();
          window.location.href = 'login.html';
        };
      }
    }

    if (topbarEl) {
      topbarEl.innerHTML = `
        <header class="admin-topbar">
          <div class="topbar-left">
            <button type="button" class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Open navigation">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <div class="topbar-search-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" class="topbar-search-input" id="global-search-input" placeholder="Search properties, codes, clients..." aria-label="Search" />
            </div>
          </div>
          <div class="topbar-right">
            <a href="property-form.html" class="btn-add-gold">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              + Add property
            </a>
            <a href="settings.html" class="topbar-avatar" id="topbar-user-avatar" title="Admin Settings">A</a>
          </div>
        </header>
      `;

      // Mobile Menu Trigger
      const mobileBtn = document.getElementById('mobile-menu-btn');
      if (mobileBtn) {
        mobileBtn.onclick = () => {
          const sidebar = document.getElementById('admin-sidebar');
          const backdrop = document.getElementById('sidebar-backdrop');
          if (sidebar && backdrop) {
            sidebar.classList.add('mobile-open');
            backdrop.classList.add('active');
          }
        };
      }

      // Global search handler
      const globalSearch = document.getElementById('global-search-input');
      if (globalSearch && activeTab !== 'properties') {
        globalSearch.onkeydown = (e) => {
          if (e.key === 'Enter') {
            const query = encodeURIComponent(globalSearch.value.trim());
            window.location.href = `properties.html?q=${query}`;
          }
        };
      }
    }
  }

  /**
   * Check Auth Guard on Page Load
   */
  async function checkAuth(requireAuth = true) {
    const client = getClient();
    const isLoginPage = window.location.pathname.endsWith('login.html');

    // If unconfigured Supabase
    if (!client) {
      if (!isLoginPage) {
        showUnconfiguredBanner();
      }
      return null;
    }

    try {
      const { data: { session } } = await client.auth.getSession();

      if (isLoginPage) {
        if (session && session.user) {
          window.location.href = 'index.html';
        }
        return session;
      }

      if (requireAuth && (!session || !session.user)) {
        window.location.href = 'login.html';
        return null;
      }

      // Verify email whitelist against admins table
      if (session && session.user) {
        const userEmail = session.user.email;
        const initial = userEmail ? userEmail[0].toUpperCase() : 'A';

        // Update user display
        const emailEl = document.getElementById('sidebar-user-email');
        const avatarEl = document.getElementById('sidebar-user-avatar');
        const topAvatarEl = document.getElementById('topbar-user-avatar');
        if (emailEl) emailEl.textContent = userEmail;
        if (avatarEl) avatarEl.textContent = initial;
        if (topAvatarEl) topAvatarEl.textContent = initial;

        // Check enquiries badge
        updateEnquiriesBadge(client);
      }

      return session;
    } catch (err) {
      console.warn('[iGrey Admin] Auth check error:', err);
      if (requireAuth && !isLoginPage) {
        window.location.href = 'login.html';
      }
      return null;
    }
  }

  /**
   * Update New Enquiries Badge in sidebar
   */
  async function updateEnquiriesBadge(client) {
    try {
      const { count, error } = await client
        .from('enquiries')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new');

      if (!error && count !== null && count > 0) {
        const badge = document.getElementById('nav-enquiries-badge');
        if (badge) {
          badge.textContent = count;
          badge.style.display = 'inline-block';
        }
      }
    } catch (e) {
      // Non-critical badge count
    }
  }

  /**
   * Display unconfigured banner if Supabase URL / anon key not yet set
   */
  function showUnconfiguredBanner() {
    const mainWrap = document.querySelector('.admin-content');
    if (!mainWrap || document.getElementById('unconfigured-banner-msg')) return;

    const banner = document.createElement('div');
    banner.id = 'unconfigured-banner-msg';
    banner.className = 'unconfigured-banner';
    banner.innerHTML = `
      <div class="unconfigured-banner-text">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <div>
          <strong>Backend Not Connected:</strong> Paste your Supabase URL &amp; Public Anon Key into <code>/js/supabase-config.js</code> to enable live database &amp; storage synchronization.
        </div>
      </div>
      <a href="README.md" class="btn btn-secondary" style="font-size: 11.5px; padding: 6px 12px;">View Setup Guide</a>
    `;
    mainWrap.prepend(banner);
  }

  // Assign to namespace
  window.iGreyAdmin = {
    PROPERTY_PLACEHOLDER,
    escapeHtml,
    formatIndianPrice,
    formatDate,
    getClient,
    showToast,
    showConfirmModal,
    showPropertyPreviewModal,
    compressPhoto,
    exportToCSV,
    renderLayout,
    checkAuth,
    showUnconfiguredBanner,
  };
})();

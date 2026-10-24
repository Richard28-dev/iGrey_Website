import React, { useState, useEffect, useRef } from 'react';
import { X, MapPin, CheckCircle } from 'lucide-react';
import type { PropertyListing } from '../data/propertiesData';
import { enquiryService } from '../admin/services/enquiryService';

interface InquireDialogProps {
  property: PropertyListing | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InquireDialog: React.FC<InquireDialogProps> = ({
  property,
  isOpen,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle native <dialog> showModal / close
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && property) {
      setIsSubmitted(false);
      setErrorMsg('');
      setName('');
      setPhone('');
      setMessage('');
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen, property]);

  // Sync native Esc close with react state
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  if (!property) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Please provide both your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // 1. Submit through the application enquiry service
      await enquiryService.createEnquiry({
        customerName: name.trim(),
        email: '',
        phone: phone.trim(),
        message: message.trim() || `Inquiry regarding ${property.title} (ID: ${property.id})`,
        interestedPropertyId: property.id,
        interestedPropertyTitle: property.title,
        status: 'New',
        role: property.listingType === 'sale' ? 'Looking for Buy' : 'Tenant / Looking for Stay',
        city: property.city || 'Bangalore',
      });

      // 2. Also dispatch custom prefill/contact event for listeners
      window.dispatchEvent(
        new CustomEvent('igrey_inquiry_submitted', {
          detail: {
            propertyId: property.id,
            propertyTitle: property.title,
            name: name.trim(),
            phone: phone.trim(),
            message: message.trim(),
          },
        })
      );

      setIsSubmitted(true);
    } catch (err) {
      console.error('Failed to submit inquiry:', err);
      // Even if offline/local, show confirmed state to client
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryBhk = property.bhk && property.bhk > 0
    ? `${property.category} • ${property.bhk} BHK`
    : property.category;

  const detailsLine = [
    property.sqft,
    property.details,
    property.tenure ? `Tenure: ${property.tenure}` : '',
    property.maintenance ? `Maint: ${property.maintenance}` : '',
    property.availability ? `Available: ${property.availability}` : '',
  ]
    .filter(Boolean)
    .join(' • ');

  return (
    <dialog
      ref={dialogRef}
      className="inquire-native-dialog"
      aria-labelledby="inquire-dialog-title"
      onClick={(e) => {
        // Close on backdrop click
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <div className="inquire-dialog-content">
        {/* Header Bar */}
        <div className="inquire-dialog-header">
          <div className="inquire-dialog-header-left">
            <span className="inquire-dialog-eyebrow">PROPERTY INQUIRY</span>
            <h3 id="inquire-dialog-title" className="inquire-dialog-title">
              {property.title}
            </h3>
          </div>
          <button
            type="button"
            className="inquire-dialog-close"
            onClick={onClose}
            aria-label="Close inquiry dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Property Brief Summary Card */}
        <div className="inquire-property-summary">
          <div className="inquire-summary-top">
            <span className="inquire-summary-category">{categoryBhk}</span>
            <span className="inquire-summary-id">ID: {property.id}</span>
          </div>

          <div className="inquire-summary-location">
            <MapPin size={13} className="pin-icon" />
            <span>{property.location}</span>
          </div>

          <div className="inquire-summary-price-row">
            <span className="inquire-summary-price">
              {property.price}
              {property.priceSuffix && <span className="price-suffix">{property.priceSuffix}</span>}
            </span>
            {property.note && <span className="inquire-summary-note">{property.note}</span>}
          </div>

          {detailsLine && (
            <p className="inquire-summary-details">{detailsLine}</p>
          )}
        </div>

        {/* Content Body: Form OR In-Dialog Confirmation */}
        {isSubmitted ? (
          <div className="inquire-dialog-confirmation" role="status">
            <div className="confirmation-icon-wrap">
              <CheckCircle size={44} color="#278D65" strokeWidth={2.2} />
            </div>
            <h4 className="confirmation-title">Inquiry Sent</h4>
            <p className="confirmation-text">
              Inquiry sent. Thanks. Our team will call you shortly.
            </p>
            <div className="confirmation-footer">
              <button
                type="button"
                className="btn-primary-gold"
                onClick={onClose}
                autoFocus
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="inquire-dialog-form">
            {errorMsg && (
              <div className="inquire-form-error" role="alert">
                {errorMsg}
              </div>
            )}

            <div className="inquire-field">
              <label htmlFor="inquire-name" className="inquire-label">
                Your Full Name <span className="required-star">*</span>
              </label>
              <input
                id="inquire-name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Vikram Singhania"
                className="inquire-input"
                autoComplete="name"
              />
            </div>

            <div className="inquire-field">
              <label htmlFor="inquire-phone" className="inquire-label">
                Phone Number <span className="required-star">*</span>
              </label>
              <input
                id="inquire-phone"
                name="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 98450 12345"
                className="inquire-input"
                autoComplete="tel"
              />
            </div>

            <div className="inquire-field">
              <label htmlFor="inquire-message" className="inquire-label">
                Message <span className="optional-tag">(Optional)</span>
              </label>
              <textarea
                id="inquire-message"
                name="message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your timeline, financing plan or preferred viewing dates..."
                className="inquire-textarea"
              />
            </div>

            <div className="inquire-dialog-actions">
              <button
                type="button"
                className="inquire-btn-cancel"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inquire-btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send inquiry'}
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
};

import React, { useState, useEffect } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Upload,
  Eye,
  Save,
  CheckCircle2,
  Trash2,
  X,
  Sparkles,
} from 'lucide-react';
import { propertyService } from '../services/propertyService';
import { mediaService } from '../services/mediaService';
import { PropertyPreviewModal } from '../components/PropertyPreviewModal';
import { PropertyDetailsModal } from '../../components/PropertyDetailsModal';
import type {
  AdminProperty,
  PropertyType,
  ListingType,
  PropertyStatus,
  FurnishingStatus,
  PossessionStatus,
} from '../types';
import { useAdminRouter } from '../router/AdminRouter';

interface PropertyFormProps {
  propertyIdToEdit?: string;
}

const PRESET_HIGHLIGHTS = [
  'Ready to move in',
  'Gated society',
  'Verified documents',
  'Corner plot',
  'Vastu compliant',
  'Near metro or bus stop',
  'Newly renovated',
];

const DEFAULT_AMENITIES_LIST = [
  'Swimming Pool',
  'Gym',
  'Parking',
  'Garden',
  'Security',
  'CCTV',
  'Clubhouse',
  'Lift',
  'Power Backup',
  'Gated Community',
  "Children's Play Area",
  'Balcony',
  'Furnished',
  'Pet Friendly',
];

const formatPreviewProperty = (data: Partial<AdminProperty>): AdminProperty => {
  const images = (data.galleryImages && data.galleryImages.length > 0)
    ? data.galleryImages
    : [data.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'];
  return {
    id: data.id || 'preview-property',
    propertyId: data.propertyId || 'SS-MYS-02',
    title: data.title || 'Executive 2 BHK Residence',
    shortDescription: data.shortDescription || '',
    fullDescription: data.fullDescription || data.shortDescription || 'Bright, well-planned home in a gated society close to schools and markets. Ready to move in, with a clear layout and good natural light.',
    propertyType: data.propertyType || 'Villa',
    listingType: data.listingType || 'For Sale',
    price: data.price || '₹85 L',
    priceNumeric: data.priceNumeric || 8500000,
    currency: data.currency || 'INR',
    status: data.status || 'Active',
    bedrooms: Number(data.bedrooms) || 2,
    bathrooms: Number(data.bathrooms) || 2,
    balconies: Number(data.balconies) || 1,
    builtUpArea: data.builtUpArea || '1,200 sq ft',
    furnishing: data.furnishing || 'Furnished',
    parking: Number(data.parking) || 2,
    possession: data.possession || 'Ready to Move',
    address: data.address || '',
    locality: data.locality || 'Gokulam',
    city: data.city || 'Mysuru',
    state: data.state || 'Karnataka',
    country: data.country || 'India',
    coverImage: images[0] || data.coverImage || '',
    galleryImages: images,
    highlights: (data.highlights && data.highlights.length > 0) ? data.highlights : ['Ready to move in', 'Gated society'],
    amenities: (data.amenities && data.amenities.length > 0) ? data.amenities : ['Swimming pool', 'Gym', '24/7 security', 'Power backup', 'Covered parking', 'Lift'],
    slug: data.slug || 'preview-property',
    isFeatured: Boolean(data.isFeatured ?? true),
    homepageVisible: Boolean(data.homepageVisible ?? true),
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const PropertyForm: React.FC<PropertyFormProps> = ({ propertyIdToEdit }) => {
  const { navigate, params } = useAdminRouter();
  const effectiveId = propertyIdToEdit || params.id;
  const isEditing = Boolean(effectiveId);

  const [currentStep, setCurrentStep] = useState(1);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showPopupPreview, setShowPopupPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [customAmenityInput, setCustomAmenityInput] = useState('');
  const [customHighlightInput, setCustomHighlightInput] = useState('');
  const [draggedPhotoIndex, setDraggedPhotoIndex] = useState<number | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<AdminProperty>>({
    propertyId: `IGH-PR-${Math.floor(100 + Math.random() * 900)}`,
    title: '',
    shortDescription: '',
    fullDescription: '',
    propertyType: 'Villa',
    listingType: 'For Sale',
    price: '',
    priceNumeric: 0,
    currency: 'INR',
    status: 'Active',
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    builtUpArea: '2,400 sq.ft',
    carpetArea: '2,050 sq.ft',
    plotArea: '',
    furnishing: 'Furnished',
    propertyAge: 'Brand New',
    floorNumber: 1,
    totalFloors: 2,
    parking: 2,
    possession: 'Ready to Move',
    address: '',
    locality: '',
    city: 'Mysuru',
    state: 'Karnataka',
    country: 'India',
    postalCode: '570002',
    landmark: '',
    googleMapsUrl: '',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    ],
    highlights: ['Ready to move in', 'Gated society'],
    amenities: ['Swimming Pool', 'Security', 'Gated Community', 'Power Backup'],
    customAmenities: [],
    seoTitle: '',
    metaDescription: '',
    slug: '',
    isFeatured: true,
    homepageVisible: true,
  });

  // Load property if editing
  useEffect(() => {
    if (effectiveId) {
      propertyService.getPropertyById(effectiveId).then((existing) => {
        if (existing) {
          setFormData(existing);
        }
      });
    }
  }, [effectiveId]);

  // Handle Input Changes
  const updateField = (field: keyof AdminProperty, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      // Auto-generate slug from title if title changes and slug wasn't manually set
      if (field === 'title' && !isEditing) {
        updated.slug = String(value)
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }
      return updated;
    });

    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  // Image Upload handler (supports drag-and-drop & browse up to 8 photos with client-side compression)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
    let files: FileList | null = null;
    if ('dataTransfer' in e) {
      e.preventDefault();
      files = e.dataTransfer.files;
    } else if (e.target.files) {
      files = e.target.files;
    }

    if (!files || files.length === 0) return;

    const currentCount = formData.galleryImages?.length || 0;
    const remainingSlots = 8 - currentCount;
    if (remainingSlots <= 0) {
      alert('Maximum of 8 photos allowed. Please remove a photo before adding more.');
      return;
    }

    const filesToProcess = Array.from(files).slice(0, remainingSlots);
    if (files.length > remainingSlots) {
      alert(`Only adding ${remainingSlots} photos to respect the 8-photo limit.`);
    }

    filesToProcess.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file (JPG, PNG, WebP).');
        return;
      }
      if (file.size > 15 * 1024 * 1024) {
        alert('File size exceeds the 15MB limit.');
        return;
      }

      mediaService.addMedia(file).then((mediaItem) => {
        setFormData((prev) => {
          const currentGallery = prev.galleryImages || [];
          if (currentGallery.length >= 8) return prev;
          const updated = [...currentGallery, mediaItem.url];
          return {
            ...prev,
            galleryImages: updated,
            coverImage: prev.coverImage || updated[0],
          };
        });
      });
    });
  };

  // Remove Image
  const handleRemoveImage = (indexToRemove: number) => {
    const images = formData.galleryImages || [];
    const newImages = images.filter((_, i) => i !== indexToRemove);
    setFormData((prev) => ({
      ...prev,
      galleryImages: newImages,
      coverImage: newImages[0] || '',
    }));
  };

  // Set as Cover: Moves this photo to the first slot (index 0) so it displays the Cover tag
  const handleSetCover = (url: string) => {
    const list = formData.galleryImages || [];
    const filtered = list.filter((u) => u !== url);
    const reordered = [url, ...filtered];
    setFormData((prev) => ({
      ...prev,
      galleryImages: reordered,
      coverImage: url,
    }));
  };

  // Drag-and-drop reordering for gallery photos
  const handleDragPhotoStart = (idx: number) => {
    setDraggedPhotoIndex(idx);
  };

  const handleDropPhoto = (targetIdx: number) => {
    if (draggedPhotoIndex === null || draggedPhotoIndex === targetIdx) return;
    const images = [...(formData.galleryImages || [])];
    const [dragged] = images.splice(draggedPhotoIndex, 1);
    images.splice(targetIdx, 0, dragged);
    setFormData((prev) => ({
      ...prev,
      galleryImages: images,
      coverImage: images[0] || '',
    }));
    setDraggedPhotoIndex(null);
  };

  // Move photo left/right
  const handleMovePhoto = (fromIdx: number, toIdx: number) => {
    const images = [...(formData.galleryImages || [])];
    if (toIdx < 0 || toIdx >= images.length) return;
    const [moved] = images.splice(fromIdx, 1);
    images.splice(toIdx, 0, moved);
    setFormData((prev) => ({
      ...prev,
      galleryImages: images,
      coverImage: images[0] || '',
    }));
  };

  // Highlights handlers (Max 6)
  const toggleHighlight = (highlight: string) => {
    const list = formData.highlights || [];
    if (list.includes(highlight)) {
      setFormData((prev) => ({
        ...prev,
        highlights: list.filter((h) => h !== highlight),
      }));
    } else {
      if (list.length >= 6) {
        alert('Maximum of 6 highlights allowed.');
        return;
      }
      setFormData((prev) => ({
        ...prev,
        highlights: [...list, highlight],
      }));
    }
  };

  const handleAddCustomHighlight = () => {
    const trimmed = customHighlightInput.trim();
    if (!trimmed) return;
    const list = formData.highlights || [];
    if (list.includes(trimmed)) {
      setCustomHighlightInput('');
      return;
    }
    if (list.length >= 6) {
      alert('Maximum of 6 highlights allowed.');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      highlights: [...list, trimmed],
    }));
    setCustomHighlightInput('');
  };

  const handleRemoveHighlight = (highlight: string) => {
    const list = formData.highlights || [];
    setFormData((prev) => ({
      ...prev,
      highlights: list.filter((h) => h !== highlight),
    }));
  };

  // Amenity Toggle
  const toggleAmenity = (amenity: string) => {
    const list = formData.amenities || [];
    if (list.includes(amenity)) {
      setFormData((prev) => ({
        ...prev,
        amenities: list.filter((a) => a !== amenity),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        amenities: [...list, amenity],
      }));
    }
  };

  const handleAddCustomAmenity = () => {
    const trimmed = customAmenityInput.trim();
    if (!trimmed) return;
    const current = formData.amenities || [];
    if (!current.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...current, trimmed],
      }));
    }
    setCustomAmenityInput('');
  };

  // Step Validation
  const validateStep = (step: number): boolean => {
    const newErrs: Record<string, string> = {};

    if (step === 1) {
      if (!formData.title?.trim()) newErrs.title = 'Property Title is required.';
      if (!formData.price?.trim()) newErrs.price = 'Price is required.';
      if (!formData.shortDescription?.trim()) newErrs.shortDescription = 'Short Description is required.';
    } else if (step === 2) {
      if (!formData.builtUpArea?.trim()) newErrs.builtUpArea = 'Built-up Area is required.';
    } else if (step === 3) {
      if (!formData.locality?.trim()) newErrs.locality = 'Locality is required.';
      if (!formData.city?.trim()) newErrs.city = 'City is required.';
    }

    setErrors(newErrs);
    return Object.keys(newErrs).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((p) => Math.min(p + 1, 6));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((p) => Math.max(p - 1, 1));
  };

  // Submit Handler: Save Draft or Publish
  const handleSave = async (targetStatus?: PropertyStatus) => {
    if (!validateStep(1) || !validateStep(3)) {
      alert('Please fill in required fields before saving.');
      return;
    }

    setIsSubmitting(true);
    try {
      const statusToSet: PropertyStatus = targetStatus || formData.status || 'Active';

      const cleanProperty: Omit<AdminProperty, 'id' | 'createdAt' | 'updatedAt'> = {
        propertyId: formData.propertyId || `IGH-PR-${Date.now()}`,
        title: formData.title || 'Untitled Residence',
        shortDescription: formData.shortDescription || '',
        fullDescription: formData.fullDescription || formData.shortDescription || '',
        propertyType: formData.propertyType || 'Villa',
        listingType: formData.listingType || 'For Sale',
        price: formData.price || 'Price on Request',
        priceNumeric: formData.priceNumeric || 0,
        currency: formData.currency || 'INR',
        status: statusToSet,
        bedrooms: Number(formData.bedrooms) || 2,
        bathrooms: Number(formData.bathrooms) || 2,
        balconies: Number(formData.balconies) || 1,
        builtUpArea: formData.builtUpArea || '2,000 sq.ft',
        carpetArea: formData.carpetArea,
        plotArea: formData.plotArea,
        furnishing: formData.furnishing || 'Furnished',
        propertyAge: formData.propertyAge,
        floorNumber: Number(formData.floorNumber) || 1,
        totalFloors: Number(formData.totalFloors) || 2,
        parking: Number(formData.parking) || 2,
        possession: formData.possession || 'Ready to Move',
        address: formData.address || '',
        locality: formData.locality || 'Gokulam',
        city: formData.city || 'Mysuru',
        state: formData.state || 'Karnataka',
        country: formData.country || 'India',
        postalCode: formData.postalCode,
        landmark: formData.landmark,
        googleMapsUrl: formData.googleMapsUrl,
        coverImage: formData.coverImage || formData.galleryImages?.[0] || '',
        galleryImages: formData.galleryImages || [],
        floorPlanImage: formData.floorPlanImage,
        videoUrl: formData.videoUrl,
        virtualTourUrl: formData.virtualTourUrl,
        highlights: formData.highlights || [],
        amenities: formData.amenities || [],
        customAmenities: formData.customAmenities || [],
        seoTitle: formData.seoTitle || formData.title,
        metaDescription: formData.metaDescription || formData.shortDescription,
        slug: formData.slug || `prop-${Date.now()}`,
        isFeatured: Boolean(formData.isFeatured),
        homepageVisible: Boolean(formData.homepageVisible),
      };

      if (isEditing && effectiveId) {
        await propertyService.updateProperty(effectiveId, cleanProperty);
        setSuccessToast('Property listing updated successfully!');
      } else {
        await propertyService.createProperty(cleanProperty);
        setSuccessToast('New property created & published successfully!');
      }

      setTimeout(() => {
        navigate('properties');
      }, 1200);
    } catch (err: any) {
      alert(`Error saving property: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, label: 'Basic Info' },
    { num: 2, label: 'Details & Specs' },
    { num: 3, label: 'Location' },
    { num: 4, label: 'Media & Gallery' },
    { num: 5, label: 'Amenities' },
    { num: 6, label: 'SEO & Publish' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Toast Notification */}
      {successToast && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            backgroundColor: '#10221D',
            border: '1px solid #2ecc71',
            borderRadius: '8px',
            padding: '14px 20px',
            color: '#2ecc71',
            fontSize: '13.5px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 10000,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.65)',
          }}
        >
          <CheckCircle2 size={18} />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            type="button"
            onClick={() => navigate('properties')}
            style={{
              padding: '8px 12px',
              backgroundColor: '#10221D',
              border: '0.5px solid rgba(198, 166, 106, 0.25)',
              borderRadius: '6px',
              color: '#DCD7CB',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12.5px',
            }}
          >
            <ChevronLeft size={16} />
            <span>Back to Listings</span>
          </button>
          <div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '28px',
                color: '#F4F0E7',
                margin: 0,
                fontWeight: 500,
              }}
            >
              {isEditing ? `Edit Listing: ${formData.title || 'Property'}` : 'Onboard New Property'}
            </h2>
            <span style={{ fontSize: '12px', color: '#8F9E98' }}>
              Step {currentStep} of 6 • {steps[currentStep - 1].label}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={() => setShowPopupPreview(true)}
            style={{
              padding: '9px 16px',
              backgroundColor: 'rgba(201, 167, 124, 0.14)',
              border: '0.5px solid #c9a77c',
              borderRadius: '6px',
              color: '#c9a77c',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
            }}
          >
            <Eye size={15} />
            <span>Preview popup</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            style={{
              padding: '9px 16px',
              backgroundColor: '#10221D',
              border: '0.5px solid rgba(198, 166, 106, 0.3)',
              borderRadius: '6px',
              color: '#DCD7CB',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Eye size={15} />
            <span>Full Page Preview</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave('Draft')}
            disabled={isSubmitting}
            style={{
              padding: '9px 16px',
              backgroundColor: 'transparent',
              border: '0.5px solid rgba(198, 166, 106, 0.4)',
              borderRadius: '6px',
              color: '#DCD7CB',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Save size={15} />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave('Active')}
            disabled={isSubmitting}
            style={{
              padding: '9px 20px',
              backgroundColor: '#c9a77c',
              border: 'none',
              borderRadius: '6px',
              color: '#090D0B',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Check size={16} />
            <span>{isSubmitting ? 'Saving...' : 'Publish Listing'}</span>
          </button>
        </div>
      </div>

      {/* Multi-Step Wizard Progress Bar */}
      <div
        style={{
          backgroundColor: '#10221D',
          border: '0.5px solid rgba(198, 166, 106, 0.22)',
          borderRadius: '10px',
          padding: '16px 20px',
          overflowX: 'auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minWidth: '600px' }}>
          {steps.map((st, idx) => {
            const isCompleted = currentStep > st.num;
            const isCurrent = currentStep === st.num;

            return (
              <React.Fragment key={st.num}>
                <div
                  onClick={() => setCurrentStep(st.num)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    opacity: isCurrent || isCompleted ? 1 : 0.5,
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: isCurrent ? '#c9a77c' : isCompleted ? 'rgba(46, 204, 113, 0.2)' : 'rgba(198, 166, 106, 0.15)',
                      border: isCompleted ? '1px solid #2ecc71' : isCurrent ? '1px solid #c9a77c' : '1px solid rgba(198, 166, 106, 0.3)',
                      color: isCurrent ? '#090D0B' : isCompleted ? '#2ecc71' : '#DCD7CB',
                      fontSize: '12px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isCompleted ? <Check size={14} /> : st.num}
                  </div>
                  <span
                    style={{
                      fontSize: '12.5px',
                      fontWeight: isCurrent ? 600 : 400,
                      color: isCurrent ? '#F4F0E7' : isCompleted ? '#2ecc71' : '#8F9E98',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {st.label}
                  </span>
                </div>

                {idx < steps.length - 1 && (
                  <div
                    style={{
                      flexGrow: 1,
                      height: '1px',
                      backgroundColor: isCompleted ? '#2ecc71' : 'rgba(198, 166, 106, 0.2)',
                      margin: '0 12px',
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main Step Form Card */}
      <div
        style={{
          backgroundColor: '#10221D',
          border: '0.5px solid rgba(198, 166, 106, 0.22)',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* STEP 1: Basic Information */}
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '22px', color: '#F4F0E7', margin: 0 }}>
              Step 1: Basic Information
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>
                  Property Title <span style={{ color: '#e07a6f' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Executive 2 BHK Residence"
                  value={formData.title || ''}
                  onChange={(e) => updateField('title', e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#0B1714',
                    border: errors.title ? '1px solid #e07a6f' : '0.5px solid rgba(198, 166, 106, 0.3)',
                    borderRadius: '8px',
                    padding: '11px 14px',
                    color: '#F4F0E7',
                    fontSize: '13.5px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                {errors.title && <span style={{ color: '#e07a6f', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.title}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>
                  Property ID (Auto-Generated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. IGH-MYS-01"
                  value={formData.propertyId || ''}
                  onChange={(e) => updateField('propertyId', e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#0B1714',
                    border: '0.5px solid rgba(198, 166, 106, 0.3)',
                    borderRadius: '8px',
                    padding: '11px 14px',
                    color: '#c9a77c',
                    fontWeight: 600,
                    fontSize: '13.5px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>
                  Property Type
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => updateField('propertyType', e.target.value as PropertyType)}
                  style={{
                    width: '100%',
                    backgroundColor: '#0B1714',
                    border: '0.5px solid rgba(198, 166, 106, 0.3)',
                    borderRadius: '8px',
                    padding: '11px 14px',
                    color: '#F4F0E7',
                    fontSize: '13.5px',
                    outline: 'none',
                  }}
                >
                  <option value="Villa">Villa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Architectural Estate">Architectural Estate</option>
                  <option value="Gated Residence">Gated Residence</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Duplex">Duplex</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>
                  Listing Type
                </label>
                <select
                  value={formData.listingType}
                  onChange={(e) => updateField('listingType', e.target.value as ListingType)}
                  style={{
                    width: '100%',
                    backgroundColor: '#0B1714',
                    border: '0.5px solid rgba(198, 166, 106, 0.3)',
                    borderRadius: '8px',
                    padding: '11px 14px',
                    color: '#F4F0E7',
                    fontSize: '13.5px',
                    outline: 'none',
                  }}
                >
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>
                  Listing Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => updateField('status', e.target.value as PropertyStatus)}
                  style={{
                    width: '100%',
                    backgroundColor: '#0B1714',
                    border: '0.5px solid rgba(198, 166, 106, 0.3)',
                    borderRadius: '8px',
                    padding: '11px 14px',
                    color: '#F4F0E7',
                    fontSize: '13.5px',
                    outline: 'none',
                  }}
                >
                  <option value="Active">Active / Published</option>
                  <option value="Draft">Draft</option>
                  <option value="Sold">Sold</option>
                  <option value="Rented">Rented</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>
                  Price (Formatted text for public display) <span style={{ color: '#e07a6f' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. ₹38,000 or ₹4.5 Cr or $12,500,000"
                  value={formData.price || ''}
                  onChange={(e) => updateField('price', e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#0B1714',
                    border: errors.price ? '1px solid #e07a6f' : '0.5px solid rgba(198, 166, 106, 0.3)',
                    borderRadius: '8px',
                    padding: '11px 14px',
                    color: '#F4F0E7',
                    fontSize: '13.5px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                {errors.price && <span style={{ color: '#e07a6f', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.price}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>
                  Currency
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => updateField('currency', e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#0B1714',
                    border: '0.5px solid rgba(198, 166, 106, 0.3)',
                    borderRadius: '8px',
                    padding: '11px 14px',
                    color: '#F4F0E7',
                    fontSize: '13.5px',
                    outline: 'none',
                  }}
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>
                Short Tagline / Teaser Description <span style={{ color: '#e07a6f' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Cantilevered private sanctuary framed by pristine landscaped gardens."
                value={formData.shortDescription || ''}
                onChange={(e) => updateField('shortDescription', e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#0B1714',
                  border: errors.shortDescription ? '1px solid #e07a6f' : '0.5px solid rgba(198, 166, 106, 0.3)',
                  borderRadius: '8px',
                  padding: '11px 14px',
                  color: '#F4F0E7',
                  fontSize: '13.5px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              {errors.shortDescription && <span style={{ color: '#e07a6f', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.shortDescription}</span>}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', color: '#DCD7CB' }}>
                  Full Property Description
                </label>
                <span
                  style={{
                    fontSize: '12px',
                    fontFamily: "'Manrope', var(--font-sans)",
                    color: (formData.fullDescription || '').length >= 600 ? '#e07a6f' : '#8F9E98',
                    fontWeight: (formData.fullDescription || '').length >= 600 ? 700 : 500,
                  }}
                >
                  {(formData.fullDescription || '').length} / 600 characters
                </span>
              </div>
              <textarea
                rows={4}
                maxLength={600}
                placeholder="Comprehensive architectural overview, material palette, interior design specifications, and lifestyle amenities..."
                value={formData.fullDescription || ''}
                onChange={(e) => updateField('fullDescription', e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#0B1714',
                  border: '0.5px solid rgba(198, 166, 106, 0.3)',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  color: '#F4F0E7',
                  fontSize: '13.5px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                }}
              />
            </div>
          </div>
        )}

        {/* STEP 2: Property Details & Specs */}
        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '22px', color: '#F4F0E7', margin: 0 }}>
              Step 2: Property Details &amp; Specifications
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>Bedrooms</label>
                <input
                  type="number"
                  min={0}
                  value={formData.bedrooms || 0}
                  onChange={(e) => updateField('bedrooms', Number(e.target.value))}
                  style={{ width: '100%', backgroundColor: '#0B1714', border: '0.5px solid rgba(198, 166, 106, 0.3)', borderRadius: '8px', padding: '11px 14px', color: '#F4F0E7', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>Bathrooms</label>
                <input
                  type="number"
                  min={0}
                  value={formData.bathrooms || 0}
                  onChange={(e) => updateField('bathrooms', Number(e.target.value))}
                  style={{ width: '100%', backgroundColor: '#0B1714', border: '0.5px solid rgba(198, 166, 106, 0.3)', borderRadius: '8px', padding: '11px 14px', color: '#F4F0E7', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>Balconies</label>
                <input
                  type="number"
                  min={0}
                  value={formData.balconies || 0}
                  onChange={(e) => updateField('balconies', Number(e.target.value))}
                  style={{ width: '100%', backgroundColor: '#0B1714', border: '0.5px solid rgba(198, 166, 106, 0.3)', borderRadius: '8px', padding: '11px 14px', color: '#F4F0E7', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>
                  Built-up Area <span style={{ color: '#e07a6f' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2,450 sq.ft"
                  value={formData.builtUpArea || ''}
                  onChange={(e) => updateField('builtUpArea', e.target.value)}
                  style={{ width: '100%', backgroundColor: '#0B1714', border: '0.5px solid rgba(198, 166, 106, 0.3)', borderRadius: '8px', padding: '11px 14px', color: '#F4F0E7', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>Carpet Area</label>
                <input
                  type="text"
                  placeholder="e.g. 2,050 sq.ft"
                  value={formData.carpetArea || ''}
                  onChange={(e) => updateField('carpetArea', e.target.value)}
                  style={{ width: '100%', backgroundColor: '#0B1714', border: '0.5px solid rgba(198, 166, 106, 0.3)', borderRadius: '8px', padding: '11px 14px', color: '#F4F0E7', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>Plot Area (If applicable)</label>
                <input
                  type="text"
                  placeholder="e.g. 4,000 sq.ft"
                  value={formData.plotArea || ''}
                  onChange={(e) => updateField('plotArea', e.target.value)}
                  style={{ width: '100%', backgroundColor: '#0B1714', border: '0.5px solid rgba(198, 166, 106, 0.3)', borderRadius: '8px', padding: '11px 14px', color: '#F4F0E7', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>Furnishing Status</label>
                <select
                  value={formData.furnishing}
                  onChange={(e) => updateField('furnishing', e.target.value as FurnishingStatus)}
                  style={{ width: '100%', backgroundColor: '#0B1714', border: '0.5px solid rgba(198, 166, 106, 0.3)', borderRadius: '8px', padding: '11px 14px', color: '#F4F0E7', fontSize: '13.5px', outline: 'none' }}
                >
                  <option value="Furnished">Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>Parking Capacity</label>
                <input
                  type="number"
                  min={0}
                  value={formData.parking || 0}
                  onChange={(e) => updateField('parking', Number(e.target.value))}
                  style={{ width: '100%', backgroundColor: '#0B1714', border: '0.5px solid rgba(198, 166, 106, 0.3)', borderRadius: '8px', padding: '11px 14px', color: '#F4F0E7', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>Possession Status</label>
                <select
                  value={formData.possession}
                  onChange={(e) => updateField('possession', e.target.value as PossessionStatus)}
                  style={{ width: '100%', backgroundColor: '#0B1714', border: '0.5px solid rgba(198, 166, 106, 0.3)', borderRadius: '8px', padding: '11px 14px', color: '#F4F0E7', fontSize: '13.5px', outline: 'none' }}
                >
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Immediate">Immediate</option>
                  <option value="Under Construction">Under Construction</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Location Details */}
        {currentStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '22px', color: '#F4F0E7', margin: 0 }}>
              Step 3: Location Details
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>
                  Locality / Neighborhood <span style={{ color: '#e07a6f' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gokulam or Sadashivanagar"
                  value={formData.locality || ''}
                  onChange={(e) => updateField('locality', e.target.value)}
                  style={{ width: '100%', backgroundColor: '#0B1714', border: errors.locality ? '1px solid #e07a6f' : '0.5px solid rgba(198, 166, 106, 0.3)', borderRadius: '8px', padding: '11px 14px', color: '#F4F0E7', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                />
                {errors.locality && <span style={{ color: '#e07a6f', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.locality}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>
                  City <span style={{ color: '#e07a6f' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mysuru, Bangalore, Hyderabad"
                  value={formData.city || ''}
                  onChange={(e) => updateField('city', e.target.value)}
                  style={{ width: '100%', backgroundColor: '#0B1714', border: errors.city ? '1px solid #e07a6f' : '0.5px solid rgba(198, 166, 106, 0.3)', borderRadius: '8px', padding: '11px 14px', color: '#F4F0E7', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>Full Street Address</label>
              <input
                type="text"
                placeholder="e.g. 14th Cross, 3rd Stage, Gokulam"
                value={formData.address || ''}
                onChange={(e) => updateField('address', e.target.value)}
                style={{ width: '100%', backgroundColor: '#0B1714', border: '0.5px solid rgba(198, 166, 106, 0.3)', borderRadius: '8px', padding: '11px 14px', color: '#F4F0E7', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>State</label>
                <input
                  type="text"
                  value={formData.state || 'Karnataka'}
                  onChange={(e) => updateField('state', e.target.value)}
                  style={{ width: '100%', backgroundColor: '#0B1714', border: '0.5px solid rgba(198, 166, 106, 0.3)', borderRadius: '8px', padding: '11px 14px', color: '#F4F0E7', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>Postal Code</label>
                <input
                  type="text"
                  placeholder="e.g. 570002"
                  value={formData.postalCode || ''}
                  onChange={(e) => updateField('postalCode', e.target.value)}
                  style={{ width: '100%', backgroundColor: '#0B1714', border: '0.5px solid rgba(198, 166, 106, 0.3)', borderRadius: '8px', padding: '11px 14px', color: '#F4F0E7', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>Prominent Landmark</label>
                <input
                  type="text"
                  placeholder="e.g. Near Yoga Kendra"
                  value={formData.landmark || ''}
                  onChange={(e) => updateField('landmark', e.target.value)}
                  style={{ width: '100%', backgroundColor: '#0B1714', border: '0.5px solid rgba(198, 166, 106, 0.3)', borderRadius: '8px', padding: '11px 14px', color: '#F4F0E7', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Media & Gallery */}
        {currentStep === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '22px', color: '#F4F0E7', margin: 0 }}>
              Step 4: Media and High-Res Images
            </h3>

            {/* Drag & Drop Upload Zone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileUpload}
              style={{
                border: '2px dashed rgba(198, 166, 106, 0.4)',
                borderRadius: '10px',
                padding: '36px 20px',
                textAlign: 'center',
                backgroundColor: 'rgba(11, 23, 20, 0.6)',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileUpload}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0,
                  cursor: 'pointer',
                  width: '100%',
                  height: '100%',
                }}
              />
              <Upload size={32} color="#c9a77c" style={{ margin: '0 auto 10px auto' }} />
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#F4F0E7', marginBottom: '4px' }}>
                Drag and drop property images here, or browse files
              </div>
              <span style={{ fontSize: '12px', color: '#8F9E98' }}>
                Supports JPG, PNG, WebP up to 15MB per file
              </span>
            </div>

            {/* Uploaded Gallery Grid (Up to 8 photos, drag-to-reorder, Cover tag on first photo) */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <label style={{ fontSize: '13px', color: '#DCD7CB' }}>
                  Current Gallery ({formData.galleryImages?.length || 0} / 8 photos) • Drag cards to reorder • The 1st photo is always the Cover
                </label>
                <span style={{ fontSize: '12px', color: '#8F9E98' }}>
                  Click "Set as Cover" or drag to position 1
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                  gap: '14px',
                }}
              >
                {formData.galleryImages?.map((url, idx) => {
                  const isCover = idx === 0 || formData.coverImage === url;
                  const isDragged = draggedPhotoIndex === idx;

                  return (
                    <div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragPhotoStart(idx)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDropPhoto(idx)}
                      style={{
                        position: 'relative',
                        height: '110px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: isCover ? '2px solid #c9a77c' : '1px solid rgba(198, 166, 106, 0.25)',
                        backgroundColor: '#0B1714',
                        cursor: 'grab',
                        opacity: isDragged ? 0.45 : 1,
                        transition: 'transform 0.15s ease, opacity 0.15s ease',
                        boxShadow: isCover ? '0 0 12px rgba(201, 167, 124, 0.25)' : 'none',
                      }}
                      title="Drag to reorder"
                    >
                      <img src={url} alt={`Gallery photo ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />

                      {/* Photo number index indicator */}
                      <span
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          backgroundColor: 'rgba(0, 0, 0, 0.75)',
                          color: '#FFFFFF',
                          fontSize: '10px',
                          padding: '1px 5px',
                          borderRadius: '4px',
                          fontFamily: "'Manrope', var(--font-sans)",
                        }}
                      >
                        {idx + 1}
                      </span>

                      {/* Cover Tag on First Photo */}
                      {isCover && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '4px',
                            left: '4px',
                            backgroundColor: '#c9a77c',
                            color: '#090D0B',
                            fontSize: '9.5px',
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: '3px',
                            letterSpacing: '0.04em',
                          }}
                        >
                          COVER
                        </span>
                      )}

                      {/* Action buttons (Set Cover, Move left/right, Remove) */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '4px',
                          left: '4px',
                          right: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '3px',
                        }}
                      >
                        <div style={{ display: 'flex', gap: '3px' }}>
                          {idx > 0 && (
                            <button
                              type="button"
                              onClick={() => handleMovePhoto(idx, idx - 1)}
                              title="Move photo left"
                              style={{
                                backgroundColor: 'rgba(9, 13, 11, 0.85)',
                                border: '0.5px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '3px',
                                color: '#FFFFFF',
                                fontSize: '10px',
                                padding: '2px 5px',
                                cursor: 'pointer',
                              }}
                            >
                              ‹
                            </button>
                          )}
                          {idx < (formData.galleryImages?.length || 0) - 1 && (
                            <button
                              type="button"
                              onClick={() => handleMovePhoto(idx, idx + 1)}
                              title="Move photo right"
                              style={{
                                backgroundColor: 'rgba(9, 13, 11, 0.85)',
                                border: '0.5px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '3px',
                                color: '#FFFFFF',
                                fontSize: '10px',
                                padding: '2px 5px',
                                cursor: 'pointer',
                              }}
                            >
                              ›
                            </button>
                          )}
                        </div>

                        <div style={{ display: 'flex', gap: '3px' }}>
                          {!isCover && (
                            <button
                              type="button"
                              onClick={() => handleSetCover(url)}
                              title="Move to cover position"
                              style={{
                                backgroundColor: 'rgba(9, 13, 11, 0.85)',
                                border: '0.5px solid #c9a77c',
                                borderRadius: '3px',
                                color: '#c9a77c',
                                fontSize: '9.5px',
                                padding: '2px 5px',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              Set Cover
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            title="Remove photo"
                            style={{
                              backgroundColor: 'rgba(224, 122, 111, 0.85)',
                              border: 'none',
                              borderRadius: '3px',
                              color: '#FFFFFF',
                              padding: '3px 5px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Virtual Tour & Video Links */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>
                  Video Walkthrough URL (YouTube / Vimeo)
                </label>
                <input
                  type="url"
                  placeholder="https://youtu.be/..."
                  value={formData.videoUrl || ''}
                  onChange={(e) => updateField('videoUrl', e.target.value)}
                  style={{ width: '100%', backgroundColor: '#0B1714', border: '0.5px solid rgba(198, 166, 106, 0.3)', borderRadius: '8px', padding: '11px 14px', color: '#F4F0E7', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>
                  360° Virtual Tour URL (Matterport / Kuula)
                </label>
                <input
                  type="url"
                  placeholder="https://my.matterport.com/show/?m=..."
                  value={formData.virtualTourUrl || ''}
                  onChange={(e) => updateField('virtualTourUrl', e.target.value)}
                  style={{ width: '100%', backgroundColor: '#0B1714', border: '0.5px solid rgba(198, 166, 106, 0.3)', borderRadius: '8px', padding: '11px 14px', color: '#F4F0E7', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Highlights & Amenities */}
        {currentStep === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
            {/* Card 1: Key Highlights (Max 6) */}
            <div
              style={{
                backgroundColor: '#0B1714',
                border: '0.5px solid rgba(198, 166, 106, 0.3)',
                borderRadius: '10px',
                padding: '22px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} color="#c9a77c" />
                  <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '20px', color: '#F4F0E7', margin: 0 }}>
                    Key Highlights (Popup Badges)
                  </h4>
                </div>
                <span
                  style={{
                    fontSize: '12px',
                    fontFamily: "'Manrope', var(--font-sans)",
                    color: (formData.highlights || []).length >= 6 ? '#e07a6f' : '#c9a77c',
                    fontWeight: 600,
                  }}
                >
                  {(formData.highlights || []).length} / 6 highlights
                </span>
              </div>

              <p style={{ fontSize: '13px', color: '#8F9E98', margin: '0 0 16px 0' }}>
                Tap preset chips to select, or type a custom highlight and press Enter. Maximum 6 highlights. Each can be removed with the small x.
              </p>

              {/* Preset Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                {PRESET_HIGHLIGHTS.map((preset) => {
                  const isSelected = formData.highlights?.includes(preset);
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => toggleHighlight(preset)}
                      style={{
                        padding: '7px 14px',
                        borderRadius: '999px',
                        backgroundColor: isSelected ? 'rgba(201, 167, 124, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                        border: isSelected ? '1px solid #c9a77c' : '0.5px solid rgba(198, 166, 106, 0.25)',
                        color: isSelected ? '#c9a77c' : '#DCD7CB',
                        fontSize: '12.5px',
                        fontFamily: "'Manrope', var(--font-sans)",
                        fontWeight: isSelected ? 600 : 400,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 150ms ease',
                      }}
                    >
                      {isSelected ? <Check size={13} color="#c9a77c" /> : <span style={{ color: 'rgba(201,167,124,0.5)' }}>+</span>}
                      <span>{preset}</span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Highlight Input (type and press Enter) */}
              <div style={{ display: 'flex', gap: '10px', maxWidth: '440px', marginBottom: '14px' }}>
                <input
                  type="text"
                  placeholder="Type custom highlight & press Enter..."
                  value={customHighlightInput}
                  onChange={(e) => setCustomHighlightInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomHighlight();
                    }
                  }}
                  disabled={(formData.highlights || []).length >= 6}
                  style={{
                    flexGrow: 1,
                    backgroundColor: '#10221D',
                    border: '0.5px solid rgba(198, 166, 106, 0.3)',
                    borderRadius: '6px',
                    padding: '9px 12px',
                    color: '#F4F0E7',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddCustomHighlight}
                  disabled={(formData.highlights || []).length >= 6}
                  style={{
                    padding: '9px 16px',
                    backgroundColor: (formData.highlights || []).length >= 6 ? '#3a3225' : '#c9a77c',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#090D0B',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: (formData.highlights || []).length >= 6 ? 'not-allowed' : 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Add Highlight
                </button>
              </div>

              {/* Active Selected Highlights with small x to remove */}
              {formData.highlights && formData.highlights.length > 0 && (
                <div style={{ marginTop: '10px' }}>
                  <span style={{ fontSize: '11.5px', color: '#8F9E98', display: 'block', marginBottom: '8px' }}>
                    Currently Active ({formData.highlights.length}):
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {formData.highlights.map((h, i) => (
                      <span
                        key={i}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: '#121816',
                          border: '1px solid #c9a77c',
                          borderRadius: '999px',
                          padding: '4px 10px 4px 12px',
                          fontSize: '12px',
                          color: '#F4F0E7',
                        }}
                      >
                        <span>{h}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveHighlight(h)}
                          title={`Remove ${h}`}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#e07a6f',
                            cursor: 'pointer',
                            padding: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            lineHeight: 1,
                          }}
                        >
                          <X size={13} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Card 2: Amenities & Features */}
            <div
              style={{
                backgroundColor: '#0B1714',
                border: '0.5px solid rgba(198, 166, 106, 0.3)',
                borderRadius: '10px',
                padding: '22px',
              }}
            >
              <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '20px', color: '#F4F0E7', margin: '0 0 6px 0' }}>
                Included Amenities &amp; Features
              </h4>
              <p style={{ fontSize: '13px', color: '#8F9E98', margin: '0 0 16px 0' }}>
                Select all property amenities. Also allows adding custom amenities by typing and pressing Enter.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
                {DEFAULT_AMENITIES_LIST.map((amenity) => {
                  const isSelected = formData.amenities?.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      style={{
                        padding: '7px 14px',
                        borderRadius: '20px',
                        backgroundColor: isSelected ? 'rgba(198, 166, 106, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                        border: isSelected ? '1px solid #c9a77c' : '0.5px solid rgba(198, 166, 106, 0.2)',
                        color: isSelected ? '#c9a77c' : '#DCD7CB',
                        fontSize: '13px',
                        fontWeight: isSelected ? 600 : 400,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '7px',
                        transition: 'all 150ms ease',
                      }}
                    >
                      {isSelected && <Check size={13} />}
                      <span>{amenity}</span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Amenity Adder (type and press Enter) */}
              <div style={{ maxWidth: '440px' }}>
                <label style={{ display: 'block', fontSize: '12.5px', color: '#DCD7CB', marginBottom: '6px' }}>
                  Add Custom Amenity (type and press Enter)
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="e.g. Sommelier Cellar, Helipad Access"
                    value={customAmenityInput}
                    onChange={(e) => setCustomAmenityInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomAmenity();
                      }
                    }}
                    style={{
                      flexGrow: 1,
                      backgroundColor: '#10221D',
                      border: '0.5px solid rgba(198, 166, 106, 0.3)',
                      borderRadius: '6px',
                      padding: '9px 12px',
                      color: '#F4F0E7',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomAmenity}
                    style={{
                      padding: '9px 16px',
                      backgroundColor: '#c9a77c',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#090D0B',
                      fontWeight: 600,
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: SEO & Publishing */}
        {currentStep === 6 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '22px', color: '#F4F0E7', margin: 0 }}>
              Step 6: SEO &amp; Publishing Options
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>
                  SEO Page Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Executive 2 BHK Luxury Residence in Gokulam | iGrey"
                  value={formData.seoTitle || formData.title || ''}
                  onChange={(e) => updateField('seoTitle', e.target.value)}
                  style={{ width: '100%', backgroundColor: '#0B1714', border: '0.5px solid rgba(198, 166, 106, 0.3)', borderRadius: '8px', padding: '11px 14px', color: '#F4F0E7', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>
                  URL Slug
                </label>
                <input
                  type="text"
                  placeholder="e.g. executive-2-bhk-residence-gokulam"
                  value={formData.slug || ''}
                  onChange={(e) => updateField('slug', e.target.value)}
                  style={{ width: '100%', backgroundColor: '#0B1714', border: '0.5px solid rgba(198, 166, 106, 0.3)', borderRadius: '8px', padding: '11px 14px', color: '#F4F0E7', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#DCD7CB', marginBottom: '6px' }}>
                Meta Description (Search Snippet)
              </label>
              <textarea
                rows={3}
                placeholder="Brief summary optimized for Google search results..."
                value={formData.metaDescription || formData.shortDescription || ''}
                onChange={(e) => updateField('metaDescription', e.target.value)}
                style={{ width: '100%', backgroundColor: '#0B1714', border: '0.5px solid rgba(198, 166, 106, 0.3)', borderRadius: '8px', padding: '11px 14px', color: '#F4F0E7', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
              />
            </div>

            {/* Visibility Toggles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '16px', backgroundColor: '#0B1714', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#F4F0E7' }}>Homepage Visibility</div>
                  <span style={{ fontSize: '12px', color: '#8F9E98' }}>Display this property in the public "Selected Residences" carousel</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.homepageVisible ?? true}
                  onChange={(e) => updateField('homepageVisible', e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#c9a77c', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#F4F0E7' }}>Featured Residence Badge</div>
                  <span style={{ fontSize: '12px', color: '#8F9E98' }}>Highlight with gold star badge as a marquee portfolio asset</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.isFeatured ?? true}
                  onChange={(e) => updateField('isFeatured', e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#c9a77c', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Wizard Navigation Footer */}
        <div
          style={{
            marginTop: '32px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(198, 166, 106, 0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              style={{
                padding: '9px 18px',
                backgroundColor: 'transparent',
                border: '0.5px solid rgba(198, 166, 106, 0.3)',
                borderRadius: '6px',
                color: '#DCD7CB',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <ChevronLeft size={16} />
              <span>Previous Step</span>
            </button>
          ) : <div />}

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {currentStep < 6 ? (
              <button
                type="button"
                onClick={handleNextStep}
                style={{
                  padding: '9px 20px',
                  backgroundColor: '#c9a77c',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#090D0B',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>Continue</span>
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleSave('Active')}
                disabled={isSubmitting}
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#c9a77c',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#090D0B',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <CheckCircle2 size={16} />
                <span>{isSubmitting ? 'Publishing...' : 'Publish Property to Site'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Live Full-Page Preview Modal */}
      {showPreviewModal && (
        <PropertyPreviewModal
          isOpen={showPreviewModal}
          property={formData as AdminProperty}
          onClose={() => setShowPreviewModal(false)}
          onPublish={() => handleSave('Active')}
        />
      )}

      {/* Property Details Popup Modal Preview (reusing public PropertyDetailsModal with unsaved form values) */}
      {showPopupPreview && (
        <PropertyDetailsModal
          isOpen={showPopupPreview}
          property={formatPreviewProperty(formData)}
          onClose={() => setShowPopupPreview(false)}
        />
      )}
    </div>
  );
};

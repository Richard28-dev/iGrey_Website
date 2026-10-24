import React from 'react';

interface PropertiesHeaderProps {
  level?: 'h1' | 'h2';
  className?: string;
}

export const PropertiesHeader: React.FC<PropertiesHeaderProps> = ({
  level = 'h2',
  className = '',
}) => {
  const HeadingTag = level;

  return (
    <div className={`properties-shared-header ${className}`}>
      {/* Eyebrow: FEATURED & AVAILABLE PROPERTIES with 40px 1px lines on both sides */}
      <div className="properties-header-eyebrow-wrap">
        <span className="properties-eyebrow-line" aria-hidden="true" />
        <span className="properties-header-eyebrow">FEATURED &amp; AVAILABLE PROPERTIES</span>
        <span className="properties-eyebrow-line" aria-hidden="true" />
      </div>

      {/* Heading: Find Your Next Space (Next Space as <em> in italic gold) */}
      <HeadingTag className="properties-header-title">
        Find Your <em className="properties-title-em">Next Space.</em>
      </HeadingTag>

      {/* Paragraph: Centered, max-width 620px */}
      <p className="properties-header-desc">
        Discover properties that match your lifestyle, business needs or investment objectives.
        Explore available homes, commercial spaces and other real estate opportunities through
        iGREY HOLDINGS.
      </p>
    </div>
  );
};

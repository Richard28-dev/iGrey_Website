import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Search, Copy } from 'lucide-react';
import { mediaService } from '../services/mediaService';
import type { MediaItem } from '../types';

export const MediaLibrary: React.FC = () => {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadMedia = async () => {
    const list = await mediaService.getAllMedia();
    setMediaList(list);
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
    let files: FileList | null = null;
    if ('dataTransfer' in e) {
      e.preventDefault();
      files = e.dataTransfer.files;
    } else if (e.target.files) {
      files = e.target.files;
    }

    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      mediaService.addMedia(file).then(() => loadMedia());
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this media asset from library?')) {
      await mediaService.deleteMedia(id);
      loadMedia();
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filtered = mediaList.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '28px', color: '#F4F0E7', margin: '0 0 4px 0', fontWeight: 500 }}>
          Media &amp; Asset Library
        </h2>
        <span style={{ fontSize: '13px', color: '#8F9E98' }}>
          High-resolution photography, architectural blueprints, and media assets.
        </span>
      </div>

      {/* Upload Dropzone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleUpload}
        style={{
          border: '2px dashed rgba(198, 166, 106, 0.35)',
          borderRadius: '10px',
          padding: '30px 20px',
          textAlign: 'center',
          backgroundColor: '#10221D',
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleUpload}
          style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
        />
        <Upload size={28} color="#c9a77c" style={{ margin: '0 auto 8px auto' }} />
        <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#F4F0E7', marginBottom: '2px' }}>
          Drop high-resolution images here or click to browse
        </div>
        <span style={{ fontSize: '12px', color: '#8F9E98' }}>JPG, PNG, WebP up to 15MB</span>
      </div>

      {/* Search Bar */}
      <div style={{ position: 'relative', maxWidth: '360px' }}>
        <Search size={15} color="#8F9E98" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          placeholder="Search media assets by filename..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            backgroundColor: '#10221D',
            border: '0.5px solid rgba(198, 166, 106, 0.25)',
            borderRadius: '6px',
            padding: '9px 12px 9px 34px',
            color: '#F4F0E7',
            fontSize: '12.5px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Media Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '18px',
        }}
      >
        {filtered.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: '#10221D',
              border: '0.5px solid rgba(198, 166, 106, 0.22)',
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
            }}
          >
            <div style={{ height: '140px', backgroundColor: '#0B1714', position: 'relative' }}>
              <img src={item.url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '6px', flexGrow: 1 }}>
              <div
                style={{
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: '#F4F0E7',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                title={item.name}
              >
                {item.name}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#8F9E98' }}>
                <span>{item.dimensions || 'High-Res'}</span>
                <span>{Math.round(item.sizeBytes / 1024)} KB</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid rgba(198, 166, 106, 0.12)' }}>
                <button
                  type="button"
                  onClick={() => handleCopyUrl(item.url, item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: copiedId === item.id ? '#2ecc71' : '#c9a77c',
                    fontSize: '11px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: 0,
                  }}
                >
                  <Copy size={12} />
                  <span>{copiedId === item.id ? 'Copied' : 'Copy URL'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  title="Delete Media"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#e07a6f',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

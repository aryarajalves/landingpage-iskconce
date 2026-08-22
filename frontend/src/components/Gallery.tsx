import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Camera, ExternalLink, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { TEMPLE_DATA, GalleryPhoto } from '../data/templeInfo';
import { InstagramIcon } from './Icons';

export const Gallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  // Zoom & Pan State for Lightbox
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Extract unique categories
  const categories = ['Todas', ...Array.from(new Set(TEMPLE_DATA.gallery.map(p => p.category)))];

  // Filter photos based on category
  const filteredPhotos = selectedCategory === 'Todas'
    ? TEMPLE_DATA.gallery
    : TEMPLE_DATA.gallery.filter(p => p.category === selectedCategory);

  const resetZoom = useCallback(() => {
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  }, []);

  // Lightbox Navigation Callbacks
  const handleNext = useCallback(() => {
    if (!selectedPhoto) return;
    resetZoom();
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  }, [selectedPhoto, filteredPhotos, resetZoom]);

  const handlePrev = useCallback(() => {
    if (!selectedPhoto) return;
    resetZoom();
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIndex]);
  }, [selectedPhoto, filteredPhotos, resetZoom]);

  // Zoom helpers
  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomScale(prev => Math.min(prev + 0.5, 3.5));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomScale(prev => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPanPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleToggleZoomClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (zoomScale > 1) {
      resetZoom();
    } else {
      setZoomScale(2);
    }
  };

  // Drag to Pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - panPosition.x, y: e.clientY - panPosition.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomScale <= 1) return;
    setPanPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Handlers for Mobile Panning
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoomScale <= 1 || e.touches.length !== 1) return;
    setIsDragging(true);
    const touch = e.touches[0];
    dragStartRef.current = { x: touch.clientX - panPosition.x, y: touch.clientY - panPosition.y };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || zoomScale <= 1 || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setPanPosition({
      x: touch.clientX - dragStartRef.current.x,
      y: touch.clientY - dragStartRef.current.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Lock background scroll & handle Keyboard shortcuts
  useEffect(() => {
    if (selectedPhoto) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedPhoto(null);
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === '+' || e.key === '=') setZoomScale(prev => Math.min(prev + 0.5, 3.5));
        if (e.key === '-') setZoomScale(prev => {
          const next = Math.max(prev - 0.5, 1);
          if (next === 1) setPanPosition({ x: 0, y: 0 });
          return next;
        });
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow || 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedPhoto, handleNext, handlePrev]);

  return (
    <div id="galeria" className="bg-white/95 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-md border border-amber-200/80 mb-8" data-testid="gallery-section">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-amber-100 text-center sm:text-left">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-2">
            <Camera className="w-3.5 h-3.5 text-amber-700" />
            <span>Galeria Oficial do Templo</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Conheça o Templo e Nossos Momentos
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1">
            Registros reais do altar, estudos, canto devocional e da nossa comunidade no Ceará.
          </p>
        </div>

        <a
          href={TEMPLE_DATA.contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link-gallery-instagram"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-200 transition-all flex-shrink-0"
        >
          <InstagramIcon className="w-4 h-4 text-pink-600" />
          <span>Instagram @iskcon_ce</span>
          <ExternalLink className="w-3 h-3 text-stone-400" />
        </a>
      </div>

      {/* Category Filter Pills */}
      {categories.length > 2 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none" data-testid="gallery-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                resetZoom();
              }}
              data-testid={`filter-${cat}`}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-700 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-amber-50 hover:text-amber-900 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Photo Grid (1 col mobile, 2 col tablet, 3 col desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            data-testid={`gallery-item-${photo.id}`}
            onClick={() => {
              resetZoom();
              setSelectedPhoto(photo);
            }}
            className="group relative rounded-2xl overflow-hidden bg-stone-50 border border-amber-200/70 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            {/* Image Container with customized focal point / objectPosition */}
            <div className="relative h-64 w-full overflow-hidden bg-stone-900">
              <img
                src={photo.imageUrl}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: photo.objectPosition || 'center center' }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              {/* Category Pill */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md text-amber-200 text-[11px] font-medium border border-white/20">
                  {photo.category}
                </span>
              </div>

              {/* Zoom Icon on Hover */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-black/50 text-white backdrop-blur shadow-md">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>

            {/* Content & Description Below Image */}
            <div className="p-4 bg-white flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-stone-900 text-sm sm:text-base mb-1.5 leading-snug">
                  {photo.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {photo.description}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-amber-100/80 flex items-center justify-between text-[11px] text-amber-800 font-medium">
                <span>Clique para ver e dar zoom</span>
                <span>🔍 Ver foto</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Stream Notice */}
      <div className="mt-8 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-center text-xs text-stone-700">
        📸 <strong>Transmitimos ao vivo:</strong> Acompanhe todas as transmissões de domingo diretamente no perfil{' '}
        <a
          href={TEMPLE_DATA.contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-900 font-bold hover:underline"
        >
          {TEMPLE_DATA.contact.instagramHandle}
        </a>.
      </div>

      {/* Fullscreen Centered Lightbox Modal - Only closed by clicking the 'X' button or ESC */}
      {selectedPhoto && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          data-testid="gallery-lightbox"
          className="fixed inset-0 z-[99999] w-screen h-screen flex flex-col items-center justify-center bg-black/95 backdrop-blur-md select-none animate-fadeIn overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Top Floating Control Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/90 border border-white/20 text-white backdrop-blur-md shadow-2xl z-50"
            data-testid="zoom-controls"
          >
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoomScale >= 3.5}
              data-testid="btn-zoom-in"
              title="Aumentar Zoom (+)"
              className="p-1.5 rounded-full hover:bg-white/20 disabled:opacity-40 transition-colors cursor-pointer"
            >
              <ZoomIn className="w-5 h-5" />
            </button>

            <span className="text-xs font-semibold text-amber-300 min-w-[3rem] text-center">
              {Math.round(zoomScale * 100)}%
            </span>

            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoomScale <= 1}
              data-testid="btn-zoom-out"
              title="Diminuir Zoom (-)"
              className="p-1.5 rounded-full hover:bg-white/20 disabled:opacity-40 transition-colors cursor-pointer"
            >
              <ZoomOut className="w-5 h-5" />
            </button>

            {zoomScale > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  resetZoom();
                }}
                data-testid="btn-zoom-reset"
                title="Redefinir Zoom"
                className="p-1.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer text-amber-400"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Top-Right Close Button (Only explicit button to close the popup) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhoto(null);
            }}
            data-testid="btn-close-lightbox"
            aria-label="Fechar popup"
            className="fixed top-4 right-4 sm:top-6 sm:right-6 p-3 sm:p-3.5 rounded-full bg-white/15 hover:bg-white/30 text-white transition-all shadow-2xl active:scale-90 z-50 cursor-pointer border border-white/20"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            data-testid="btn-prev-photo"
            aria-label="Foto anterior"
            className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all shadow-2xl active:scale-90 z-50 cursor-pointer"
          >
            <ChevronLeft className="w-7 h-7 sm:w-10 sm:h-10" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            data-testid="btn-next-photo"
            aria-label="Próxima foto"
            className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all shadow-2xl active:scale-90 z-50 cursor-pointer"
          >
            <ChevronRight className="w-7 h-7 sm:w-10 sm:h-10" />
          </button>

          {/* Centered Popup Content with Zoom & Pan */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col items-center justify-center max-w-[92vw] max-h-[85vh] z-40 px-2 py-4"
          >
            {/* Centered Zoomable Image Viewport */}
            <div
              className={`flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20 bg-stone-950 ${
                zoomScale > 1
                  ? isDragging
                    ? 'cursor-grabbing'
                    : 'cursor-grab'
                  : 'cursor-zoom-in'
              }`}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={handleToggleZoomClick}
              data-testid="zoomable-image-container"
            >
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.alt}
                style={{
                  transform: `scale(${zoomScale}) translate(${panPosition.x / zoomScale}px, ${panPosition.y / zoomScale}px)`,
                  transition: isDragging ? 'none' : 'transform 0.25s ease-out',
                }}
                className="max-h-[62vh] sm:max-h-[68vh] w-auto max-w-[85vw] object-contain rounded-2xl pointer-events-none select-none"
              />
            </div>

            {/* Description & Index Below Image */}
            <div className="mt-3 sm:mt-4 text-center text-white max-w-xl px-4">
              <div className="inline-flex items-center gap-2 mb-1">
                <span className="px-3 py-0.5 rounded-full bg-amber-600 text-white text-[11px] font-semibold uppercase tracking-wider">
                  {selectedPhoto.category}
                </span>
                <span className="text-[11px] text-stone-400 font-medium">
                  {zoomScale > 1 ? '🔍 Arraste para navegar no zoom' : '💡 Clique na imagem ou no (+) para dar zoom'}
                </span>
              </div>
              
              <h3 className="font-serif text-base sm:text-xl font-bold text-amber-100">
                {selectedPhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 mt-1 leading-relaxed">
                {selectedPhoto.description}
              </p>
              <span className="text-[11px] text-stone-400 mt-1.5 block font-medium">
                {`Foto ${filteredPhotos.findIndex(p => p.id === selectedPhoto.id) + 1} de ${filteredPhotos.length}`}
              </span>
            </div>
          </div>

        </div>,
        document.body
      )}

    </div>
  );
};

import React from 'react';
import { MemoryPhoto } from '../types';
import { X, ChevronLeft, ChevronRight, Heart, Calendar } from 'lucide-react';

interface LightboxModalProps {
  photo: MemoryPhoto | null;
  allPhotos: MemoryPhoto[];
  onClose: () => void;
  onNavigate: (photo: MemoryPhoto) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photo,
  allPhotos,
  onClose,
  onNavigate,
}) => {
  const [loved, setLoved] = React.useState(false);

  if (!photo) return null;

  const currentIndex = allPhotos.findIndex((p) => p.id === photo.id);
  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + allPhotos.length) % allPhotos.length;
    onNavigate(allPhotos[prevIndex]);
    setLoved(false);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % allPhotos.length;
    onNavigate(allPhotos[nextIndex]);
    setLoved(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-800 flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/60 text-stone-300 hover:text-white hover:bg-black/80 transition-all"
          title="Close preview"
          id="lightbox-close-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/60 text-stone-200 hover:text-white hover:bg-black/90 transition-all active:scale-90"
          title="Previous photo"
          id="lightbox-prev-btn"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/60 text-stone-200 hover:text-white hover:bg-black/90 transition-all active:scale-90"
          title="Next photo"
          id="lightbox-next-btn"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Container */}
        <div className="relative flex-1 bg-black flex items-center justify-center p-2 min-h-[300px] md:min-h-[480px]">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            referrerPolicy="no-referrer"
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg"
          />
        </div>

        {/* Info Panel */}
        <div className="w-full md:w-80 p-6 bg-stone-900 text-stone-100 flex flex-col justify-between border-t md:border-t-0 md:border-l border-stone-800">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-950/60 border border-rose-800/50 px-2.5 py-1 rounded-full">
                Memory 0{currentIndex + 1} of 0{allPhotos.length}
              </span>
              {photo.date && (
                <span className="text-xs text-stone-400 flex items-center gap-1 font-sans-body">
                  <Calendar className="w-3.5 h-3.5 text-rose-400" />
                  {photo.date}
                </span>
              )}
            </div>

            <h3 className="font-serif-display text-2xl font-semibold text-stone-100 mb-2">
              {photo.title}
            </h3>

            <p className="font-script text-stone-300 text-lg leading-relaxed mb-6">
              "{photo.caption}"
            </p>
          </div>

          <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
            <button
              onClick={() => setLoved(!loved)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-sans-body text-xs font-semibold transition-all ${
                loved
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white'
              }`}
              id="lightbox-love-toggle"
            >
              <Heart className={`w-4 h-4 ${loved ? 'fill-current' : ''}`} />
              {loved ? 'Loved Memory 💕' : 'Send Love'}
            </button>

            <span className="text-xs text-stone-500 font-sans-body">
              Swipe or tap arrows
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

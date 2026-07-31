import React from 'react';
import { MemoryPhoto } from '../types';
import { Maximize2, Edit3, Heart } from 'lucide-react';

interface PhotoCardProps {
  photo: MemoryPhoto;
  index: number;
  onZoom: (photo: MemoryPhoto) => void;
  onEditPhoto?: (photo: MemoryPhoto) => void;
  isEditMode?: boolean;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  index,
  onZoom,
  onEditPhoto,
  isEditMode = false,
}) => {
  const [loved, setLoved] = React.useState(false);

  return (
    <div
      onClick={() => onZoom(photo)}
      className={`group relative bg-white/40 backdrop-blur-xl border-8 border-white/80 p-4 sm:p-5 pb-6 rounded-2xl shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:z-20 cursor-pointer ${photo.rotation}`}
      id={`photo-card-${index}`}
    >
      {/* Tape effect on top corner */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 polaroid-tape rounded-sm transform -rotate-1 border border-amber-100/40 z-10 opacity-90" />

      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xs bg-amber-50/50 group-hover:bg-amber-100/50 transition-colors">
        <img
          src={photo.imageUrl}
          alt={photo.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Overlay with action buttons (visible on mobile tap / desktop hover) */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
          {photo.date ? (
            <span className="text-xs font-sans-body font-medium text-amber-100 bg-stone-900/60 px-2.5 py-1 rounded-full backdrop-blur-sm">
              {photo.date}
            </span>
          ) : <div />}

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLoved(!loved);
              }}
              className={`p-2.5 sm:p-2 rounded-full transition-transform active:scale-90 ${
                loved ? 'bg-rose-500 text-white' : 'bg-white/90 text-rose-500 hover:bg-white'
              }`}
              title={loved ? 'Loved!' : 'Send love'}
              id={`love-btn-${index}`}
            >
              <Heart className={`w-4 h-4 ${loved ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onZoom(photo);
              }}
              className="p-2.5 sm:p-2 rounded-full bg-white/90 text-stone-700 hover:bg-white transition-transform active:scale-90"
              title="Expand photo"
              id={`zoom-btn-${index}`}
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {isEditMode && onEditPhoto && (
              <button
                onClick={() => onEditPhoto(photo)}
                className="p-2 rounded-full bg-rose-600 text-white hover:bg-rose-700 transition-transform active:scale-90"
                title="Edit this photo"
                id={`edit-photo-btn-${index}`}
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Memory badge */}
        <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-stone-200/50 text-[10px] font-sans-body font-bold text-stone-700 tracking-wider uppercase">
          0{index + 1}
        </div>
      </div>

      {/* Caption Section */}
      <div className="mt-4 text-center px-1">
        <h3 className="font-serif-display font-semibold text-stone-800 text-lg sm:text-xl tracking-tight group-hover:text-rose-700 transition-colors">
          {photo.title}
        </h3>
        <p className="font-script text-stone-600 text-base sm:text-lg mt-1 line-clamp-2">
          "{photo.caption}"
        </p>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { defaultLoveDetails, presetNotes } from './data/defaults';
import { LoveDetails, MemoryPhoto } from './types';
import { PhotoCard } from './components/PhotoCard';
import { SweetMessage } from './components/SweetMessage';
import { LightboxModal } from './components/LightboxModal';
import { MusicPlayer } from './components/MusicPlayer';
import { FloatingHearts } from './components/FloatingHearts';
import { CustomizerModal } from './components/CustomizerModal';
import {
  Heart,
  Sparkles,
  Sliders,
  Share2,
  Check,
  Eye,
  Mail,
  HeartHandshake,
} from 'lucide-react';

export default function App() {
  const [loveDetails, setLoveDetails] = useState<LoveDetails>(() => {
    const saved = localStorage.getItem('girlfriends_day_details_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultLoveDetails;
      }
    }
    return defaultLoveDetails;
  });

  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const [isFloatingHearts, setIsFloatingHearts] = useState(true);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(false);
  const [heartCount, setHeartCount] = useState(1);
  const [heartBurst, setHeartBurst] = useState(false);

  // Save to localStorage when details change
  useEffect(() => {
    localStorage.setItem('girlfriends_day_details_v3', JSON.stringify(loveDetails));
  }, [loveDetails]);

  const handleUpdateMessage = (newMessage: string) => {
    setLoveDetails((prev) => ({ ...prev, sweetMessage: newMessage }));
  };

  const handleSaveCustomization = (updated: LoveDetails) => {
    setLoveDetails(updated);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleAddHeart = () => {
    setHeartCount((prev) => prev + 1);
    setHeartBurst(true);
    setTimeout(() => setHeartBurst(false), 600);
  };

  return (
    <div className="relative min-h-screen bg-frosted-radial text-stone-800 font-sans-body pb-16 overflow-x-hidden selection:bg-rose-200 selection:text-rose-900">
      {/* Background Floating Hearts */}
      <FloatingHearts enabled={isFloatingHearts} />

      {/* Top Floating Header Controls */}
      <header className="sticky top-0 z-40 bg-white/40 backdrop-blur-xl border-b border-white/60 shadow-xs px-4 py-3">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Logo / Badge */}
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-600/90 text-white shadow-sm ring-2 ring-white/60">
              <Heart className="w-4 h-4 fill-current" />
            </span>
            <div className="flex flex-col">
              <span className="font-serif-display font-bold text-rose-950 text-sm sm:text-base leading-tight">
                Girlfriends Day
              </span>
              <span className="text-[10px] text-rose-700 font-medium tracking-wide uppercase">
                {loveDetails.dateBadge}
              </span>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 flex-wrap">
            <MusicPlayer />

            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/50 text-stone-700 border border-white/80 hover:bg-white/80 transition-colors"
              title="Share or copy page link"
              id="share-page-btn"
            >
              {copiedLink ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        {/* Surprise Letter Envelope Reveal Banner */}
        {!hasOpenedEnvelope && (
          <div className="mb-10 bg-white/30 backdrop-blur-2xl text-rose-950 p-6 sm:p-8 rounded-3xl shadow-xl text-center relative overflow-hidden border border-white/70">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-rose-300/30 rounded-full blur-xl pointer-events-none" />
            <Mail className="w-10 h-10 mx-auto mb-3 text-rose-600 animate-bounce" />
            <h2 className="font-serif-display font-bold text-2xl sm:text-3xl text-rose-950 mb-2">
              A Special Surprise for Princess Jima 💕
            </h2>
            <p className="font-script text-lg sm:text-xl text-rose-800/90 max-w-lg mx-auto mb-5">
              "To the person who holds my heart—here are 3 pictures of you and a love letter written just for you. ❤️✨"
            </p>
            <button
              onClick={() => setHasOpenedEnvelope(true)}
              className="px-6 py-2.5 rounded-full bg-rose-600 text-white font-serif-display font-bold text-sm sm:text-base shadow-lg hover:bg-rose-700 transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2 border border-white/40"
              id="open-envelope-btn"
            >
              <Heart className="w-4 h-4 fill-current text-white" /> Open Memories & Message
            </button>
          </div>
        )}

        {/* Hero Banner Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-md border border-white/70 text-rose-700 text-xs font-semibold uppercase tracking-widest mb-5 shadow-xs">
            <HeartHandshake className="w-3.5 h-3.5 text-rose-600" /> Celebrating National Girlfriends Day
          </div>

          <h1 className="font-serif-display font-bold text-3xl sm:text-5xl md:text-6xl text-rose-950 tracking-tight leading-tight">
            Happy Girlfriends Day, <br />
            <span className="font-script text-rose-600 font-normal text-4xl sm:text-6xl md:text-7xl block mt-1">
              {loveDetails.herName} 💕
            </span>
          </h1>

          <p className="mt-4 font-sans-body text-stone-700 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Three captured moments of you, and a sweet message straight from my heart to yours.
          </p>
        </div>

        {/* SECTION 1: THE 3 PICTURES GALLERY */}
        <section className="mb-16 sm:mb-24" id="three-pictures-section">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-rose-200/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <h2 className="font-serif-display font-bold text-2xl text-stone-800">
                My 3 Favorite Pictures
              </h2>
            </div>
            <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              3 Photo Memories
            </span>
          </div>

          {/* The 3 Photo Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 lg:gap-8 items-stretch pt-2">
            {loveDetails.photos.map((photo, index) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={index}
                onZoom={(p) => setSelectedPhoto(p)}
                onEditPhoto={() => setIsCustomizerOpen(true)}
                isEditMode={isEditMode}
              />
            ))}
          </div>

          <p className="text-center text-xs text-stone-500 mt-6 font-sans-body italic">
            💡 Tap any photo to expand it into full high-definition view.
          </p>
        </section>

        {/* SECTION 2: THE SWEET MESSAGE */}
        <SweetMessage
          message={loveDetails.sweetMessage}
          herName={loveDetails.herName}
          hisName={loveDetails.hisName}
          onUpdateMessage={handleUpdateMessage}
          presetNotes={presetNotes}
          isEditMode={isEditMode}
        />

        {/* SECTION 3: INTERACTIVE HEART REACTION FLOATER */}
        <div className="text-center my-12 pt-8 border-t border-rose-200/50">
          <button
            onClick={handleAddHeart}
            className={`relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-rose-700 text-white font-serif-display font-semibold text-base shadow-xl hover:shadow-2xl transition-all active:scale-95 ${
              heartBurst ? 'animate-bounce' : ''
            }`}
            id="send-love-heart-btn"
          >
            <Heart className="w-5 h-5 fill-current text-amber-200" />
            <span>Send Love to {loveDetails.herName}</span>
            <span className="ml-1 bg-white/20 px-2 py-0.5 rounded-full text-xs font-sans-body">
              {heartCount} 💕
            </span>
          </button>
          <p className="text-xs text-stone-500 mt-2 font-sans-body">
            Tap to send extra love hearts across the screen!
          </p>
        </div>
      </main>

      {/* Lightbox Modal */}
      <LightboxModal
        photo={selectedPhoto}
        allPhotos={loveDetails.photos}
        onClose={() => setSelectedPhoto(null)}
        onNavigate={(p) => setSelectedPhoto(p)}
      />

      {/* Customizer Modal */}
      <CustomizerModal
        loveDetails={loveDetails}
        onSave={handleSaveCustomization}
        onClose={() => setIsCustomizerOpen(false)}
        isOpen={isCustomizerOpen}
      />

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-stone-500 border-t border-rose-100 pt-8 px-4 font-sans-body">
        <div className="flex items-center justify-center gap-1.5 mb-1 text-rose-600 font-serif-display text-sm">
          <span>Happy Girlfriends Day</span>
          <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
        </div>
        <p className="text-stone-400">
          Created with love by {loveDetails.hisName} for {loveDetails.herName}
        </p>
      </footer>
    </div>
  );
}

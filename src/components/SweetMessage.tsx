import React, { useState, useEffect } from 'react';
import { Heart, Volume2, VolumeX, Sparkles, Copy, Check, Feather, RotateCcw } from 'lucide-react';
import { PresetNote } from '../types';

interface SweetMessageProps {
  message: string;
  herName: string;
  hisName: string;
  onUpdateMessage: (newMessage: string) => void;
  presetNotes: PresetNote[];
  isEditMode: boolean;
}

export const SweetMessage: React.FC<SweetMessageProps> = ({
  message,
  herName,
  hisName,
  onUpdateMessage,
  presetNotes,
  isEditMode,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    // Reset audio when message changes
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  }, [message]);

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        `Dear ${herName}. ${message}. Love, ${hisName}`
      );
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`To ${herName}:\n\n${message}\n\n- ${hisName}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyPreset = (preset: PresetNote) => {
    onUpdateMessage(preset.message);
    setActiveTab(preset.id);
  };

  return (
    <section className="relative max-w-4xl mx-auto my-12 px-4" id="sweet-message-section">
      {/* Decorative Wax Seal / Floating Emblem */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 text-white flex items-center justify-center shadow-lg border-2 border-amber-100 ring-4 ring-rose-200/50 animate-pulse-subtle">
          <Heart className="w-6 h-6 fill-current text-amber-100" />
        </div>
      </div>

      {/* Main Love Letter Paper Container with Frosted Glass */}
      <div className="relative bg-white/30 backdrop-blur-2xl rounded-[32px] sm:rounded-[48px] p-6 sm:p-10 md:p-14 shadow-2xl border border-white/60 overflow-hidden">
        {/* Subtle Watermark BG */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Paper Corner Flourishes */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-rose-300/60 rounded-tl-lg" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-rose-300/60 rounded-tr-lg" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-rose-300/60 rounded-bl-lg" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-rose-300/60 rounded-br-lg" />

        {/* Top Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 border-b border-rose-100 pb-4">
          <div className="flex items-center gap-2">
            <Feather className="w-5 h-5 text-rose-500" />
            <span className="font-serif-display font-medium text-stone-700 text-sm tracking-wide uppercase">
              A letter from your Baby Boy
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans-body font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
              title="Copy letter to clipboard"
              id="copy-letter-btn"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Presets Selection in Edit Mode */}
        {isEditMode && (
          <div className="mb-6 bg-rose-50/60 p-4 rounded-xl border border-rose-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold font-sans-body text-rose-900 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" /> Choose a Love Letter Style:
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {presetNotes.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset)}
                  className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                    activeTab === preset.id
                      ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                      : 'bg-white border-rose-200/80 text-stone-800 hover:border-rose-400 hover:bg-rose-50/50'
                  }`}
                >
                  <p className="font-semibold">{preset.label}</p>
                  <p className={`text-[10px] mt-0.5 ${activeTab === preset.id ? 'text-rose-100' : 'text-stone-500'}`}>
                    {preset.tone}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Letter Heading */}
        <div className="mb-6">
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-rose-900 font-bold leading-tight">
            Dearest {herName},
          </h2>
        </div>

        {/* Letter Body */}
        {isEditMode ? (
          <div className="mb-6">
            <label className="block text-xs font-semibold text-rose-800 uppercase mb-2">
              Edit Sweet Message Content
            </label>
            <textarea
              value={message}
              onChange={(e) => onUpdateMessage(e.target.value)}
              rows={8}
              className="w-full p-4 rounded-2xl border border-white/60 focus:ring-2 focus:ring-rose-500 focus:outline-none font-serif-display text-base text-stone-800 leading-relaxed bg-white/70 backdrop-blur-md shadow-inner"
              placeholder="Write your sweet love letter here..."
            />
          </div>
        ) : (
          <div className="prose prose-stone max-w-none mb-8">
            {message.split('\n\n').map((paragraph, index) => (
              <p
                key={index}
                className="font-serif-display text-rose-900/90 text-lg sm:text-xl md:text-2xl leading-relaxed tracking-normal font-normal text-justify sm:text-left mb-6 first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-serif-display first-letter:font-bold first-letter:text-rose-600 first-letter:mr-1"
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* Sign-off / Signature */}
        <div className="mt-8 pt-6 border-t border-rose-200/50 flex flex-col items-end">
          <div className="w-12 h-[1px] bg-rose-300 mb-3" />
          <span className="font-script text-2xl sm:text-3xl text-rose-800/80">
            With all my love,
          </span>
          <span className="font-serif-display font-bold text-xl sm:text-2xl text-rose-900 mt-1 uppercase tracking-widest text-xs sm:text-sm">
            {hisName}
          </span>
          <div className="flex items-center gap-1 mt-2 text-rose-400">
            <Heart className="w-4 h-4 fill-current text-rose-500" />
            <Heart className="w-3 h-3 fill-current text-rose-400" />
            <Heart className="w-2.5 h-2.5 fill-current text-rose-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

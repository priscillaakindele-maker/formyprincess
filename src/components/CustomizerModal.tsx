import React, { useState } from 'react';
import { LoveDetails, MemoryPhoto } from '../types';
import { X, Save, Upload, RefreshCw, Check, Sparkles, Heart } from 'lucide-react';

interface CustomizerModalProps {
  loveDetails: LoveDetails;
  onSave: (updated: LoveDetails) => void;
  onClose: () => void;
  isOpen: boolean;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  loveDetails,
  onSave,
  onClose,
  isOpen,
}) => {
  const [formData, setFormData] = useState<LoveDetails>({ ...loveDetails });
  const [activeTab, setActiveTab] = useState<'general' | 'photos' | 'message'>('general');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleTextChange = (field: keyof LoveDetails, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (index: number, field: keyof MemoryPhoto, value: string) => {
    setFormData((prev) => {
      const updatedPhotos = [...prev.photos];
      updatedPhotos[index] = { ...updatedPhotos[index], [field]: value };
      return { ...prev, photos: updatedPhotos };
    });
  };

  const handleFileUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          handlePhotoChange(index, 'imageUrl', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAll = () => {
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/80 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 to-rose-700 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-200" />
            <div>
              <h3 className="font-serif-display font-bold text-lg">Customize Your Girlfriends Day Page</h3>
              <p className="text-xs text-rose-100">Personalize names, 3 pictures, captions, and love letter</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            id="customizer-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-rose-100 bg-rose-50/50">
          <button
            onClick={() => setActiveTab('general')}
            className={`flex-1 py-3 text-xs font-sans-body font-bold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'general'
                ? 'border-rose-600 text-rose-700 bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            1. Names & Info
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex-1 py-3 text-xs font-sans-body font-bold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'photos'
                ? 'border-rose-600 text-rose-700 bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            2. The 3 Pictures
          </button>
          <button
            onClick={() => setActiveTab('message')}
            className={`flex-1 py-3 text-xs font-sans-body font-bold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'message'
                ? 'border-rose-600 text-rose-700 bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            3. Sweet Letter
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Her Name / Nickname
                </label>
                <input
                  type="text"
                  value={formData.herName}
                  onChange={(e) => handleTextChange('herName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-rose-500 focus:outline-none text-stone-800 font-sans-body"
                  placeholder="e.g. My Beautiful Sophia"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  His Name / Sign-off
                </label>
                <input
                  type="text"
                  value={formData.hisName}
                  onChange={(e) => handleTextChange('hisName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-rose-500 focus:outline-none text-stone-800 font-sans-body"
                  placeholder="e.g. Forever Yours, Alex"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Top Header Badge
                </label>
                <input
                  type="text"
                  value={formData.dateBadge}
                  onChange={(e) => handleTextChange('dateBadge', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-rose-500 focus:outline-none text-stone-800 font-sans-body"
                  placeholder="e.g. Happy National Girlfriends Day • August 1st"
                />
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="space-y-6">
              <p className="text-xs text-stone-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
                📸 Select or upload custom photo memories for each of the 3 picture cards.
              </p>

              {formData.photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
                      Picture #{index + 1}
                    </span>
                    <label className="cursor-pointer flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-semibold transition-colors">
                      <Upload className="w-3.5 h-3.5" /> Upload File
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(index, e)}
                      />
                    </label>
                  </div>

                  <div className="flex gap-4 items-center">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 object-cover rounded-lg border border-stone-300 flex-shrink-0"
                    />

                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={photo.title}
                        onChange={(e) => handlePhotoChange(index, 'title', e.target.value)}
                        placeholder="Memory Title"
                        className="w-full px-3 py-1.5 rounded-md border border-stone-300 text-xs text-stone-800"
                      />
                      <input
                        type="text"
                        value={photo.caption}
                        onChange={(e) => handlePhotoChange(index, 'caption', e.target.value)}
                        placeholder="Short sweet caption"
                        className="w-full px-3 py-1.5 rounded-md border border-stone-300 text-xs text-stone-800"
                      />
                      <input
                        type="text"
                        value={photo.date}
                        onChange={(e) => handlePhotoChange(index, 'date', e.target.value)}
                        placeholder="Date or Tag (e.g. Summer Sunset)"
                        className="w-full px-3 py-1.5 rounded-md border border-stone-300 text-xs text-stone-800"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'message' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Sweet Message Text
                </label>
                <textarea
                  value={formData.sweetMessage}
                  onChange={(e) => handleTextChange('sweetMessage', e.target.value)}
                  rows={9}
                  className="w-full p-3.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-rose-500 focus:outline-none text-sm text-stone-800 font-serif-display leading-relaxed"
                  placeholder="Write your love message here..."
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <button
            onClick={() => {
              setFormData({ ...loveDetails });
            }}
            className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 font-medium"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAll}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-bold text-white transition-all ${
                savedSuccess
                  ? 'bg-emerald-600 shadow-lg'
                  : 'bg-rose-600 hover:bg-rose-700 shadow-md active:scale-95'
              }`}
              id="save-customization-btn"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" /> Saved!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Page
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

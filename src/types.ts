export interface MemoryPhoto {
  id: string;
  title: string;
  caption: string;
  date: string;
  imageUrl: string;
  rotation: string; // e.g. "-rotate-2", "rotate-1", "-rotate-1"
}

export interface LoveDetails {
  herName: string;
  hisName: string;
  dateBadge: string;
  sweetMessage: string;
  photos: MemoryPhoto[];
}

export interface PresetNote {
  id: string;
  label: string;
  tone: string;
  message: string;
}

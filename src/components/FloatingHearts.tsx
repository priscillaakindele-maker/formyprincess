import React, { useMemo } from 'react';

interface FloatingHeartsProps {
  enabled: boolean;
}

export const FloatingHearts: React.FC<FloatingHeartsProps> = ({ enabled }) => {
  const particles = useMemo(() => {
    const items = ['💖', '🌸', '💕', '✨', '💗', '🌹', '💌', '❤️'];
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      char: items[i % items.length],
      left: Math.random() * 96 + 2, // 2% to 98%
      delay: Math.random() * 8, // 0 to 8s delay
      duration: 10 + Math.random() * 12, // 10s to 22s
      size: 14 + Math.random() * 18, // 14px to 32px
    }));
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-[-50px] animate-float-heart select-none opacity-70"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}px`,
          }}
        >
          {p.char}
        </div>
      ))}
    </div>
  );
};

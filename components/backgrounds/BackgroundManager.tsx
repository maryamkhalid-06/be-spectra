"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import GenesBackground from './GenesBackground';
import NeuralNetworkBackground from './NeuralNetworkBackground';
import LaserBeamsBackground from './LaserBeamsBackground';
import MedicineCapsulesBackground from './MedicineCapsulesBackground';
import SettingsPanel from './SettingsPanel';

type Theme = 'genes' | 'neural' | 'lasers' | 'medicine';
type ColorTheme = 'ocean' | 'forest' | 'sunset' | 'cyber' | 'plasma';

interface BackgroundContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  intensity: number;
  setIntensity: (intensity: number) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};

export default function BackgroundManager({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('genes');
  const [speed, setSpeed] = useState(1);
  const [intensity, setIntensity] = useState(1);
  const [colors, setColors] = useState({
    primary: '#8b5cf6',
    secondary: '#ec4899',
    accent: '#a78bfa'
  });

  // Sync with global theme CSS variables and intensity
  React.useEffect(() => {
    const updateFromTheme = () => {
      const root = document.documentElement;
      const style = getComputedStyle(root);

      const primaryHex = style.getPropertyValue('--primary-hex').trim() || '#8b5cf6';
      const secondaryHex = style.getPropertyValue('--secondary-hex').trim() || '#ec4899';
      const accentHex = style.getPropertyValue('--accent-hex').trim() || '#a78bfa';

      setColors({
        primary: primaryHex,
        secondary: secondaryHex,
        accent: accentHex
      });

      const savedIntensity = localStorage.getItem('themeIntensity');
      if (savedIntensity) {
        setIntensity(parseFloat(savedIntensity));
      }
    };

    // Observe changes to the style attribute on the html element
    const observer = new MutationObserver(updateFromTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    updateFromTheme();
    return () => observer.disconnect();
  }, []);

  return (
    <BackgroundContext.Provider value={{
      theme, setTheme,
      speed, setSpeed,
      intensity, setIntensity,
      colors
    }}>
      <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
        {theme === 'genes' && <GenesBackground colors={colors} speed={speed} intensity={intensity} />}
        {theme === 'neural' && <NeuralNetworkBackground colors={colors} speed={speed} intensity={intensity} />}
        {theme === 'lasers' && <LaserBeamsBackground colors={colors.primary} speed={speed} intensity={intensity} />}
        {theme === 'medicine' && <MedicineCapsulesBackground colors={colors} speed={speed} intensity={intensity} />}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 pointer-events-none" />
      </div>
      <div className="relative z-10 w-full h-full">
        {children}
      </div>

      <SettingsPanel />

      {/* Dynamic Theme Switcher for Demo/Futuristic feel */}
      <div className="fixed bottom-6 right-6 z-50 flex gap-2 p-2 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
        {(['genes', 'neural', 'lasers', 'medicine'] as Theme[]).map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all duration-500 ${theme === t
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
              : 'text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent'
              }`}
          >
            {t}
          </button>
        ))}
      </div>
    </BackgroundContext.Provider>
  );
}

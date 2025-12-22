"use client";

import React, { useState } from 'react';
import { useBackground } from './BackgroundManager';
import { Settings2, Zap, Wind, ChevronDown, ChevronUp, Check } from 'lucide-react';

export default function SettingsPanel() {
    const {
        theme, setTheme,
        speed, setSpeed,
        intensity, setIntensity
    } = useBackground();

    // Panel open/close state
    const [isOpen, setIsOpen] = useState(false);

    // Draft settings (not applied until "Apply" is clicked)
    const [draftSpeed, setDraftSpeed] = useState(speed);
    const [draftIntensity, setDraftIntensity] = useState(intensity);


    // Apply changes and close panel
    const handleApply = () => {
        setSpeed(draftSpeed);
        setIntensity(draftIntensity);
        setIsOpen(false); // Auto-close after applying
    };

    return (
        <div className="fixed top-24 right-6 z-50 w-72">
            {/* Toggle button when closed */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full p-4 bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-300 hover:scale-105"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                                <Settings2 className="w-4 h-4 text-white/70" />
                            </div>
                            <span className="text-sm font-bold text-white tracking-widest uppercase">System Config</span>
                        </div>
                        <ChevronDown className="w-5 h-5 text-white/40" />
                    </div>
                </button>
            )}

            {/* Expanded panel */}
            {isOpen && (
                <div className="relative p-6 bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl transition-all duration-500">
                    {/* Header with close button */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                                <Settings2 className="w-4 h-4 text-white/70" />
                            </div>
                            <h3 className="text-sm font-bold text-white tracking-widest uppercase">System Config</h3>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <ChevronUp className="w-5 h-5 text-white/40 hover:text-white/70" />
                        </button>
                    </div>

                    <div className="space-y-8">
                        {/* Simulation Speed */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-tighter flex items-center gap-2">
                                    <Wind className="w-3 h-3" /> Temporal Flow
                                </label>
                                <span className="text-[10px] font-mono text-white/60">{draftSpeed.toFixed(1)}x</span>
                            </div>
                            <input
                                type="range" min="0.1" max="3" step="0.1"
                                value={draftSpeed}
                                onChange={(e) => setDraftSpeed(parseFloat(e.target.value))}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white hover:accent-blue-400 transition-colors"
                            />
                        </div>

                        {/* Glow Intensity */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-tighter flex items-center gap-2">
                                    <Zap className="w-3 h-3" /> Photon Density
                                </label>
                                <span className="text-[10px] font-mono text-white/60">{draftIntensity.toFixed(1)}x</span>
                            </div>
                            <input
                                type="range" min="0.5" max="5" step="0.1"
                                value={draftIntensity}
                                onChange={(e) => setDraftIntensity(parseFloat(e.target.value))}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white hover:accent-pink-400 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Apply Button */}
                    <button
                        onClick={handleApply}
                        className="mt-8 w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-bold text-white text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <Check className="w-4 h-4" />
                        Apply Changes
                    </button>

                    <div className="mt-6 pt-4 border-t border-white/5">
                        <p className="text-[8px] text-center text-white/20 uppercase font-bold tracking-[0.2em]">Neural Engine v1.0.4</p>
                    </div>
                </div>
            )}
        </div>
    );
}

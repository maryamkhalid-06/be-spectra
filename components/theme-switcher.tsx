"use client"

import { useState, useEffect, useRef } from 'react'
import { Palette, Sun, Moon, X, Droplet, Sparkles, Sliders } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ThemeColors {
    name: string
    primary: string
    secondary: string
    accent: string
    category: 'warm' | 'cool' | 'neon' | 'pastel' | 'custom'
    icon: string
    description: string
}

type ThemeCategory = 'all' | 'warm' | 'cool' | 'neon' | 'pastel' | 'custom'

export default function ThemeSwitcher() {
    const [isOpen, setIsOpen] = useState(false)
    const [isDark, setIsDark] = useState(true)
    const [intensity, setIntensity] = useState(1.0)
    const [selectedCategory, setSelectedCategory] = useState<ThemeCategory>('all')
    const [showColorPicker, setShowColorPicker] = useState(false)
    const panelRef = useRef<HTMLDivElement>(null)

    // Custom color picker state
    const [customPrimary, setCustomPrimary] = useState('#8b5cf6')
    const [customSecondary, setCustomSecondary] = useState('#ec4899')
    const [customAccent, setCustomAccent] = useState('#a78bfa')

    // 24 comprehensive themes organized by category
    const themes: ThemeColors[] = [
        // WARM CATEGORY (6 themes)
        {
            name: 'Sunset Blaze',
            primary: '#f59e0b',
            secondary: '#ec4899',
            accent: '#f97316',
            category: 'warm',
            icon: '🌅',
            description: 'Warm amber and pink'
        },
        {
            name: 'Lava Core',
            primary: '#ef4444',
            secondary: '#f97316',
            accent: '#dc2626',
            category: 'warm',
            icon: '🔥',
            description: 'Fiery red and orange'
        },
        {
            name: 'Royal Gold',
            primary: '#f59e0b',
            secondary: '#eab308',
            accent: '#d97706',
            category: 'warm',
            icon: '👑',
            description: 'Luxurious gold tones'
        },
        {
            name: 'Autumn Fire',
            primary: '#ea580c',
            secondary: '#f97316',
            accent: '#fb923c',
            category: 'warm',
            icon: '🍂',
            description: 'Warm autumn orange'
        },
        {
            name: 'Rose Garden',
            primary: '#e11d48',
            secondary: '#f43f5e',
            accent: '#fb7185',
            category: 'warm',
            icon: '🌹',
            description: 'Deep rose red'
        },
        {
            name: 'Copper Glow',
            primary: '#c2410c',
            secondary: '#ea580c',
            accent: '#f97316',
            category: 'warm',
            icon: '💰',
            description: 'Metallic copper'
        },

        // COOL CATEGORY (6 themes)
        {
            name: 'Ocean Depths',
            primary: '#3b82f6',
            secondary: '#06b6d4',
            accent: '#0ea5e9',
            category: 'cool',
            icon: '🌊',
            description: 'Deep blue oceanic'
        },
        {
            name: 'Forest Night',
            primary: '#10b981',
            secondary: '#34d399',
            accent: '#059669',
            category: 'cool',
            icon: '🌲',
            description: 'Emerald forest greens'
        },
        {
            name: 'Arctic Aurora',
            primary: '#06b6d4',
            secondary: '#8b5cf6',
            accent: '#14b8a6',
            category: 'cool',
            icon: '❄️',
            description: 'Cyan and violet aurora'
        },
        {
            name: 'Midnight Blue',
            primary: '#0ea5e9',
            secondary: '#06b6d4',
            accent: '#0284c7',
            category: 'cool',
            icon: '🌙',
            description: 'Deep midnight sky'
        },
        {
            name: 'Deep Space',
            primary: '#6366f1',
            secondary: '#8b5cf6',
            accent: '#4f46e5',
            category: 'cool',
            icon: '🌌',
            description: 'Cosmic indigo depths'
        },
        {
            name: 'Teal Wave',
            primary: '#14b8a6',
            secondary: '#06b6d4',
            accent: '#0d9488',
            category: 'cool',
            icon: '🌀',
            description: 'Teal ocean waves'
        },

        // NEON CATEGORY (6 themes)
        {
            name: 'Cyber Pulse',
            primary: '#8b5cf6',
            secondary: '#ec4899',
            accent: '#a78bfa',
            category: 'neon',
            icon: '⚡',
            description: 'Electric purple energy'
        },
        {
            name: 'Plasma Storm',
            primary: '#ec4899',
            secondary: '#8b5cf6',
            accent: '#f472b6',
            category: 'neon',
            icon: '💫',
            description: 'Hot pink plasma'
        },
        {
            name: 'Matrix Code',
            primary: '#22c55e',
            secondary: '#10b981',
            accent: '#16a34a',
            category: 'neon',
            icon: '💻',
            description: 'Digital green matrix'
        },
        {
            name: 'Neon Tokyo',
            primary: '#f472b6',
            secondary: '#06b6d4',
            accent: '#a78bfa',
            category: 'neon',
            icon: '🏙️',
            description: 'Vibrant city lights'
        },
        {
            name: 'Electric Lime',
            primary: '#84cc16',
            secondary: '#22c55e',
            accent: '#65a30d',
            category: 'neon',
            icon: '⚡',
            description: 'Bright lime energy'
        },
        {
            name: 'UV Glow',
            primary: '#a855f7',
            secondary: '#ec4899',
            accent: '#c026d3',
            category: 'neon',
            icon: '🌟',
            description: 'Ultraviolet glow'
        },

        // PASTEL CATEGORY (6 themes)
        {
            name: 'Cherry Blossom',
            primary: '#f472b6',
            secondary: '#ec4899',
            accent: '#db2777',
            category: 'pastel',
            icon: '🌸',
            description: 'Soft pink blossoms'
        },
        {
            name: 'Lavender Dream',
            primary: '#c084fc',
            secondary: '#a78bfa',
            accent: '#9333ea',
            category: 'pastel',
            icon: '💜',
            description: 'Soft purple lavender'
        },
        {
            name: 'Mint Breeze',
            primary: '#6ee7b7',
            secondary: '#34d399',
            accent: '#10b981',
            category: 'pastel',
            icon: '🍃',
            description: 'Fresh mint green'
        },
        {
            name: 'Peach Sunset',
            primary: '#fdba74',
            secondary: '#fb923c',
            accent: '#f97316',
            category: 'pastel',
            icon: '🍑',
            description: 'Soft peach tones'
        },
        {
            name: 'Sky Blue',
            primary: '#7dd3fc',
            secondary: '#38bdf8',
            accent: '#0ea5e9',
            category: 'pastel',
            icon: '☁️',
            description: 'Light sky blue'
        },
        {
            name: 'Cotton Candy',
            primary: '#f9a8d4',
            secondary: '#c084fc',
            accent: '#f472b6',
            category: 'pastel',
            icon: '🍭',
            description: 'Sweet pink and purple'
        },
    ]

    const [currentTheme, setCurrentTheme] = useState(themes[6]) // Cyber Pulse by default
    const [customThemes, setCustomThemes] = useState<ThemeColors[]>([])

    // Category configuration
    const categories = [
        { id: 'all' as ThemeCategory, label: 'All', icon: '🎨' },
        { id: 'warm' as ThemeCategory, label: 'Warm', icon: '🔥' },
        { id: 'cool' as ThemeCategory, label: 'Cool', icon: '❄️' },
        { id: 'neon' as ThemeCategory, label: 'Neon', icon: '⚡' },
        { id: 'pastel' as ThemeCategory, label: 'Pastel', icon: '🌸' },
        { id: 'custom' as ThemeCategory, label: 'Custom', icon: '✨' },
    ]

    const filteredThemes = selectedCategory === 'all'
        ? themes
        : selectedCategory === 'custom'
            ? customThemes
            : themes.filter(t => t.category === selectedCategory)

    // Close panel when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    // Close panel with Escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false)
                setShowColorPicker(false)
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen])

    const applyTheme = (theme: ThemeColors) => {
        const root = document.documentElement

        // Convert colors to OKLCH format with intensity adjustment
        const primaryOklch = hexToOklch(theme.primary, intensity)
        const secondaryOklch = hexToOklch(theme.secondary, intensity)
        const accentOklch = hexToOklch(theme.accent, intensity)

        // Update main color variables
        root.style.setProperty('--primary', primaryOklch)
        root.style.setProperty('--secondary', secondaryOklch)
        root.style.setProperty('--accent', accentOklch)
        root.style.setProperty('--primary-hex', theme.primary)
        root.style.setProperty('--secondary-hex', theme.secondary)
        root.style.setProperty('--accent-hex', theme.accent)
        root.style.setProperty('--ring', primaryOklch)

        // Update chart colors
        root.style.setProperty('--chart-1', primaryOklch)
        root.style.setProperty('--chart-2', secondaryOklch)
        root.style.setProperty('--chart-3', accentOklch)

        // Update sidebar colors
        root.style.setProperty('--sidebar-primary', primaryOklch)
        root.style.setProperty('--sidebar-accent', secondaryOklch)
        root.style.setProperty('--sidebar-ring', primaryOklch)

        // Store theme preference
        localStorage.setItem('selectedTheme', theme.name)
        localStorage.setItem('themeIntensity', intensity.toString())
        setCurrentTheme(theme)
    }

    const createCustomTheme = () => {
        const customTheme: ThemeColors = {
            name: `Custom ${customThemes.length + 1}`,
            primary: customPrimary,
            secondary: customSecondary,
            accent: customAccent,
            category: 'custom',
            icon: '✨',
            description: 'Your custom theme'
        }

        const updatedCustomThemes = [...customThemes, customTheme]
        setCustomThemes(updatedCustomThemes)
        localStorage.setItem('customThemes', JSON.stringify(updatedCustomThemes))

        applyTheme(customTheme)
        setShowColorPicker(false)
        setSelectedCategory('custom')
    }

    const toggleDarkMode = () => {
        const newMode = !isDark
        setIsDark(newMode)
        document.documentElement.classList.toggle('dark', newMode)
        localStorage.setItem('darkMode', newMode ? 'dark' : 'light')
    }

    const hexToOklch = (hex: string, intensityMultiplier: number = 1.0): string => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        if (!result) return 'oklch(0.72 0.25 270)'

        const r = parseInt(result[1], 16) / 255
        const g = parseInt(result[2], 16) / 255
        const b = parseInt(result[3], 16) / 255

        const linearR = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)
        const linearG = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)
        const linearB = b <= 0.04045 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)

        const luminance = 0.2126 * linearR + 0.7152 * linearG + 0.0722 * linearB

        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        const delta = max - min

        let hue = 0
        if (delta !== 0) {
            if (max === r) {
                hue = 60 * (((g - b) / delta) % 6)
            } else if (max === g) {
                hue = 60 * ((b - r) / delta + 2)
            } else {
                hue = 60 * ((r - g) / delta + 4)
            }
        }
        if (hue < 0) hue += 360

        const chroma = delta * 0.35 * intensityMultiplier
        const lightness = Math.sqrt(luminance)

        return `oklch(${lightness.toFixed(3)} ${chroma.toFixed(3)} ${hue.toFixed(1)})`
    }

    // Load saved preferences on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('selectedTheme')
        const savedDarkMode = localStorage.getItem('darkMode')
        const savedIntensity = localStorage.getItem('themeIntensity')
        const savedCustomThemes = localStorage.getItem('customThemes')

        if (savedIntensity) {
            setIntensity(parseFloat(savedIntensity))
        }

        if (savedCustomThemes) {
            try {
                setCustomThemes(JSON.parse(savedCustomThemes))
            } catch (e) {
                console.error('Failed to load custom themes')
            }
        }

        if (savedTheme) {
            const theme = [...themes, ...customThemes].find(t => t.name === savedTheme)
            if (theme) applyTheme(theme)
        }

        if (savedDarkMode) {
            const isDarkMode = savedDarkMode === 'dark'
            setIsDark(isDarkMode)
            document.documentElement.classList.toggle('dark', isDarkMode)
        }
    }, [])

    return (
        <div className="fixed bottom-6 right-6 z-50" ref={panelRef}>
            {/* Theme picker panel */}
            <div
                className={`absolute bottom-16 right-0 backdrop-blur-2xl bg-black/70 border border-white/10 rounded-2xl p-5 shadow-2xl w-[380px] max-h-[85vh] overflow-y-auto transition-all duration-300 ease-out ${isOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
            >
                <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div>
                            <span className="text-sm font-bold text-white">Ultimate Themes</span>
                            <p className="text-[10px] text-white/50 mt-0.5">24 themes + custom colors</p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-4 h-4 text-white/60 hover:text-white" />
                        </button>
                    </div>

                    {/* Dark/Light mode toggle */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-sm font-bold text-white">Mode</span>
                        <Button
                            size="sm"
                            onClick={toggleDarkMode}
                            className="bg-white/10 hover:bg-white/20 border-white/20"
                        >
                            {isDark ? (
                                <>
                                    <Moon className="w-4 h-4 mr-2" />
                                    <span className="text-xs">Dark</span>
                                </>
                            ) : (
                                <>
                                    <Sun className="w-4 h-4 mr-2" />
                                    <span className="text-xs">Light</span>
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Intensity Control */}
                    <div className="pb-3 border-b border-white/10">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Sliders className="w-4 h-4 text-white" />
                                <span className="text-sm font-bold text-white">Intensity</span>
                            </div>
                            <span className="text-xs text-white/60">{Math.round(intensity * 100)}%</span>
                        </div>
                        <input
                            type="range"
                            min="0.5"
                            max="1.5"
                            step="0.1"
                            value={intensity}
                            onChange={(e) => {
                                const newIntensity = parseFloat(e.target.value)
                                setIntensity(newIntensity)
                                applyTheme(currentTheme)
                            }}
                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex gap-1 flex-wrap pb-3 border-b border-white/10">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedCategory === cat.id
                                    ? 'bg-white/20 text-white scale-105'
                                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                                    }`}
                            >
                                <span className="mr-1">{cat.icon}</span>
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Custom Color Picker */}
                    {showColorPicker && (
                        <div className="p-4 bg-white/10 rounded-xl space-y-3 border border-white/20">
                            <p className="text-xs font-bold text-white">Create Custom Theme</p>
                            <div className="space-y-2">
                                <div>
                                    <label className="text-[10px] text-white/60">Primary Color</label>
                                    <input
                                        type="color"
                                        value={customPrimary}
                                        onChange={(e) => setCustomPrimary(e.target.value)}
                                        className="w-full h-10 rounded cursor-pointer"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] text-white/60">Secondary Color</label>
                                    <input
                                        type="color"
                                        value={customSecondary}
                                        onChange={(e) => setCustomSecondary(e.target.value)}
                                        className="w-full h-10 rounded cursor-pointer"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] text-white/60">Accent Color</label>
                                    <input
                                        type="color"
                                        value={customAccent}
                                        onChange={(e) => setCustomAccent(e.target.value)}
                                        className="w-full h-10 rounded cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    onClick={createCustomTheme}
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                >
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    Create
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => setShowColorPicker(false)}
                                    className="bg-white/10 hover:bg-white/20"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Add Custom Theme Button */}
                    {!showColorPicker && (
                        <button
                            onClick={() => setShowColorPicker(true)}
                            className="w-full p-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-2 border-dashed border-white/20 rounded-xl hover:border-white/40 transition-all"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Droplet className="w-4 h-4 text-white" />
                                <span className="text-xs font-bold text-white">Create Custom Theme</span>
                            </div>
                        </button>
                    )}

                    {/* Theme Grid */}
                    <div>
                        <p className="text-xs font-bold text-white/60 uppercase tracking-wider mb-3">
                            {selectedCategory === 'all' ? 'All Themes' : selectedCategory === 'custom' ? 'Your Custom Themes' : `${selectedCategory} Themes`}
                            {' '}({filteredThemes.length})
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            {filteredThemes.map((theme) => (
                                <button
                                    key={theme.name}
                                    onClick={() => {
                                        applyTheme(theme)
                                        setIsOpen(false)
                                    }}
                                    className={`relative p-3 rounded-xl border-2 transition-all duration-300 ${currentTheme.name === theme.name
                                        ? 'border-white/50 bg-white/15 scale-105 shadow-lg'
                                        : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                                        }`}
                                    title={theme.description}
                                >
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">{theme.icon}</span>
                                            <p className="text-[10px] font-bold text-white text-left flex-1 leading-tight">{theme.name}</p>
                                        </div>
                                        <div className="flex gap-1">
                                            <div
                                                className="w-full h-2 rounded-full"
                                                style={{ backgroundColor: theme.primary }}
                                            />
                                            <div
                                                className="w-full h-2 rounded-full"
                                                style={{ backgroundColor: theme.secondary }}
                                            />
                                            <div
                                                className="w-full h-2 rounded-full"
                                                style={{ backgroundColor: theme.accent }}
                                            />
                                        </div>
                                    </div>
                                    {currentTheme.name === theme.name && (
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-black/50" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <p className="text-[10px] text-white/40 text-center pt-2 border-t border-white/5">
                        Themes apply instantly • Auto-saves
                    </p>
                </div>
            </div>

            {/* Toggle button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl border-2 border-white/20 backdrop-blur-xl transition-transform duration-200 ${isOpen ? 'scale-110 rotate-180' : 'scale-100 rotate-0'
                    }`}
            >
                <Palette className="w-6 h-6 text-white" />
            </Button>
        </div>
    )
}

export default {
    colors: {
        // Primary colors
        primaryBg: '#0f1419',
        secondaryBg: '#1a2a44',
        tertiaryBg: '#2d3748',
        surfaceBg: '#374151',

        // Accent colors
        accentPrimary: '#00ffff',
        accentSecondary: '#3b82f6',
        accentTertiary: '#8b5cf6',

        // Status colors
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',

        // Text colors
        textPrimary: '#ffffff',
        textSecondary: '#d1d5db',
        textMuted: '#9ca3af',
        textDisabled: '#6b7280',

        // Border colors
        borderPrimary: 'rgba(255, 255, 255, 0.1)',
        borderSecondary: 'rgba(255, 255, 255, 0.05)',
        borderAccent: '#00ffff',

        // Glassmorphism
        glassBg: 'rgba(255, 255, 255, 0.1)',
        glassBorder: 'rgba(255, 255, 255, 0.2)',
        glassShadow: 'rgba(0, 0, 0, 0.1)',
    },

    spacing: {
        xs: 4,
        sm: 8,
        xsm: 12,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    },

    borderRadius: {
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
        xxl: 24,
    },

    typography: {
        fontFamily: 'Inter',
        fontSize: {
            xs: 12,     // 0.75rem
            sm: 14,     // 0.875rem
            base: 16,   // 1rem
            lg: 18,     // 1.125rem
            xl: 20,     // 1.25rem
            xxl: 24,    // 1.5rem
            xxxl: 30,   // 1.875rem
        },
    },

    zIndex: {
        dropdown: 1000,
        modal: 1050,
        tooltip: 1100,
        notification: 1200,
    },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Dark UI Color
        'dark-bg': '#0E1117',
        
        // Neon Accent Colors
        'neon-blue': '#4DABF7',
        'neon-purple': '#9775FA',
        'neon-mint': '#69DB7C',
        
        // Primary Colors
        'primary': '#1E3A8A', // Deep blue (primary) - blue-800
        'primary-50': '#EFF6FF', // Very light blue - blue-50
        'primary-100': '#DBEAFE', // Light blue - blue-100
        'primary-500': '#3B82F6', // Medium blue - blue-500
        'primary-600': '#2563EB', // Darker blue - blue-600
        'primary-700': '#1D4ED8', // Dark blue - blue-700
        
        // Secondary Colors
        'secondary': '#64748B', // Sophisticated slate gray - slate-500
        'secondary-100': '#F1F5F9', // Light slate - slate-100
        'secondary-200': '#E2E8F0', // Light slate - slate-200
        'secondary-300': '#CBD5E1', // Medium light slate - slate-300
        'secondary-400': '#94A3B8', // Medium slate - slate-400
        'secondary-600': '#475569', // Dark slate - slate-600
        'secondary-700': '#334155', // Darker slate - slate-700
        'secondary-800': '#1E293B', // Very dark slate - slate-800
        
        // Accent Colors
        'accent': '#059669', // Success-oriented emerald - emerald-600
        'accent-50': '#ECFDF5', // Very light emerald - emerald-50
        'accent-100': '#D1FAE5', // Light emerald - emerald-100
        'accent-500': '#10B981', // Medium emerald - emerald-500
        
        // Background Colors
        'background': '#FAFBFC', // Warm off-white - custom
        'surface': '#FFFFFF', // Pure white - white
        
        // Text Colors
        'text-primary': '#1F2937', // Rich charcoal - gray-800
        'text-secondary': '#6B7280', // Balanced gray - gray-500
        'text-tertiary': '#9CA3AF', // Light gray - gray-400
        
        // Status Colors
        'success': '#10B981', // Vibrant green - emerald-500
        'success-50': '#ECFDF5', // Light success background - emerald-50
        'success-100': '#D1FAE5', // Light success - emerald-100
        
        'warning': '#F59E0B', // Professional amber - amber-500
        'warning-50': '#FFFBEB', // Light warning background - amber-50
        'warning-100': '#FEF3C7', // Light warning - amber-100
        
        'error': '#DC2626', // Clear red - red-600
        'error-50': '#FEF2F2', // Light error background - red-50
        'error-100': '#FEE2E2', // Light error - red-100
        
        // Border Colors
        'border': '#E5E7EB', // Minimal border - gray-200
        'border-light': '#F3F4F6', // Light border - gray-100
      },
      fontFamily: {
        'heading': ['Cairo', 'Satoshi', 'Space Grotesk', 'system-ui', 'sans-serif'],
        'body': ['Cairo', 'Satoshi', 'Space Grotesk', 'system-ui', 'sans-serif'],
        'caption': ['Cairo', 'Satoshi', 'Space Grotesk', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
        'arabic': ['Cairo', 'Amiri', 'Noto Sans Arabic', 'system-ui', 'sans-serif'],
        'latin': ['Satoshi', 'Space Grotesk', 'Inter', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        // New title size for Vision Pro aesthetic
        'title': ['32px', { lineHeight: '1.2' }],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      borderRadius: {
        'sm': '0.375rem', // 6px
        'md': '0.5rem', // 8px
        'lg': '0.75rem', // 12px
        'xl': '1rem', // 16px
        '2xl': '1.5rem', // 24px
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'elevation-2': '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        'elevation-3': '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
        // Glass effect shadow
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.17)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        'navigation': '1000',
        'dropdown': '1010',
        'modal': '1020',
        'toast': '1030',
      },
      animation: {
        'fade-in': 'fadeIn 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'spring 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bar-rise': 'barRise 0.8s ease-out',
        'pie-rotate': 'pieRotate 1s ease-out',
        'line-pulse': 'linePulse 1.2s ease-in-out',
      },
      transitionDuration: {
        '150': '150ms',
        '250': '250ms',
        '400': '400ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      keyframes: {
        barRise: {
          '0%': { transform: 'scaleY(0)', opacity: 0 },
          '100%': { transform: 'scaleY(1)', opacity: 1 }
        },
        pieRotate: {
          '0%': { transform: 'rotate(-90deg)', opacity: 0 },
          '100%': { transform: 'rotate(0)', opacity: 1 }
        },
        linePulse: {
          '0%': { opacity: 0.5, transform: 'scaleX(0.95)' },
          '50%': { opacity: 1, transform: 'scaleX(1.03)' },
          '100%': { opacity: 0.8, transform: 'scaleX(1)' }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
    function({ addUtilities }) {
      const newUtilities = {
        '.rtl': {
          direction: 'rtl',
        },
        '.ltr': {
          direction: 'ltr',
        },
        '.text-align-start': {
          'text-align': 'start',
        },
        '.text-align-end': {
          'text-align': 'end',
        },
        '.float-start': {
          'float': 'inline-start',
        },
        '.float-end': {
          'float': 'inline-end',
        },
        '.clear-start': {
          'clear': 'inline-start',
        },
        '.clear-end': {
          'clear': 'inline-end',
        },
        '.border-start': {
          'border-inline-start-width': '1px',
        },
        '.border-end': {
          'border-inline-end-width': '1px',
        },
        '.rounded-start': {
          'border-start-start-radius': '0.375rem',
          'border-end-start-radius': '0.375rem',
        },
        '.rounded-end': {
          'border-start-end-radius': '0.375rem',
          'border-end-end-radius': '0.375rem',
        },
        '.ms-auto': {
          'margin-inline-start': 'auto',
        },
        '.me-auto': {
          'margin-inline-end': 'auto',
        },
        '.ps-4': {
          'padding-inline-start': '1rem',
        },
        '.pe-4': {
          'padding-inline-end': '1rem',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
  darkMode: 'class'
}
import typography from '@tailwindcss/typography';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: '#7c3aed',
        background: '#0b1020',
      },
      fontFamily: {
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Roboto Mono',
          'Segoe UI Mono',
          'Helvetica Neue',
          'monospace',
        ],
      },
      spacing: {
        'sm-token': '8px',
        'md-token': '16px',
      },
    },
  },
  plugins: [typography],
};

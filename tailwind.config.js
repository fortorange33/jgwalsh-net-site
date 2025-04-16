/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

html, body {
  overscroll-behavior: none; /* Modern browsers */
}

html {
  text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

@supports not (overscroll-behavior: none) {
  /* Fallback styles for older browsers */
}

.custom-class {
  /* Removed vertical-align: baseline; as it is ineffective for block-level elements */
}
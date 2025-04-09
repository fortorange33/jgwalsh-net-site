/** @type {import('tailwindcss').Config} */
module.exports = {
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
@supports not (overscroll-behavior: none) {
  /* Fallback styles for older browsers */
}

.custom-class {
  vertical-align: baseline; /* Only if needed */
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // iOS Dark Mode Colors
        ios: {
          bg: {
            primary: '#000000',
            secondary: '#1C1C1E',
            tertiary: '#2C2C2E',
            elevated: '#3A3A3C',
          },
          label: {
            primary: '#FFFFFF',
            secondary: '#8E8E93',
            tertiary: '#48484A',
          },
          accent: {
            blue: '#0A84FF',
            green: '#30D158',
            orange: '#FF9F0A',
            red: '#FF3B30',
            purple: '#BF5AF2',
            pink: '#FF375F',
          },
          separator: '#38383A',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

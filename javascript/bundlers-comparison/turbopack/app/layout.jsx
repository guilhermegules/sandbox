import './globals.css';

export const metadata = {
  title: 'Turbopack - Bundler Comparison',
  description: 'Next.js powered by Turbopack engine',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

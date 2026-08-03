import './globals.css';

export const metadata = {
  title: 'AIcademy - Learn AI, Python & Machine Learning',
  description: 'The most effective way to learn AI engineering, Python, and machine learning through hands-on interactive courses. Start your AI journey today.',
  keywords: 'AI learning, Python course, machine learning, AI engineering, coding platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Varela+Round&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}

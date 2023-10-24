import StoreProvider from '@/store';
import React from 'react';
import { Flip, ToastContainer } from 'react-toastify';
import '/public/fontawesome/css/all.min.css';

export const metadata = {
  charset: 'utf-8',
  title: 'TurboBouffe',
  description: "Site de gestion de la bouffe de l'UA",
  icons: {
    icon: '/favicon.ico',
    apple: '/logo192.png',
  },
  themeColor: '#fb560c',
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <StoreProvider>{children}</StoreProvider>
        <ToastContainer autoClose={3000} transition={Flip} hideProgressBar={true} pauseOnHover={true} />
      </body>
    </html>
  );
}

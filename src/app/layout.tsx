import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: 'bay.camera - San Francisco Bay Area Photography Webcams',
  description: 'bay.camera is a collection of San Francisco Bay Area webcams and other useful photography resources.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
      <GoogleTagManager gtmId='GTM-XYZ' />
      <GoogleAnalytics gaId='G-QF4Z451TJF' />
    </html>
  );
}

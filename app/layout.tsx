import './globals.css';
// import { gql } from '@apollo/client';
import {
  Noto_Serif_Display as Serif,
  Roboto_Flex as Sans,
  Roboto_Mono as Mono,
} from 'next/font/google';
// import { cookies } from 'next/headers';
// import Link from 'next/link';
// import { getClient } from '../util/apolloClient';
import { ApolloClientProvider } from './ApolloClientProvider';

const sans = Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});
const serif = Serif({
  subsets: ['latin'],
  variable: '--font-serif',
});
const mono = Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata = {
  title: 'orniTwo',
  description: 'a mobile bird watching plattform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`bg-gray-800 text-yellow-550 ${sans.variable} ${mono.variable} ${serif.variable}`}
      >
        <ApolloClientProvider>{children}</ApolloClientProvider>
      </body>
    </html>
  );
}

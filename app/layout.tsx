import './globals.css';
// import { gql } from '@apollo/client';
import {
  Inter as Sans,
  Noto_Serif_Display as Serif,
  Roboto_Mono as Mono,
} from 'next/font/google';
// import { cookies } from 'next/headers';
// import Link from 'next/link';
// import { getClient } from '../util/apolloClient';
import { ApolloClientProvider } from './ApolloClientProvider';

const sans = Sans({ subsets: ['latin'] });

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
      <body className={sans.className}>
        <ApolloClientProvider>{children}</ApolloClientProvider>
      </body>
    </html>
  );
}

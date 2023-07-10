import { Route } from 'next';
import Link from 'next/link';
import ExploreButtonSmall from './components/ExploreButtonSmall';
import LogoutButton from './components/LogoutButton';

export const rootNotFoundMetadata = {
  title: 'Not Found',
  description: "sorry can't find the page you are looking for",
};

export default function RootNotFound() {
  return (
    <main className="h-screen ">
      <section className="flex items-center w-full p-8 justify-between font-extralight">
        <div className="">
          <span className="font-serif font-semibold text-3xl">
            <Link className="no-underline" href={'/' as Route}>
              orniTwo
            </Link>
          </span>
        </div>
        <ExploreButtonSmall />
      </section>
      <section className="flex flex-col flex-grow justify-center w-full mt-20 items-center">
        <div className="font-mono text-5xl p-8 text-center pb-16">404</div>
        <div className="font-mono text-2xl p-8 text-center">
          Sorry this page was not found!
        </div>
        <div className="font-mono font-extralight text-xl px-8 text-center">
          Make sure you visit a page that exists.
        </div>
      </section>
    </main>
  );
}

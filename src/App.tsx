import { Authenticated, Unauthenticated } from 'convex/react';

import LoggedIn from '@/components/LoggedIn';
import NotLoggedIn from '@/components/NotLoggedIn';

export default function App() {
  return (
    <main className="container max-w-2xl flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold my-8 text-center">
        Please No Lawsuits
      </h1>

      <Authenticated>
        <LoggedIn />
      </Authenticated>

      <Unauthenticated>
        <NotLoggedIn />
      </Unauthenticated>
    </main>
  );
}

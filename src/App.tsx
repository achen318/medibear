import { Authenticated, Unauthenticated } from 'convex/react';
import { UserButton, useUser } from '@clerk/clerk-react';

import LoggedIn from '@/components/LoggedIn';
import NotLoggedIn from '@/components/NotLoggedIn';
import Onboarding from '@/components/Onboarding';

export default function App() {
  const { user } = useUser();
  const onboarded = user?.unsafeMetadata.onboarded;

  return (
    <main className="container max-w-2xl flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold my-8 text-center">
        Please No Lawsuits
      </h1>

      <Authenticated>
        <UserButton />
        {onboarded ? <LoggedIn /> : <Onboarding />}
      </Authenticated>

      <Unauthenticated>
        <NotLoggedIn />
      </Unauthenticated>
    </main>
  );
}

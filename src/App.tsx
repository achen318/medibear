import './App.css';

import { Authenticated, Unauthenticated } from 'convex/react';

import LoggedIn from './components/LoggedIn';
import NotLoggedIn from './components/NotLoggedIn';
import Onboarding from './components/Onboarding';
import { useUser } from '@clerk/clerk-react';

export default function App() {
  const { user } = useUser();
  const onboarded = user?.unsafeMetadata.onboarded;

  return (
    <main className="">
      <Authenticated>{onboarded ? <LoggedIn /> : <Onboarding />}</Authenticated>

      <Unauthenticated>
        <NotLoggedIn />
      </Unauthenticated>
    </main>
  );
}

import { SignIn } from '@clerk/clerk-react';

export default function NotLoggedIn() {
  return (
    <div className="flex justify-center">
      <SignIn />
    </div>
  );
}

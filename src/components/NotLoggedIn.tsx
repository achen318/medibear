import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/clerk-react';

export default function SignIn() {
  return (
    <div className="flex justify-center">
      <SignInButton mode="modal">
        <Button>Sign in</Button>
      </SignInButton>
    </div>
  );
}

import {Authenticated, Unauthenticated, useMutation, useQuery} from 'convex/react';
import { SignInButton, UserButton } from '@clerk/clerk-react';
import './App.css';
import { Button } from '@/components/ui/button';
import { api } from '../convex/_generated/api';
import {useState} from "react";
import Post from "./components/post";
import Consult from "./components/Consult";
import LoggedIn from './components/LoggedIn';
import Onboarding from './components/Onboarding';
import { useUser } from '@clerk/clerk-react';



export default function App() {
  // Define the state for the checkbox (checked or not)
  const [isChecked, setIsChecked] = useState(false);

  // Handle the checkbox change
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked); // Update the state with the checkbox value (true or false)
  };
  
  const { user } = useUser();
  const onboarded = user?.publicMetadata.onboarded;

  return (
    <main className="">
      <Authenticated>
        <UserButton />
        {onboarded ? <LoggedIn /> : <Onboarding />}
      </Authenticated>

      <Unauthenticated>
        <LoggedIn />
        {/* make sure to remove this line */}
        <div className="flex justify-center items-start h-[90vh]">
          <div className="font-extrabold my-8 flex flex-col items-center space-y-6">
            <div>
              <SignInButton mode="modal">
                <Button className="px-8 py-4 text-lg">Sign in</Button>
              </SignInButton>
            </div>
          </div>
        </div>
      </Unauthenticated>
    </main>
  );
}

function SignedIn() {
  // get all posts blah blah blah

  const [isOpen, setIsOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Search for: ${searchQuery}`); // You can replace this with your search logic
  };

  return (
    <>
      <header className="bg-gray-800 text-white">
      <nav className="container mx-auto py-4 flex justify-between items-center">

        <div className="flex space-x-4">
          <a href="/services" className="hover:text-gray-400">All Posts</a>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 justify-center max-w-lg mx-auto"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-l-md bg-gray-700 text-white focus:outline-none"
          />

          <button
            type="submit"
            className="px-4 py-2 bg-gray-500 rounded-r-md text-white hover:bg-gray-400 focus:outline-none"
          >
            Submit
          </button>
        </form>
        
        {/* Menu Items */}
        <div className="flex space-x-4">
          <a href="/services" className="hover:text-gray-400">Profile</a>
        </div>

      </nav>
    </header>


    <div className="container mx-auto py-8">
      <Post subject="Hernia" patient="Eric Lin" date="11/11/2021" resolved={false} message="penis" id = "1"/>
      <Post subject="Hep B" patient="Anthony Chen" date="11/1/2021" resolved={false} message="penis" id = "1" />
      <Post subject="Hernia" patient="Eric Lin" date="11/11/2021" resolved={false} message="penis" id = "1"/>
      <Post subject="Hernia" patient="Eric Lin" date="11/11/2021" resolved={false} message="penis" id = "1"/>
    </div>
    </>
  );
}

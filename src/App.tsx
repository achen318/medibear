import {Authenticated, Unauthenticated, useMutation, useQuery} from 'convex/react';
import { SignInButton, UserButton } from '@clerk/clerk-react';
import './App.css';
import { Button } from '@/components/ui/button';
import { api } from '../convex/_generated/api';
import {useState} from "react";
import Post from "./components/post";
import Consult from "./components/Consult";


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
    <main className="container max-w-2xl flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold my-8 text-center">
        Please No Lawsuits
      </h1>
    <main className=""> {/*container max-w-2xl flex flex-col gap-8 */} 
      {/* <h1 className="text-4xl font-extrabold my-8 text-center">
      </h1> */}
      <Authenticated>
        <UserButton />
        {onboarded ? <LoggedIn /> : <Onboarding />}
      </Authenticated>

      <Unauthenticated>
        <SignedIn /> 
        {/* make sure to remove this line */}
        <div className="flex justify-center items-start h-[90vh]">
          <div className="font-extrabold my-8 flex flex-col items-center space-y-6">
            <div>
              <SignInButton mode="modal">
                <Button className="px-8 py-4 text-lg">Sign in</Button>
              </SignInButton>
            </div>
            
            {/* <div>
              <label className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-6 w-6 text-violet-600"
                />
                <span className="text-gray-700 text-lg">Doctor?</span>
              </label>
            </div> */}
          </div>
        </div>
      </Unauthenticated>
    </main>
  );
}

function SignedIn() {
  // get all posts blah blah blah

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Search for: ${searchQuery}`); // You can replace this with your search logic
  };

  // const { numbers, viewer } =
  //   useQuery(api.myFunctions.listNumbers, {
  //     count: 10
  //   }) ?? {};
  // const addNumber = useMutation(api.myFunctions.addNumber);

  return (
    // {isChecked && ( 
    <>
      <header className="bg-gray-800 text-white">
      <nav className="container mx-auto py-4 flex justify-between items-center">

      {/* Hamburger Icon */}
      {/*<div>
         <button onClick={toggleDropdown} className="relative group">
          <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
            <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
              <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-y-6 delay-100"></div>
              <div className="bg-white h-[2px] w-7 rounded transform transition-all duration-300 group-focus:translate-y-6 delay-75"></div>
              <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-y-6"></div>

              <div className="absolute items-center justify-between transform transition-all duration-500 top-2.5 -translate-x-10 group-focus:translate-x-0 flex w-0 group-focus:w-12">
                <div className="absolute bg-white h-[2px] w-5 transform transition-all duration-500 rotate-0 delay-300 group-focus:rotate-45"></div>
                <div className="absolute bg-white h-[2px] w-5 transform transition-all duration-500 -rotate-0 delay-300 group-focus:-rotate-45"></div>
              </div>
            </div>
          </div>
        </button> */}

          {/* <button
            onClick={toggleDropdown}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
          {isOpen && (
              <ul className="dropdown-menu">
                <li>All Posts</li>
                <li>Inbox</li>
                <li>Settings</li>
                <li>Feedback</li>
              </ul>
      )}
        </div> */}

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
      {/* <p>Welcome {viewer}!</p>
      <p className="flex gap-4 items-center">
        This is you:
        <UserButton afterSignOutUrl="#" />
      </p>
      <p>
        Click the button below and open this page in another window - this data
        is persisted in the Convex cloud database!
      </p>
      <p>
        <Button
          onClick={() => {
            void addNumber({ value: Math.floor(Math.random() * 10) });
          }}
        >
          Add a random number
        </Button>
      </p> */}
      {/* <p>
        Numbers:{' '}
        {numbers?.length === 0
          ? 'Click the button!'
          : numbers?.join(', ') ?? '...'}
      </p> */}
      {/* <p>
        Edit{' '}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          convex/myFunctions.ts
        </code>{' '}
        to change your backend
      </p>
      <p>
        Edit{' '}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          src/App.tsx
        </code>{' '}
        to change your frontend
      </p>
      <p>
        Check out{' '}
        <a
          className="font-medium text-primary underline underline-offset-4"
          target="_blank"
          href="https://docs.convex.dev/home"
        >
          Convex docs
        </a>
      </p> */}
    </div>
    </>
    // )}
  );
}

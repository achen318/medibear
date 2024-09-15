import './CreatePost.css'; // Add your custom styles here

import { useMutation, useQuery } from 'convex/react';

import CreatePost from './createPost';
import Post from './post';
import { UserButton } from '@clerk/clerk-react';
import { UserProfile } from '@clerk/clerk-react';
import { useState } from 'react';

export default function LoggedIn() {
  // const messages = useQuery(api.myFunctions.getMessages);
  // const createMessage = useMutation(api.myFunctions.createMessage);
  // const createConsult = useMutation(api.myFunctions.createConsult);
  // const createPatient = useMutation(api.myFunctions.createPatient);

  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([
    {
      subject: 'Stomach Pain',
      patient: 'Eric Lin',
      date: '01/01/2022',
      message:
        'Right side of my stomach hurts and my feces have been all sorts of color.',
      resolved: false,
      id: '1'
    },
    {
      subject: 'Dizziness When I Get Up',
      patient: 'Intia Ibnah',
      date: '02/02/2022',
      message:
        'My vision gets blurry every time I stand up or sit down. It takes a few seconds to adjust, but I always feel sick.',
      resolved: false,
      id: '2'
    }
  ]);

  // Function to add a new post
  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Search for: ${searchQuery}`);
  };

  return (
    <>
      <header className="bg-gray-800 text-white">
        <nav className="container mx-auto py-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <a href="/" className="hover:text-gray-400">
              Home
            </a>
          </div>

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

          <div className="flex space-x-4">
            <UserButton />
          </div>
        </nav>
      </header>

      <div className="container mx-auto py-8">
        {/* Pass the addPost function to CreatePost */}
        <CreatePost addPost={addPost} />

        {/* Display posts dynamically */}
        <div className="posts-container">
          {posts.map((postItem) => (
            <Post
              key={postItem.id}
              subject={postItem.subject}
              patient={postItem.patient}
              date={postItem.date}
              message={postItem.message}
              resolved={postItem.resolved}
              id={postItem.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}

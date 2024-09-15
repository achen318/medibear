import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';

export default function Onboarding() {
  const { user } = useUser();
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-extrabold text-center mb-10">
        Which option describes you?
      </h1>

      <button
        onClick={() => setSelectedOption('patient')}
        className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-5 rounded-full w-full text-xl"
      >
        I'm a patient!
      </button>
      <button
        onClick={() => setSelectedOption('practitioner')}
        className="bg-violet-400 hover:bg-violet-500 text-white font-bold py-5 rounded-full w-full text-xl"
      >
        I'm a practitioner!
      </button>

      {selectedOption == 'patient' && (
        <div>
          <form>
            <label htmlFor="sex">Sex</label>
            <br />
            <input type="text" id="sex" name="sex" />
            <br />
            <label htmlFor="blood">Blood Type</label>
            <br />
            <input type="text" id="blood" name="blood" />
            <br />
            <label htmlFor="allergies">Allergies</label>
            <br />
            <input type="text" id="allergies" name="allergies" />
            <br />
            <label htmlFor="conditions">Conditions</label>
            <br />
            <input type="text" id="conditions" name="conditions" />
            <br />
          </form>
        </div>
      )}
      {selectedOption == 'practitioner' && (
        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

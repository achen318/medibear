import { api } from '../../convex/_generated/api';
import { useMutation } from 'convex/react';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';

export default function Onboarding() {
  const { user } = useUser();
  const [selectedOption, setSelectedOption] = useState('');

  const createPatient = useMutation(api.myFunctions.createPatient);
  const createPractitioner = useMutation(api.myFunctions.createPractitioner);

  const handlePatientSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);

    const sex = formData.get('sex') as string;
    const bloodType = formData.get('blood') as string;
    const allergies = formData.get('allergies') as string;
    const conditions = formData.get('conditions') as string;

    await createPatient({
      sex,
      blood_type: bloodType,
      allergies,
      conditions,
      consults: []
    })
      .then(() => {
        user!.publicMetadata.onboarded = true;
      })
      .catch((error) => {
        console.error('Failed to update user:', error);
      });
  };

  const handlePractitionerSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    const formData = new FormData(e.currentTarget);

    const title = formData.get('title') as string;
    const specialty = formData.get('specialty') as string;
    const npi = parseInt(formData.get('npi') as string, 10);

    await createPractitioner({
      title,
      specialty,
      npi,
      consults: []
    })
      .then(() => {
        user!.publicMetadata.onboarded = true;
      })
      .catch((error) => {
        console.error('Failed to update user:', error);
      });
  };

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
        <form
          className="max-w mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            handlePatientSubmit(e).catch((error) => {
              console.error('Error during form submission:', error);
            });
          }}
        >
          <div className="mb-5">
            <label
              htmlFor="sex"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Sex
            </label>
            <input
              type="text"
              id="sex"
              name="sex"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Male"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="blood"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Blood Type
            </label>
            <input
              type="text"
              id="blood"
              name="blood"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="O-"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="allergies"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Known Allergies?
            </label>
            <input
              type="text"
              id="allergies"
              name="allergies"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="conditions"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Known Conditions?
            </label>
            <input
              type="text"
              id="conditions"
              name="conditions"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Onboard as patient!
          </button>
        </form>
      )}

      {selectedOption == 'practitioner' && (
        <form
          className="max-w mx-auto"
          onSubmit={(e) => {
            e.preventDefault();

            void handlePractitionerSubmit(e).catch((error) => {
              console.error('Error during form submission:', error);
            });
          }}
        >
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="M.D."
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="specialty"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Specialty *
            </label>
            <input
              type="text"
              id="specialty"
              name="specialty"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Internal"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="npi"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              NPI (National Provider Identifier) *
            </label>
            <input
              type="number"
              id="npi"
              name="npi"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="1234567890"
              required
              min={1000000000}
              max={9999999999}
              step={1}
            />
          </div>

          <button
            type="submit"
            className="text-white bg-violet-400 hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Onboard as practitioner!
          </button>
        </form>
      )}
    </div>
  );
}

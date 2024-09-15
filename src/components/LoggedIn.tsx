import { useMutation, useQuery } from 'convex/react';

import { api } from '../../convex/_generated/api';

export default function LoggedIn() {
  const messages = useQuery(api.myFunctions.getMessages);
  const createMessage = useMutation(api.myFunctions.createMessage);
  const createConsult = useMutation(api.myFunctions.createConsult);
  const createPatient = useMutation(api.myFunctions.createPatient);

  return (
    <>
      <h1>Hi</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);

          const author = formData.get('author') as string;
          const image = formData.get('image') as string;
          const text = formData.get('text') as string;
          const title = formData.get('title') as string;

          const newMessage = await createMessage({
            author,
            images: [image],
            text,
            replies: []
          });

          const newPatient = await createPatient({
            allergies: [],
            blood_type: 'O',
            conditions: [],
            consults: [],
            sex: 'F'
          });

          await createConsult({
            patient: newPatient._id,
            body: newMessage._id,
            resolved: false,
            title: title
          });
        }}
        style={{ color: 'lightgreen' }}
      >
        <label htmlFor="author">Author</label>
        <br />
        <input type="text" id="author" name="author" />
        <br />

        <label htmlFor="title">Consult Title</label>
        <br />
        <input type="text" id="title" name="title" />
        <br />

        <label htmlFor="image">Image</label>
        <br />
        <input type="text" id="image" name="image" />
        <br />

        <label htmlFor="text">Message</label>
        <br />
        <input type="text" id="text" name="text" />
        <br />

        <button type="submit">Submit</button>
      </form>

      <div className="flex flex-col gap-4">
        {messages?.map(({ _id, author, text }) => (
          <div key={_id}>
            {author} said: {text}
          </div>
        ))}
      </div>
    </>
  );
}

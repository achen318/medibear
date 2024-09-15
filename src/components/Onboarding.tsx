import { useUser } from '@clerk/clerk-react';

export default function Onboarding() {
  const { user } = useUser();

  return (
    <>
      <h1>We're excited to have you here! Which option describes you?</h1>

      <form>
        <input type="radio" id="patient" name="role" value="patient" />
        <label htmlFor="patient">Patient</label>
        <br />
        <input
          type="radio"
          id="practitioner"
          name="role"
          value="practitioner"
        />
        <label htmlFor="practitioner">Practitioner</label>
        <br /> <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

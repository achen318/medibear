import "./Consult.css";
import { useLocation } from 'react-router-dom';

export default function Consult() {
  const location = useLocation();
  const { subject, patient, date, resolved, message } = location.state;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      {/* Subject */}
      <h1 className="text-2xl font-bold text-violet-700 mb-4">
        {subject}
      </h1>

      {/* Patient, Date, Resolved */}
      <div className="text-gray-700 space-y-2">
        <p className="text-sm">
          <span className="font-semibold">Patient:</span> {patient}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Date:</span> {date}
        </p>
        <p className={`text-sm ${resolved ? 'text-green-600' : 'text-red-600'}`}>
          <span className="font-semibold">Resolved:</span> {resolved ? "Yes" : "No"}
        </p>
      </div>

      {/* Message */}
      <div className="mt-4 bg-gray-100 p-4 rounded-md text-gray-600">
        <p>{message}</p>
      </div>

      {/* Buttons (Optional) */}
      <div className="mt-6 flex justify-end space-x-3">
        <button className="px-4 py-2 bg-violet-500 text-white rounded-md hover:bg-violet-600 transition-colors">
          View Details
        </button>
        <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors">
          Resolve
        </button>
      </div>
    </div>
  );
}

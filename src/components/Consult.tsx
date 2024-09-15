import "./Consult.css";
import { useLocation } from 'react-router-dom';

export default function Consult() {
    const location = useLocation();
    const { subject, patient, date, resolved, message} = location.state;
    return (
        <div>
            <p>{patient} says penis</p>
            <h1>Consult</h1>
            <h1>Consult</h1>
            <h1>Consult</h1>
            <h1>Consult</h1>
            
        </div>
    );
}

// take props, render thm
import React from "react";
import "./post.css";
import { defineSchema } from "convex/server";
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';


interface PostProps {
    subject: string;
    patient: string;
    date: string;
    message: string /*Message[];*/
    resolved: boolean;
    id: string;
}

const Post: React.FC<PostProps> = ({subject, patient, date, resolved, message, id}) => {

    const navigate = useNavigate();

    const handleClick = () => {
        const data = { subject: subject, patient: patient, date: date, resolved: resolved, message: message, id: id};
        navigate('/consult/' + id, { state: data });
    };

    return (
        <div className="post bg-violet-400 hover:bg-violet-500 active:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 p-4 rounded-lg shadow-lg cursor-pointer" onClick={handleClick}>
            {/* Main Focus: Subject */}
            <h1 className="text-2xl font-bold text-white mb-2">Subject: {subject}</h1>
            
            {/* Secondary Information */}
            <div className="text-white space-y-1">
                <p className="text-sm font-medium">Patient: {patient}</p>
                <p className="text-sm font-medium">Date: {date}</p>
                <p className={`text-sm ${resolved ? 'text-green-500' : 'text-red-700'} font-medium`}>
                Resolved: {resolved ? 'Yes' : 'No'}
                </p>
            </div>
        </div>
    );
};

class Message {
    text: string;
    image: string;
    user: string;
    time: string;

    constructor(text: string, image: string, user: string, time: string) {
        this.text = text;
        this.image = image;
        this.user = user;
        this.time = time;
    }
}

export default Post;
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
}

const Post: React.FC<PostProps> = ({subject, patient, date, resolved, message}) => {

    const navigate = useNavigate();

    const handleClick = () => {
        const data = { subject: subject, patient: patient, date: date, resolved: resolved, message: message};
        navigate('/Consult/' + patient, { state: data });
    };

    return (
        <div className = "Consult bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300" onClick = {handleClick}>
            <h1> Subject: {subject} </h1>
            <p> Patient: {patient} </p>
            <p> Date: {date} </p>
            {/* <p> Message: {new Message("Hernia Big Bad", "Image Stub", "Eric Lin", "11:11")} </p> */}
            <p> Resolved: {resolved} </p>
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
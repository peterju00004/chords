import React from "react";
import Keyboard from "./Keyboard";
import { detection } from "../utils/midi";
import "./Home.css";

const Home = ({ currentDevice, notes, displayMode }) => {
    return (
        <div className="home-container">
            <div className="home-top">
                <h1 className="roboto-font">{(() => {
                    const res = detection(notes.map(note => note.identifier), displayMode);
                    return res == null ? "\u00A0" : res;
                })()}</h1>
                {/* <div>
                    Notes:
                    {notes.map((eachNote, index) => (
                        <span key={eachNote.identifier || index}>
                            {eachNote.identifier}{" "}
                        </span>
                    ))}
                </div> */}
            </div>
            <div className="home-middle">
                <Keyboard notes={notes.map(note => note.identifier)}/>
            </div>
            <div className="home-bottom">
                <h2 className="roboto-font">
                    Current device: {currentDevice
                        ? `${currentDevice.manufacturer} ${currentDevice.name}`
                        : "No device connected"}
                </h2>
            </div>
        </div>
    );
};

export default Home;

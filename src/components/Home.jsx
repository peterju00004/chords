import React, { useEffect } from "react";
import { detection } from "../utils/midi";

const Home = ({ midiInputDevices, setMidiInputDevices, currentDevice, setCurrentDevice, notes, setNotes }) => {
    return (
        <div>
            <h1>
                {
                    detection(notes.map(note => note.identifier))
                }
            </h1>
            <div>
                Notes: 
                {
                    notes.map((eachNote) => (
                        <span>{eachNote.identifier}</span>
                    ))
                }
            </div>
            <h2>
                Current device: {currentDevice 
                        ? currentDevice.manufacturer + " " + currentDevice.name 
                        : "No device connected"}
            </h2>
        </div>
    )
};

export default Home
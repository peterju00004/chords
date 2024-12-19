import React, { useEffect } from "react";

const Home = ({ midiInputDevices, setMidiInputDevices, currentDevice, setCurrentDevice, notes, setNotes }) => {
    return (
        <div>
            <h2>
                Current device: {currentDevice 
                        ? currentDevice.manufacturer + " " + currentDevice.name 
                        : "No device connected"}
            </h2>
            <div>
                Notes: 
                {
                    notes.map((eachNote) => (
                        <span>{eachNote.identifier}</span>
                    ))
                }
            </div>
        </div>
    )
};

export default Home
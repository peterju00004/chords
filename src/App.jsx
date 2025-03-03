import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { onEnabled } from './utils/midi';
import Navbar from "./components/Navbar";
import Devices from "./components/Devices";
import Home from "./components/Home";
import About from './components/About';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [midiInputDevices, setMidiInputDevices] = useState([]);
  const [currentDevice, setCurrentDevice] = useState(null);

  useEffect(() => {
    setMidiInputDevices(onEnabled());
  }, [setMidiInputDevices, setCurrentDevice, currentDevice]);

  // useEffect(() => {
  //   onEnabled.array.forEach(input => {
  //       if (input.id != device.id) input.removeListener();
  //       else input.addListener("noteon", e => {
  //           console.log(e.note.identifier)
  //       })
  //   });
  // }, currentDevice);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" 
          element={
            <Home midiInputDevices={midiInputDevices}
              setMidiInputDevices={setMidiInputDevices}
              currentDevice={currentDevice}
              setCurrentDevice={setCurrentDevice}
              notes={notes}
              setNotes={setNotes}
            />
          } 
        />
        <Route path="/devices"
          element={
            <Devices midiInputDevices={midiInputDevices}
              setMidiInputDevices={setMidiInputDevices}
              currentDevice={currentDevice}
              setCurrentDevice={setCurrentDevice}
              notes={notes}
              setNotes={setNotes}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App

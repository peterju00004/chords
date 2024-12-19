import React, { useEffect } from "react";
import { onEnabled } from './../utils/midi';
import "./Devices.css";

const Devices = ({ midiInputDevices, setMidiInputDevices, currentDevice, setCurrentDevice, notes, setNotes }) => {
  useEffect(() => {
    setMidiInputDevices(onEnabled());
  }, [setMidiInputDevices, setCurrentDevice, currentDevice]);

  const handleClick = (device) => {
    if (currentDevice) currentDevice.removeListener();
    console.log('Device clicked:', device);
    setCurrentDevice(device);

    device.addListener("noteon", e => {
      console.log(e.note.identifier, e.message.channel);

      notes.push(e.note);
    });

    device.addListener("noteoff", e => {
      console.log(e.note.identifier, e.message.channel);

      notes.splice(notes.indexOf(e.note), 1);
    })
  };

  useEffect(() => {
    console.log('Current Device:', currentDevice);
  }, [currentDevice]);

  return (
    <div>
      <h1>Devices</h1>
      <p>This is the Devices page where you can see the connected MIDI devices.</p>
      <div className="device">
        Devices:
        {midiInputDevices.map((device) => (
          <div key={device.id} className="device-block" onClick={() => handleClick(device)}>
            <h2>{device.manufacturer} {device.name}</h2>
            <p>ID: {device.id}</p>
            <span
              className={`device-status ${currentDevice && currentDevice.id === device.id ? 'green' : 'red'}`}
              title={currentDevice && currentDevice.id === device.id ? 'Current Device' : 'Inactive Device'}
            />
          </div>
        ))}
        <button onClick={() => {
          setMidiInputDevices(onEnabled());
          setCurrentDevice(null);
        }}>
          Refresh MIDI I/O Devices
        </button>
      </div>
    </div>
  );
};

export default Devices;
import { useEffect, useState } from 'react'
import { onEnabled } from './utils/midi'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [midiInputDevices, setMidiInputDevices] = useState([]);

  useEffect(() => {
    setMidiInputDevices(onEnabled())
  })

  return (
    <>
      <div className="card">
        Devices:
        {midiInputDevices.map((device) => (
          <div key={device.id} className="device-block">
            <h2>{device.manufacturer} {device.name}</h2>
            <p>ID: {device.id}</p>
          </div>
        ))}
        <button onClick={() => setMidiInputDevices(onEnabled())}>
          See MIDI I/O Devices
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App

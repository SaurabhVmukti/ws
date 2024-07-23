import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showAlert, setShowAlert] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const closeAlert = () => {
    setShowAlert(false);
  };

  const [status, setStatus] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5000');

    ws.onopen = () => {
        console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
        const updatedStatus = JSON.parse(event.data);
        console.log('WebSocket Message Received:', updatedStatus.message);
        setStatus(updatedStatus);
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed');
    };

    return () => {
        ws.close();
    };
}, []);

  return (
    <div className="App">
      {status.message && (
        <div className="alert-box">
          <p>{status.message}</p>
          <p>Current time: {status.timestamp}</p>
          <button onClick={closeAlert}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;
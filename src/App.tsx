import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const eventSource = new EventSource('http://localhost:3000/api/products/events/');

  eventSource.onmessage = function (event) {
    console.log('sse received');
  };

  eventSource.onerror = function (event) {
    console.error('EventSource error:', event);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

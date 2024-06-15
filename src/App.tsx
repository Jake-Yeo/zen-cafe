import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Stack, TextField } from '@mui/material';

function App() {

  const eventSource = new EventSource('http://localhost:3000/chatrooms/changeStream');

  eventSource.onmessage = function (event) {
    console.log('sse received');
  };

  eventSource.onerror = function (event) {
    console.error('EventSource error:', event);
  };

  return (
    <Stack>
      <TextField helperText={"above is ur chatroom name"}></TextField>
      <TextField helperText={"above is ur message to say to chatroom"}></TextField>
      <TextField helperText={"above is ur username to use"}></TextField>
      <Button>Create Room</Button>
      <Button>Send Message</Button>
    </Stack>
  );
}

export default App;

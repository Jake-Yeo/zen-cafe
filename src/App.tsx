import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Stack, TextField } from '@mui/material';
const { v4: uuidv4 } = require('uuid');

var username: string = '';
var chatroomUid: string = '';
var message: string = '';
var uid: string = uuidv4();

function App() {

  const eventSource = new EventSource('http://localhost:3000/chatrooms/changeStream');

  eventSource.onmessage = function (event) {
    console.log('sse received');
  };

  eventSource.onerror = function (event) {
    console.error('EventSource error:', event);
  };

  const onSendMessageClick = () => {
    fetch('http://localhost:3000/chatrooms/sendMessage', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chatroomUid: chatroomUid,
        username: username,
        userUid: uid,
        message: message,
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }

  return (
    <Stack>
      <TextField helperText={"above is ur chatroom Uid to send to"}
        onChange={(e) => { chatroomUid = e.target.value; }}
      ></TextField>
      <TextField helperText={"above is ur message to say to chatroom"}
        onChange={(e) => { message = e.target.value; }}
      ></TextField>
      <TextField helperText={"above is ur username to use"}
        onChange={(e) => {
          username = e.target.value;
          console.log(username);
        }}
      ></TextField>
      <Button>Create Room</Button>
      <Button onClick={onSendMessageClick}>Send Message</Button>
    </Stack>
  );
}

export default App;

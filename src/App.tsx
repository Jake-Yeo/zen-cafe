import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { sendMessage } from './functions/zenCafeChatroomsApi';
import FirebaseApi, { logout, signInWithGoogle } from './firebase/FirebaseApi';
import { doesUserExist, getUser } from './functions/zenCafeUsersApi';
import User from './objects/User';
import TestComponent from './components/TestComponent';
const { v4: uuidv4 } = require('uuid');

var username: string = '';
var chatroom_id: string = '';
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
    sendMessage(chatroom_id, username, uid, message);
  }

  return (
    <FirebaseApi>
      <Stack>
        <TextField helperText={"above is ur chatroom _id to send to"}
          onChange={(e) => { chatroom_id = e.target.value; }}
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
        <TestComponent></TestComponent>
        <Button onClick={signInWithGoogle}>Login</Button>
        <Button onClick={logout}>Logout</Button>
        <Button onClick={onSendMessageClick}>Send Message</Button>
        <Button onClick={async () => { console.log(await doesUserExist("fakegoogleid")) }}>test userExists</Button>
        <Button onClick={async () => { console.log(await getUser("fakegoogleid")) }}>test getUser</Button>
      </Stack>
    </FirebaseApi>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { sendMessage } from './functions/zenCafeChatroomsApi';
import FirebaseApi, { logout, signInWithGoogle } from './firebase/FirebaseApi';
import { doesUserExist, getUser } from './functions/zenCafeUsersApi';
import User from './objects/User';
import TestComponent from './components/testPageComponents/TestComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginSignupPage from './pages/LoginSignupPage';
import ChatroomsPage from './pages/ChatroomsPage';
import ChatroomPage from './pages/ChatroomPage';
import RadioProvider from './components/sharedComponents/Radio/RadioProvider';

function App() {
  return (
    <>
      <FirebaseApi>
        <RadioProvider> {/** global radio */}
          <BrowserRouter>
            <Routes>
              <Route index element={<LoginSignupPage />} />
              <Route path="/loginSignupPage/:expired" element={<LoginSignupPage />} />
              <Route path="/loginSignupPage" element={<LoginSignupPage />} />
              <Route path="/ChatroomsPage" element={<ChatroomsPage />} />
              <Route path="/ChatroomPage/:chatroomId" element={<ChatroomPage />} />
            </Routes>
          </BrowserRouter>
        </RadioProvider>
      </FirebaseApi>
    </>
  );
}

export default App;

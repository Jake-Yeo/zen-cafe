import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { sendMessage } from './functions/zenCafeChatroomsApi';
import FirebaseApi, { logout, signInWithGoogle } from './firebase/FirebaseApi';
import { doesUserExist, getUser } from './functions/zenCafeUsersApi';
import User from './objects/User';
import TestComponent from './components/TestComponent';
import TestPage from './pages/TestPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginSignupPage from './pages/LoginSignupPage';

function App() {
  return (
    <>
      <FirebaseApi>
        <BrowserRouter>
          <Routes>
            <Route index element={<LoginSignupPage />} />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </BrowserRouter>
      </FirebaseApi>
    </>
  );
}

export default App;

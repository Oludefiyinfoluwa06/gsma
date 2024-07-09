import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './routes/Home';
import Login from './routes/auth/Login';
import Register from './routes/auth/Register';
import ForgotPassword from './routes/auth/ForgotPassword';
import ResetPassword from './routes/auth/ResetPassword';
import Dashboard from './routes/Dashboard';
import AllEvents from './routes/events/AllEvents';
import MyEvents from './routes/events/MyEvents';
import CreateEvent from './routes/events/CreateEvent';
import EventDetails from './routes/events/EventDetails';
import EditEvent from './routes/events/EditEvent';
import Chat from './routes/chat/Chat';
import ChatRoom from './routes/chat/ChatRoom';
import Profile from './routes/auth/Profile';
import ProfileSetup from './routes/auth/ProfileSetup';
import ProfileUpdate from './routes/auth/ProfileUpdate';
import MeetingRoom from './routes/MeetingRoom';
import { PrivateRoute, ProtectedRoute } from './routes/ProtectedRoute';

import NotFound from './components/404';

import RootLayout from './layouts/RootLayout';
import EventLayout from './layouts/EventLayout';
import ProfileLayout from './layouts/ProfileLayout';
import ChatLayout from './layouts/ChatLayout';

import { AuthProvider } from './contexts/AuthContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { EventProvider } from './contexts/EventContext';

const App = () => {  
  return (
    <Router>
      <AuthProvider>
        <ProfileProvider>
          <EventProvider>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<PrivateRoute>
                <Login />
              </PrivateRoute>} />
              <Route path='/register' element={<PrivateRoute>
                <Register />
              </PrivateRoute>} />
              <Route path='/forgot-password' element={<PrivateRoute>
                <ForgotPassword />
              </PrivateRoute>} />
              <Route path='/reset-password' element={<PrivateRoute>
                <ResetPassword />
              </PrivateRoute>} />
              <Route path='/dashboard' element={<ProtectedRoute>
                <RootLayout />
              </ProtectedRoute>}>
                <Route index element={<Dashboard />} />
                <Route path='events' element={<EventLayout />}>
                  <Route index element={<AllEvents />} />
                  <Route path='my-events' element={<MyEvents />} />
                  <Route path='add' element={<CreateEvent />} />
                  <Route path=':id' element={<EventDetails />} />
                  <Route path=':id/edit' element={<EditEvent />} />
                </Route>
                <Route path='chats' element={<ChatLayout />}>
                  <Route index element={<Chat />} />
                  <Route path=':room' element={<ChatRoom />} />
                </Route>
                <Route path='profile' element={<ProfileLayout />}>
                  <Route index element={<Profile />} />
                  <Route path='setup' element={<ProfileSetup />} />
                  <Route path='update' element={<ProfileUpdate />} />
                </Route>
                <Route path='*' element={<NotFound />} />
              </Route>
              <Route path='/meeting/:room' element={
                <ProtectedRoute>
                  <MeetingRoom />
                </ProtectedRoute>
              } />
            </Routes>
          </EventProvider>
        </ProfileProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
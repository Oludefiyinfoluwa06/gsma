import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './routes/auth/Login';
import Register from './routes/auth/Register';
import ForgotPassword from './routes/auth/ForgotPassword';
import ResetPassword from './routes/auth/ResetPassword';
import Home from './routes/Home';
import AllEvents from './routes/events/AllEvents';
import MyEvents from './routes/events/MyEvents';
import CreateEvent from './routes/events/CreateEvent';
import EventDetails from './routes/events/EventDetails';
import Chat from './routes/chat/Chat';
import Profile from './routes/auth/Profile';
import ProfileSetup from './routes/auth/ProfileSetup';
import ProfileUpdate from './routes/auth/ProfileUpdate';
import { PrivateRoute, ProtectedRoute } from './routes/ProtectedRoute';

import NotFound from './components/404';

import RootLayout from './layouts/RootLayout';
import EventLayout from './layouts/EventLayout';
import ProfileLayout from './layouts/ProfileLayout';

import { AuthProvider } from './contexts/AuthContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { EventProvider } from './contexts/EventContext';
import EditEvent from './routes/events/EditEvent';

const App = () => {  
  return (
    <Router>
      <AuthProvider>
        <ProfileProvider>
          <EventProvider>
            <Routes>
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
              <Route path='/' element={<ProtectedRoute>
                <RootLayout />
              </ProtectedRoute>}>
                <Route index element={<Home />} />
                <Route path='events' element={<EventLayout />}>
                  <Route index element={<AllEvents />} />
                  <Route path='my-events' element={<MyEvents />} />
                  <Route path='add' element={<CreateEvent />} />
                  <Route path=':id' element={<EventDetails />} />
                  <Route path=':id/edit' element={<EditEvent />} />
                </Route>
                <Route path='chats' element={<Chat />} />
                <Route path='profile' element={<ProfileLayout />}>
                  <Route index element={<Profile />} />
                  <Route path='setup' element={<ProfileSetup />} />
                  <Route path='update' element={<ProfileUpdate />} />
                </Route>
                <Route path='*' element={<NotFound />} />
              </Route>
            </Routes>
          </EventProvider>
        </ProfileProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
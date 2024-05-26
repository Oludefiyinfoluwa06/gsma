import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './routes/auth/Login';
import Register from './routes/auth/Register';
import ForgotPassword from './routes/auth/ForgotPassword';
import ResetPassword from './routes/auth/ResetPassword';
import Home from './routes/Home';
import EventList from './routes/events/EventList';
import CreateEvent from './routes/events/CreateEvent';
import Chat from './routes/chat/Chat';
import Profile from './routes/auth/Profile';
import { PrivateRoute, ProtectedRoute } from './routes/ProtectedRoute';

import NotFound from './components/404';

import RootLayout from './layouts/RootLayout';
import EventLayout from './layouts/EventLayout';
import ProfileLayout from './layouts/ProfileLayout';

import { AuthProvider } from './contexts/AuthContext';
import { ProfileProvider } from './contexts/ProfileContext';
import ProfileUpdate from './routes/auth/ProfileUpdate';

const App = () => {  
  return (
    <Router>
      <AuthProvider>
        <ProfileProvider>
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
                <Route index element={<EventList />} />
                <Route path='add' element={<CreateEvent />} />
              </Route>
              <Route path='chats' element={<Chat />} />
              <Route path='profile' element={<ProfileLayout />}>
                <Route index element={<Profile />} />
                <Route path='update' element={<ProfileUpdate />} />
              </Route>
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </ProfileProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
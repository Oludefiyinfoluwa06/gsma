import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './routes/auth/Login';
import Register from './routes/auth/Register';
import ForgotPassword from './routes/auth/ForgotPassword';
import ResetPassword from './routes/auth/ResetPassword';
import Home from './routes/Home';
import EventList from './routes/events/EventList';
import Chat from './routes/chat/Chat';
import Profile from './routes/auth/Profile';
import { PrivateRoute, ProtectedRoute } from './routes/ProtectedRoute';
import NotFound from './components/404';

import RootLayout from './layouts/RootLayout';
import { AuthProvider } from './contexts/AuthContext';
import { ProfileProvider } from './contexts/ProfileContext';

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
              <Route path='events' element={<EventList />} />
              <Route path='chats' element={<Chat />} />
              <Route path='profile' element={<Profile />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </ProfileProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './routes/auth/Login';
import Register from './routes/auth/Register';
import ForgotPassword from './routes/auth/ForgotPassword';
import ResetPassword from './routes/auth/ResetPassword';
import Home from './routes/Home';
import { PrivateRoute, ProtectedRoute } from './routes/ProtectedRoute';
import NotFound from './components/404';

import RootLayout from './layouts/RootLayout';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {  
  return (
    <Router>
      <AuthProvider>
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
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
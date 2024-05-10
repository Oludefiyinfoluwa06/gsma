import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import Login from './routes/auth/Login';
import Register from './routes/auth/Register';

import RootLayout from './layouts/RootLayout';
import Home from './routes/Home';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={
          <ProtectedRoute>
            <RootLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Home />} />
        </Route>
      </>
    )
  );
  
  return (
    <RouterProvider router={router} />
  );
}

export default App;
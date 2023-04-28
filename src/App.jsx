import './App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthPage } from './pages/Auth';
import { HomePage } from './pages/Home';
import MainNavigation from './components/MainNavigation';
import React from 'react';
import { NotFoundPage } from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CreatePost } from './pages/CreatePost';

const App = () => {
  const location = useLocation();

  const hiddenRoutes = ['/auth'];
  const showNavigation = !hiddenRoutes.includes(location.pathname);

  return (
    <div className="App">
      <AuthProvider>
        {showNavigation && <MainNavigation />}
        <Routes>
          <Route path="/auth" element={<AuthPage />}></Route>
          <Route path="/" element={<Navigate to="/home" />}></Route>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/create-post"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;

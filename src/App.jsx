import './App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthPage } from './pages/Auth';
import { HomePage } from './pages/Home';
import MainNavigation from './components/MainNavigation';
import React from 'react';
import { useAuth } from './hooks/useAuth';
import AuthContext from './context/AuthContext';
import { NotFoundPage } from './pages/NotFound';

const App = () => {
  const location = useLocation();

  const hiddenRoutes = ['/auth', '/'];
  const showNavigation = !hiddenRoutes.includes(location.pathname);

  const { token, userId, login, logout } = useAuth();

  return (
    <div className="App">
      <React.Fragment>
        <AuthContext.Provider
          value={{
            token: token,
            userId: userId,
            login: login,
            logout: logout,
          }}
        >
          {showNavigation && <MainNavigation />}
          <Routes>
            {!token && <Route path="/" element={<Navigate to="/auth" />}></Route>}
            {!token && <Route path="/home" element={<Navigate to="/auth" />}></Route>}
            {token && <Route path="/" element={<Navigate to="/home" />}></Route>}
            {token && <Route path="/auth" element={<Navigate to="/home" />}></Route>}
            {!token && <Route path="/home" element={<Navigate to="/auth" />}></Route>}
            {!token && <Route path="/auth" element={<AuthPage />}></Route>}
            {token && <Route path="/home" element={<HomePage />}></Route>}
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </AuthContext.Provider>
      </React.Fragment>
    </div>
  );
};

export default App;

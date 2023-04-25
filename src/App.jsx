import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthPage } from './pages/Auth';
import { HomePage } from './pages/Home';
import MainNavigation from './components/MainNavigation';

function App() {
  return (
    <div className="App">
      <MainNavigation />
      <Routes>
        <Route path="/auth" element={<AuthPage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;

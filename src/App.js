import './App.css';
import Navbar from './components/Navbar';
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import { AuthContextProvider } from './context/AuthContext';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Account from './pages/Account';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/home' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>}/>
        </Routes>
      </AuthContextProvider>   
    </div>
  );
}

export default App;

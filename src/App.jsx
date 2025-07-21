import { BrowserRouter, Routes, Route} from 'react-router';
import './App.css';
import SignInAndSignUpPage from './pages/SignInAndSignUpPage';
import AddAndEditPage from './pages/AddAndEditPage';
import HomePage from './pages/homePage';
import ProtectedRotes from './components/ProtectedRoutes';
import { AuthProvider } from './components/AuthContext';
import { TaskProvider } from './components/TaskContext';

function App() {

  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<SignInAndSignUpPage/>}/>
            <Route element={<ProtectedRotes/>}>
              <Route path="/home" element={<HomePage/>} />
              <Route path="/addTask" element={<AddAndEditPage/>}/>
              <Route path="/editTask/:id" element={<AddAndEditPage/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import {useEffect} from 'react';
import { useDispatch } from 'react-redux';

import {Header} from './components/Header';
import {DiaryPage} from './pages/DiaryPage';
import {ProgramPage} from './pages/ProgramPage';
import {ExercisePage} from './pages/ExercisePage';
import {AboutPage} from './pages/AboutPage';
import {ContactPage} from './pages/ContactPage';
import {Auth} from './pages/Auth';
import {login, logout} from './store/user/userSlice';
import {getTokenFromLocalStorage} from './helpers/localstorage.helper';
import {AuthService} from './services/auth.service';
import {CreateProgramPage} from './pages/CreateProgramPage';

function App() {
    const dispatch = useDispatch()

    const router = createBrowserRouter(
      createRoutesFromElements(
        <>
          <Route path="/" element={<Header />}>
            <Route index element={<DiaryPage />} />
            <Route path="programs" element={<ProgramPage />} />
            <Route path="programs/create" element={<CreateProgramPage />} />
            <Route path="exercises" element={<ExercisePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contacts" element={<ContactPage />} />
          </Route>
          <Route path="auth" element={<Auth />} />
        </>
      )
    );

    const checkAuth = async () => {
        const token = getTokenFromLocalStorage()
        try {
            if (token) {
                const data = await AuthService.getProfile()
                if (data) {
                    dispatch(login(data))
                } else {
                    dispatch(logout())
                }
            }
        } catch (err) {
            console.log(err.response?.data)
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

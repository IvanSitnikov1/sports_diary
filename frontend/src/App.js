import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import {Header} from './components/Header';
import {DiaryPage} from './pages/DiaryPage';
import {ProgramPage} from './pages/ProgramPage';
import {ExercisePage} from './pages/ExercisePage';
import {AboutPage} from './pages/AboutPage';
import {ContactPage} from './pages/ContactPage';
import {Auth} from './pages/Auth';
import {CreateProgramPage} from './pages/CreateProgramPage';
import {UpdateProgramPage} from './pages/UpdateProgramPage';
import {PrivateRoute} from './components/PrivateRoute';


function App() {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <>
          <Route path="/" element={<Header />}>
            <Route element={<PrivateRoute />}>
                <Route index element={<DiaryPage />} />
                <Route path="programs" element={<ProgramPage />} />
                <Route path="programs/create" element={<CreateProgramPage />} />
                <Route path="programs/update" element={<UpdateProgramPage />} />
                <Route path="exercises" element={<ExercisePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="contacts" element={<ContactPage />} />
            </Route>
          </Route>
          <Route path="auth" element={<Auth />} />
        </>
      )
    );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

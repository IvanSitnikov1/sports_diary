import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
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


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Header />}>
        <Route index element={<DiaryPage />} />
        <Route path="programs" element={<ProgramPage />} />
        <Route path="exercises" element={<ExercisePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contacts" element={<ContactPage />} />
      </Route>
      <Route path="auth" element={<Auth />} />
  </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

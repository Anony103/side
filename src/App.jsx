import { Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import { AuthContextProvider } from '../config/AuthContext';
import Footer from './components/Footer';
import styled from "styled-components";

const Home = lazy(() => import('./pages/Home'));
const CourseOverview = lazy(() => import('./pages/CourseOverview'));
const Team = lazy(() => import('./pages/Team'));
const More = lazy(() => import('./pages/More'));
const About = lazy(() => import('./pages/Abouts'));
const Contact = lazy(() => import('./pages/Contact'));
const Carts = lazy(() => import('./pages/Carts'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Course = lazy(() => import('./pages/Course'));
const AboutMe = lazy(() => import('./pages/AboutMe'));
const LogForm = lazy(() => import('./components/LoginForm'))
const CreateForm = lazy(() => import('./components/CreateForm'))

export const Main = styled.main`
min-height: calc(100vh - 150px);
`;

function App() {

  const location = useLocation();
  const excludedPaths = ['/login', '/signup', '/loginForm', "/createForm"];
  const shouldDisplayNavbar = !excludedPaths.includes(location.pathname);
  return (
    <div className='bg-blue'>
    <AuthContextProvider>

      {shouldDisplayNavbar && <Navbar />}
      <Main >
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<CourseOverview />} />
            <Route path="/team" element={<Team />} />
            <Route path="/more" element={<More />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/carts" element={<Carts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/course/:id" element={<Course />} />
            <Route path="/aboutMe" element={<AboutMe />} />
            <Route path="/loginForm" element={<LogForm />} />
            <Route path="/createForm" element={<CreateForm />} />
          </Routes>
        </Suspense>
      </Main>
      {shouldDisplayNavbar &&<Footer/>}
    </AuthContextProvider>
    </div>
  );
}

export default App;

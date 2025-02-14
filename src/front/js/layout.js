import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
// import { BackendURL } from "./component/backendURL";
import { Home } from "./pages/home";
import { About } from "./pages/about";
import { Profile } from "./pages/profile";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import SignUp from "./pages/signup";
import WelcomePage from "./component/welcomePage";
import LogIn from "./pages/login";
import IsLogIn from "./component/islogin";
import Dashboard from "./pages/dashboard";
import FitInterview from "./pages/fitinterview";
import FitPage from "./pages/fitpage";
import CoachingInterview from "./pages/coachingInterview";
import CoachPage from "./pages/coachPage";
import ProfileUser from "./pages/userProfile";
import StatisticsScreen from "./component/statisticsScreen";
import GenerateRoutine from "./component/geminiResponseSurvy";
//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    // if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<LogIn />} path="/login" />
                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<WelcomePage />} path="/welcome" />
                        <Route element={<About />} path="/about" />
                        <Route element={<Profile />} path="/profile/:member" />
						<Route element={<IsLogIn />} path="/dashboard">
                            <Route Index element={<Dashboard />} path="" />
                            <Route path="fit-interview" element={<FitInterview />}/>
                            <Route path="generate-routine" element={<GenerateRoutine />}/>
                            <Route path="fit-page" element={<FitPage />}/>
                            <Route element={<StatisticsScreen />} path="statisticsscreen" />                             
                            <Route path="coaching-interview" element={<CoachingInterview />}/>
                            <Route path="coach-page" element={<CoachPage />} />
                            <Route path="userprofile" element={<ProfileUser />} />
                        </Route>                     	
                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);

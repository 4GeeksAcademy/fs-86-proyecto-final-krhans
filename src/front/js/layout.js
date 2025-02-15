import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
// import { BackendURL } from "./component/backendURL";
import { HomeWelcomePage } from "./pages/homeWelcomePage";
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
import LandingPage from "./pages/landingPage";
import CoachingInterview from "./pages/coachingInterview";
import CoachPage from "./pages/coachPage";
import ProfileUser from "./pages/userProfile";
import StatisticsScreen from "./component/statisticsScreen";
import GenerateRoutine from "./component/geminiResponseSurvy";



const Layout = () => {

    const basename = process.env.BASENAME || "";

    // if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<HomeWelcomePage />} path="/" />
                        <Route element={<LogIn />} path="/login" />
                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<WelcomePage />} path="/welcome" />
                        <Route element={<About />} path="/about" />
                        <Route element={<Profile />} path="/profile/:member" />
						<Route element={<IsLogIn />} path="/dashboard">
                            <Route Index element={<Dashboard />} path="" />
                            <Route path="fit-interview" element={<FitInterview />}/>
                            <Route path="generate-routine" element={<GenerateRoutine />}/>
                            <Route path="landing" element={<LandingPage />}/>
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

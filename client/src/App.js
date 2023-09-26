import React from "react";
import {
    Route,
    Routes,
    BrowserRouter
} from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}

function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route exact path="/" element={LandingPage()}/>

                    <Route exact path="/login" element={LoginPage()}/>

                    <Route exact path="/register" element={RegisterPage()}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

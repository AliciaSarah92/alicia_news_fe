import { React, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SingleArticle from './Pages/SingleArticle';
import Users from './Pages/Users';
import Navbar from './components/Navbar';
import Topics from './Pages/Topics';
import Articles from './Pages/Articles';

function App() {
    const user = localStorage.getItem('user');
    const [loggedIn, setLoggedIn] = useState(JSON.parse(user) || null)
    

    return (
        <>
            <Navbar loggedIn={loggedIn} />
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/articles/:id"
                    element={<SingleArticle loggedIn={loggedIn} />}
                />
                <Route
                    path="/users"
                    element={<Users setLoggedIn={setLoggedIn} />}
                />
                <Route
                    path="/topics"
                    element={<Topics />}
                /> 
                 <Route
                    path="/topics/:topic"
                    element={<Articles />}
                /> 
            </Routes>
        </>
    );
}

export default App;

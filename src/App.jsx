import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'
import SingleArticle from './Pages/SingleArticle'
import Users from './Pages/Users'
import Navbar from './components/Navbar';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/articles/:id"
                    element={<SingleArticle />}
                 />
                <Route
                    path="/users"
                    element={<Users />}
                />
                {/* <Route
                    path="/users"
                    element={<User />}
                />  */}
            </Routes>
        </>
    );
}

export default App;

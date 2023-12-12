import {React, useState} from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'
import SingleArticle from './Pages/SingleArticle'
import Users from './Pages/Users'
import Navbar from './components/Navbar';

function App() {
    const [loggedIn, setLoggedIn] = useState(null);

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
                    element={<SingleArticle />}
                 />
                <Route
                    path="/users"
                    element={<Users setLoggedIn={setLoggedIn}/>}
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

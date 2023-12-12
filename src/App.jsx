import { React } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SingleArticle from './Pages/SingleArticle';

function App() {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/articles/:id"
                    element={<SingleArticle />}
                />
                {/* <Route
                    path="/basket"
                    element={<Basket basket={basket} />}
                />
                <Route
                    path="/users"
                    element={<User />}
                /> */}
            </Routes>
        </>
    );
}

export default App;

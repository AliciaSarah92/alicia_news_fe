import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    let navigate = useNavigate();
    const toHome = () => {
        navigate('/');
    };
    const toLogin = () => {
        navigate('/users');
    };
    return (
        <nav className="nav">
            <button onClick={toHome}>Home</button>
            <button onClick={toLogin}>Login</button>
        </nav>
    );
};

export default Navbar;

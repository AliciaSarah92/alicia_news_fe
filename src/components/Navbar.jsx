import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = props => {
    let navigate = useNavigate();
    const toHome = () => {
        navigate('/');
    };
    const toLogin = () => {
        navigate('/users');
    };

    return (
        <nav className="nav">
            <button className='styled-btn' onClick={toHome}>Home</button>
            <button className='styled-btn' onClick={toLogin}>Login</button>
            <p>Logged in as: {props.loggedIn ? props.loggedIn.username : 'Guest'}</p>
        </nav>
    );
};

export default Navbar;

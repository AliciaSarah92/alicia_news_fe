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
    const toTopics = () => {
        navigate('/topics');
    }

    return (
        <nav className="nav">
            <button className='styled-btn' onClick={toHome}>Home</button>
            <button className='styled-btn' onClick={toLogin}>Login</button>
            <button className='styled-btn' onClick={toTopics}>Topics</button>
            <p>Logged in as: {props.loggedIn ? props.loggedIn.username : 'Guest'}</p>
        </nav>
    );
};

export default Navbar;

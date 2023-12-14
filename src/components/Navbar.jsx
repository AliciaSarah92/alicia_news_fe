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
    const handleLogout = () => {
        localStorage.removeItem('user');
        props.setLoggedInUser(null);
        window.alert('You have been logged out');
    };
    return (
        <nav className="nav">
            <button onClick={toHome}>Home</button>
            {props.loggedIn ? <button onClick={handleLogout}>Logout</button> : <button onClick={toLogin}>Login</button>}
            <p>Logged in as: {props.loggedIn ? props.loggedIn.username : 'Guest'}</p>
        </nav>
    );
};

export default Navbar;

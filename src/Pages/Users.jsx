import { React, useState, useEffect } from 'react';
import { getUsers } from '../utils/api';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(false);
    const [login, setLogin] = useState(false);

    const handleClick = (event, user) => {
        event.preventDefault();
        setLogin(true);
        localStorage.setItem('user', JSON.stringify(user));
        window.alert(`You are logged in as ${user.username}`)
    };

    useEffect(() => {
        getUsers()
            .then(({ data }) => {
                setUsers(data.users);
            })
            .catch(err => {
                setError(true);
            });
    }, []);

    return (
        <div>
            <h2>Users</h2>
            <ul className="users-list">
                {users.length &&
                    users.map(user => {
                        return (
                            <li
                                className="users-list-item"
                                key={user.username}
                            >
                                <p>{user.username}</p>
                                <img
                                    src={user.avatar_url}
                                    alt={user.username}
                                />
                                <p>{user.name}</p>
                                <button
                                    onClick={event => {
                                        handleClick(event, user);
                                    }}
                                >
                                    Login
                                </button>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default Users;

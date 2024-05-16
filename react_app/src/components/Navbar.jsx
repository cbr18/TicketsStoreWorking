import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/use-auth";



const Navbar = () => {
    const { isAuthenticated, username, logout } = useAuth();
    return (
        <div>
            <Link to="/">Home</Link>

            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="addPlace">addPlace</Link>
            <h1>{username}</h1>
            {isAuthenticated ? <button onClick={logout} >Logout</button> : <></>}

        </div>)
}
export default Navbar
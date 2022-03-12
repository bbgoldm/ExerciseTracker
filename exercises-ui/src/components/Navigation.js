import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Navigation(){
    return(
        <nav className = 'Header-nav'>
            <Link className = 'navLink' to="/"> Home</Link>
            <Link className = 'navLink' to="/add-exercise"> Add</Link>
        </nav>
    )
}

export default Navigation;
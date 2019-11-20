import './Logo.css'
import logo from '../assets/imgs/PauperLogo.jpg'
import { Link } from 'react-router-dom'
import React from 'react';

export default props =>
    <aside className="logo">
        <Link to="/" className="logo">
            <img src={logo} alt="logo" />
        </Link>

    </aside>
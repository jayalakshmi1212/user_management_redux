import React from 'react';
import '../style/home.css';
import { Link } from 'react-router-dom'; 


const HomePage = () => {


   
    return (
        <article>
            <nav>
                <ul>
                    <li><Link to="/">Logout</Link></li> 
                    <li><Link to="/edit">Edit Profile</Link></li> 
                    <li><Link to="/home">home</Link></li> 
                    
                </ul>
            </nav>
            <h1 className="fade-in">Discover New Worlds</h1>
            <div id="content" className="fade-in-2">
                <ul type="none">
                    <li><a href="">Culture</a></li>
                    <li><a href="">History</a></li>
                    <li><a href="">Legacy</a></li>
                </ul>
            </div>
            <div className="footer">
                <p>Kyoto Industries © <span>{new Date().getFullYear()}</span></p>
            </div>
        </article>
    );
};

export default HomePage;

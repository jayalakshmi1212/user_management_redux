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
            
            
        </article>
    );
};

export default HomePage;

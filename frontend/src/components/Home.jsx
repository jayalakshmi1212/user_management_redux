import React from 'react';
import '../style/home.css';
import { Link } from 'react-router-dom'; 


const HomePage = () => {


   
    return (
        <div className="home-page">
        <article>
            <nav>
                <ul>
                    <li><Link to="/">Logout</Link></li> 
                    <li><Link to="/edit">Edit Profile</Link></li> 
                    <div>
                    <li><Link to="/home">home</Link></li> 
                    </div>
                    
                </ul>
            </nav>
            
            
        </article>
        </div>
    );
};

export default HomePage;

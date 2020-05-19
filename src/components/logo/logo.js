import React from 'react';
import logoimg from './logo.png';
import './logo.css';


const Logo = () => {
    return (
        <div className='logoPosition'>
           <img className='logo' src={logoimg} alt='Recogno Logo'/>
        </div>
    );
}

export default Logo;
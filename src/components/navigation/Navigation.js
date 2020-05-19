import React from 'react';

const Navigation = ( { isSignedIn, onRouteChange }) => {
    
        if (isSignedIn) {
            return (
            <nav style={{display: 'flex', justifyContent: 'flex-end', height: '20px'}}>
            <p onClick={()=> onRouteChange('signout')} className='f5 link dim white underline pa3 pointer'> Sign Out </p>
            {console.log(isSignedIn)}
            </nav>
            );
        } else {
            return (
            <nav style={{display: 'flex', justifyContent: 'flex-end', height: '20px'}}>
            <p onClick={()=> onRouteChange('signin')} className='f5 link dim white underline pa3 pointer'> Sign in </p>
            <p onClick={()=> onRouteChange('register')} className='f5 link dim white underline pa3 pointer'> Register </p>
            {console.log(isSignedIn)}
            </nav> 
            );
        }
    }

export default Navigation;
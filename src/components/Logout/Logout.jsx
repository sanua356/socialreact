import React from 'react';
import { Redirect } from 'react-router-dom';

function Logout(props) {
    console.log("Component clear LC rendered");
    localStorage.clear();
    return(
        <>
        {<Redirect to = '/login'/>}
        {window.location.reload()}
        </>
    )
}
export default Logout;
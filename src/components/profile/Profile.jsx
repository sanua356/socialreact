import React from "react";
import Header from './../Header/Header';


function Profile(props) {    
    return (
        <div className='workspace'>
            <Header 
            headerTitle = "Profile"
            headerDescription = "Profile settings"
            />
            <h1 style={{ color: "black", textAlign: 'center' }}>Hello {props.username}!</h1>
        </div >
    );
}

export default Profile;
import React from "react";

function Profile(props) {
    return (
        <div className='workspace'>
            <h1 style={{ color: "white", textAlign: 'center' }}>Hello {props.username}!</h1>
        </div >
    );
}

export default Profile;
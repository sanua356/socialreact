import React from "react";
import Header from './../Header/Header';
import { connect } from 'react-redux';


function Profile(props) {    
    return (
        <div className='workspace'>
            <Header 
            headerTitle = "Profile"
            headerDescription = "Profile settings"
            />
            <h1 style={{ color: "black", textAlign: 'center' }}>PROFILE PAGE (IN DEVELOPMENT)</h1>
            <h3 style={{ color: "black", textAlign: 'center' }}>Hello - {props.username}!</h3>
        </div >
    );
}
const mapStateToProps = (state) =>{
    return {
        username: state.manyPages.username
    }
}

let ProfileContainer = connect(mapStateToProps, null)(Profile);
export default ProfileContainer;
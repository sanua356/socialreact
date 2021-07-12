import React from 'react';
import Header from '../header/header';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import Profile from '../profile/Profile';
import { Route, Redirect } from 'react-router-dom';
import Updates from './../updates/Updates';
import MessagesContainer from '../mainScreenMsg/MessagesContainer';
import LoginRoomContainer from '../loginRoom/loginRoomContainer';

function MainComponent(props) {
    console.log(props);
    return (
            <div className="container">
                <Header
                    dispatch={props.dispatch}
                    username={props.store.manyPages.username}
                />
                <div className="content">
                    <Navbar
                        dispatch={props.dispatch}
                        sidebarMenuItems={props.store.sidebarPage.sidebarMenuItems}
                    />
                    <Route exact path="/profile" >
                        <Profile
                            dispatch={props.dispatch}
                            username={props.store.manyPages.username}
                        />
                    </Route>

                    <Route exact path="/updates" >
                        <Updates />
                    </Route>

                    <Route exact path="/messages" >
                        <MessagesContainer />
                    </Route>
                    <Route exact path="/logout">
                        {localStorage.clear()}
                        <Redirect to="/login" />
                    </Route>
                    <Route exact path ="/login">
                        <LoginRoomContainer />
                    </Route>
                    <Redirect exact from="/" to="/messages" />
                </div>
                <Footer />
            </div>
    );
}

export default MainComponent;

import React from 'react';
import HeaderContainer from '../header/headerContainer';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import Profile from '../profile/Profile';
import { Route, Redirect } from 'react-router-dom';
import Updates from './../updates/Updates';
import MessagesContainer from '../mainScreenMsg/MessagesContainer';
import LoginRoomContainer from '../loginRoom/loginRoomContainer';

function MainComponent(props) {
    return (
            <div className="container">
                <HeaderContainer
                />
                <div className="content">
                    <Navbar
                        sidebarMenuItems={props.store.sidebarPage.sidebarMenuItems}
                    />
                    <Route exact path="/profile" >
                        <Profile
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

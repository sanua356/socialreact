import React from 'react';
import HeaderContainer from '../Header/HeaderContainer';
import Navbar from '../navbar/Navbar';
import Footer from '../Footer/Footer';
import Profile from '../profile/Profile';
import { Route, Redirect } from 'react-router-dom';
import Updates from '../updates/Updates';
import MessagesContainer from '../MainScreenMsg/MessagesContainer';
import Logout from '../Logout/Logout';

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

                    <Route path="/messages/:roomid?" >
                        <MessagesContainer />
                    </Route>
                    <Route exact path="/logout">
                        <Logout />
                    </Route>
                    <Redirect exact from="/" to="/messages" />
                </div>
                <Footer />
            </div>
    );
}

export default MainComponent;

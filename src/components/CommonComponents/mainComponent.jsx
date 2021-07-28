import React from 'react';
import HeaderContainer from '../Header/HeaderContainer';
import Navbar from '../navbar/Navbar';
import Footer from '../Footer/Footer';
import Profile from '../profile/Profile';
import { Route, Redirect } from 'react-router-dom';
import Updates from '../updates/Updates';
import MessagesContainer from '../MainScreenMsg/MessagesContainer';
import Logout from '../Logout/Logout';

function MainComponent(props) { //Компонент, который рендерится если пользователь залогинился в комнату
    return (
        <div className="mainScreen">
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
                    <Footer />
                    <Redirect exact from="/" to="/messages" />{/*Редирект на страницу сообщений, если пользователь ввёл ссылку-белиберду*/}
                </div>
            </div>
        </div>
    );
}

export default MainComponent;

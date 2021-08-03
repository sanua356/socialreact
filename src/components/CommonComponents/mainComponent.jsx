import React, {Suspense} from 'react';
import { Route, Redirect } from 'react-router-dom';
//import HeaderContainer from '../Header/HeaderContainer';
import Navbar from '../navbar/Navbar';
//import Footer from '../Footer/Footer';
import MessagesContainer from '../MainScreenMsg/MessagesContainer';
import Loader from '../CommonComponents/Loader/Loader';
import Error404 from '../404/Error404';
const Profile = React.lazy(() => import('../profile/Profile'));
const Updates = React.lazy(() => import('../updates/Updates'));
const Logout = React.lazy(() => import('../Logout/Logout'));

function MainComponent(props) { //Компонент, который рендерится если пользователь залогинился в комнату
    return (
        <div className="mainScreen">
            <div className="container">
                {/* <HeaderContainer
                /> */}

                    <Navbar
                        sidebarMenuItems={props.store.sidebarPage.sidebarMenuItems}
                        myUsername = {props.store.manyPages.username}
                    />
                    <Route exact path="/profile" >
                        <Suspense fallback = {<Loader lazyLoadComponent = {true} />}>
                            <Profile
                                username={props.store.manyPages.username}
                            />
                        </Suspense>  
                    </Route>

                    <Route exact path="/updates" >
                        <Suspense fallback = {<Loader lazyLoadComponent = {true}/>}>
                            <Updates />
                        </Suspense>  
                    </Route>

                    <Route path="/messages/:roomid?" >
                        <MessagesContainer />
                    </Route>
                    <Route exact path="/logout">
                        <Suspense fallback = {<Loader lazyLoadComponent = {true}/>}>
                            <Logout />
                        </Suspense>
                    </Route>
                    <Route exact path="/404">
                        <Error404 />
                    </Route>
                    {/* <Footer /> */}
                    <Redirect from="*" to="/404" />
                    <Redirect exact from="/" to="/messages" />{/*Редирект на страницу сообщений, если пользователь ввёл ссылку-белиберду*/}
            </div>
        </div>
    );
}

export default MainComponent;

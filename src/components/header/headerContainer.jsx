import React from 'react';
import { connect } from 'react-redux';
import Header from './header';

function mapStateToProps(state){
    return{
        username: state.manyPages.username,
        roomID: state.manyPages.roomID
    }
}

const headerContainer = connect(mapStateToProps)(Header);

export default headerContainer;
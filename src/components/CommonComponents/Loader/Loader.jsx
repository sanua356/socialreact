import React from 'react';
import LoaderStyles from './LoaderStyles.module.css';
import LoaderGIF from '../../../assets/Loader/loaderGif.gif';

function Loader(props) {  
    return (
        <div className={LoaderStyles.loader}>
            <div className={LoaderStyles.loaderImg}>
                <img src={LoaderGIF} alt="Loader" />
            </div>
        </div>
    );
}
export default Loader;
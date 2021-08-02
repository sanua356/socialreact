import React from 'react';
import LoaderStyles from './LoaderStyles.module.css';
import errorImg from "../../../assets/Loader/error.png";

function Loader(props) {  
    console.log(props);
    return (
        <div className={"workspace"}>
            <div className={`${LoaderStyles.dFlexScreenLoader} ${LoaderStyles.loader}`}>
                {props.lazyLoadComponent && !props.errors ? 
                <aside>
                    <div className={LoaderStyles.ldsRoller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </aside>
                : <div className = {LoaderStyles.dFlexScreenLoader}>
                    <img src={errorImg} alt="error image" />
                    <h1>Error</h1>
                    <span>{props.errors}</span>    
                </div>
                }
            </div>
        </div>
        
    );
}
export default Loader;
import React from 'react';
import alertErrorsStyles from './alertErrors.module.css';

function alertErrors(props){
    return(
        <div>
            <h1 className ={alertErrorsStyles.error}>ERROR</h1>
        </div>
    )
}
export default alertErrors;
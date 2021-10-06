import React from 'react';
import { Formik } from 'formik';
import * as yup from "yup";
import LoginRoomStyle from './loginRoom.module.css';
import loginIcon from '../../assets/LoginRoom/loginIcon2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

export const LoginRoomForm = (props) => {
    const [formTouched, setFormTouched] = React.useState(false);
    const [showErrorExistsMessage, setShowErrorExistsMessage] = React.useState(false);
    const [changeCreateRoom, setChangeCreateRoom] = React.useState(false);
    React.useEffect(() => {
        if(props.errors){
            setShowErrorExistsMessage(true);
        }else{
            if(props.roomExistsServerResponse === null && formTouched){
                setShowErrorExistsMessage(true);
            }else if(props.roomExistsServerResponse !== null && formTouched){
                setShowErrorExistsMessage(false);
            }
        }
        
    }, [props.roomExistsServerResponse, formTouched, props.errors])
    
    useEffect(()=> {
        props.changeCreateOrLoginStatus(changeCreateRoom);
    }, [changeCreateRoom])

    const validationSchema = yup.object().shape({
        username: yup.string().typeError("This field should be string")
        .min(3 , "Minimum length for this field - 3 characters")
        .max(20, "Maximum length for this field - 20 characters")
        .required("This is a required field"),
        secretKeyUsername: yup.string().typeError("This field should be string")
        .min(3 , "Minimum length for this field - 3 characters")
        .max(20, "Maximum length for this field - 20 characters")
        .required("This is a required field"),
        roomID: yup.string().typeError("This field should be string")
        .min(3 , "Minimum length for this field - 3 characters")
        .max(20, "Maximum length for this field - 20 characters")
        .required("This is a required field"),
    })

    return (
        <>
        <Formik 
        initialValues = {{
            username: "",
            secretKeyUsername: "", 
            roomID: "",
        }}
        validateOnBlur
        validationSchema = {validationSchema}
        onSubmit = {(values, resetForm) => {        
            props.sendDataFields(values.username, values.secretKeyUsername, values.roomID, changeCreateRoom);
            setFormTouched(true);
        }}
        >

        {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
                <form className={LoginRoomStyle.form}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                      handleSubmit();
                    }
                }}>
                    <div className = {LoginRoomStyle.titleAndLogo}>
                        <img src={loginIcon} alt="Login icon" />
                        <h2>{changeCreateRoom ? "Create room" : "Login room"}</h2>
                    </div>

                    {showErrorExistsMessage && !changeCreateRoom
                    ? <span className={LoginRoomStyle.messageFromDB}>
                        {!props.errors ? "Uncorrect data. Please, try again." : props.errors}
                        </span> 
                    : null} {/*Если комната не была найдена в базе */}

                    <div className = {LoginRoomStyle.fieldBlock} tabIndex="1">
                        <FontAwesomeIcon icon ={faUser} className="fas fa-lg"/>
                        <input
                            name = "username"
                            value = {values.username}
                            placeholder="Username"
                            type="text"
                            onChange= {handleChange}
                            onBlur = {handleBlur}
                            onKeyPress = {props.enterKeyPressed}
                        />
                        {touched.username && errors.username && <span className={LoginRoomStyle.error}>{errors.username}</span>}
                    </div>

                    <div className = {LoginRoomStyle.fieldBlock} tabIndex="2">
                    <FontAwesomeIcon icon ={faKey} className="fas fa-lg"/>
                        <input
                            name = "secretKeyUsername"
                            value = {values.secretKeyUsername}
                            placeholder="Secret Key"
                            type="text"
                            id="secretKeyUsernameInput"
                            onChange= {handleChange}
                            onBlur = {handleBlur}
                            onKeyPress = {props.enterKeyPressed}
                        />
                        {touched.secretKeyUsername && errors.secretKeyUsername && <span className={LoginRoomStyle.error}>{errors.secretKeyUsername}</span>}
                    </div>

                    <div className = {LoginRoomStyle.fieldBlock} tabIndex="3">
                        <FontAwesomeIcon icon ={faDoorClosed} className="fas fa-lg"/>
                        <input
                            name= "roomID"
                            value = {values.roomID}
                            placeholder="Room ID"
                            type="text"
                            id="roomIdInput"
                            onChange = {handleChange}
                            onBlur = {handleBlur}
                            onKeyPress = {props.enterKeyPressed}
                            />
                        {touched.roomID && errors.roomID && <span className={LoginRoomStyle.error}>{errors.roomID}</span>}
                    </div>
                <button
                    disabled = {(!isValid && !dirty) || !dirty}
                    type="submit"
                    onClick = {handleSubmit}
                    className={LoginRoomStyle.loginBtn}
                    tabIndex="4"
                >{!changeCreateRoom ? props.loginBtnName : "Create"}</button>

                <span 
                className = {LoginRoomStyle.createNewRoom}
                onClick = {() => {setChangeCreateRoom(!changeCreateRoom)}}>{!changeCreateRoom ? "Create new room" : "Login exists room"}</span>
            </form>
        )}
        </Formik>
        </>
    )
}

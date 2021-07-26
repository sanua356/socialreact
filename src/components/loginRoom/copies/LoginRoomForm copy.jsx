import React from 'react';
import { Formik } from 'formik';
import * as yup from "yup";
import LoginRoomStyle from './loginRoom.module.css';

export const LoginRoomForm = (props) => {

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
        onSubmit = {(values) => {props.sendDataFields(values.username, values.secretKeyUsername, values.roomID, true)}}
        >

        {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
                <form className={LoginRoomStyle.form}>
                <h2>Login room</h2>
                <label htmlFor="usernameInput" className={LoginRoomStyle.labels} >Введите ваше имя:</label>
                <input
                    name = "username"
                    value = {values.username}
                    placeholder="username"
                    type="text"
                    id="usernameInput"
                    className={LoginRoomStyle.inputs}
                    onChange= {handleChange}
                    onBlur = {handleBlur}
                    onKeyPress = {props.enterKeyPressed}
                />
                {touched.username && errors.username && <span className={LoginRoomStyle.error}>{errors.username}</span>}


                <label htmlFor="secretKeyUsernameInput" className={LoginRoomStyle.labels} >Enter secret key for username</label>
                <input
                    name = "secretKeyUsername"
                    value = {values.secretKeyUsername}
                    placeholder="secret key for username"
                    type="text"
                    id="secretKeyUsernameInput"
                    className={LoginRoomStyle.inputs}
                    onChange= {handleChange}
                    onBlur = {handleBlur}
                    onKeyPress = {props.enterKeyPressed}
                />
                {touched.secretKeyUsername && errors.secretKeyUsername && <span className={LoginRoomStyle.error}>{errors.secretKeyUsername}</span>}


                <label htmlFor="roomIdInput" className={LoginRoomStyle.labels}>Enter room id</label>
                <input
                    name= "roomID"
                    value = {values.roomID}
                    placeholder="chat ID"
                    type="text"
                    id="roomIdInput"
                    className={LoginRoomStyle.inputs}
                    onChange = {handleChange}
                    onBlur = {handleBlur}
                    onKeyPress = {props.enterKeyPressed}
                    />
                    {touched.roomID && errors.roomID && <span className={LoginRoomStyle.error}>{errors.roomID}</span>}
                    
                <button
                    disabled = {(!isValid && !dirty) || !dirty || !props.loginBtnClickableStatus}
                    type="submit"
                    onClick = {handleSubmit}
                    className={LoginRoomStyle.loginBtn}
                >{props.loginBtnName || "Server not connected" }</button>
            </form>
        )}
        </Formik>
        </>
    )
}

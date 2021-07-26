import React from 'react';
import { Formik } from 'formik';
import * as yup from "yup";
import LoginRoomStyle from './loginRoom.module.css';

export const LoginRoomForm = (props) => {

    const validationSchema = yup.object().shape({
        username: yup.string().typeError("Это поле должно быть строкой")
        .min(3 , "Минимальная длина этого поля - 3 символа")
        .max(20, "Максимальная длина этого поля - 20 символов")
        .required("Это обязательное поле"),
        secretKeyUsername: yup.string().typeError("Это поле должно быть строкой")
        .min(3 , "Минимальная длина этого поля - 3 символа")
        .max(20, "Максимальная длина этого поля - 20 символов")
        .required("Это обязательное поле"),
        roomID: yup.string().typeError("TЭто поле должно быть строкой")
        .min(3 , "Минимальная длина этого поля - 3 символа")
        .max(20, "Максимальная длина этого поля - 20 символов")
        .required("Это обязательное поле"),
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
                    <h2>Войти в комнату</h2>
                    <div className = {LoginRoomStyle.fieldBlock}>
                        <label htmlFor="usernameInput" >Введите ваше имя:</label>
                        <input
                            name = "username"
                            value = {values.username}
                            placeholder="Например: Кеша"
                            type="text"
                            id="usernameInput"
                            onChange= {handleChange}
                            onBlur = {handleBlur}
                            onKeyPress = {props.enterKeyPressed}
                        />
                        {touched.username && errors.username && <span className={LoginRoomStyle.error}>{errors.username}</span>}
                    </div>

                <div className = {LoginRoomStyle.fieldBlock}>
                    <label htmlFor="secretKeyUsernameInput" >Введите секретный ключ:</label>
                    <div className={LoginRoomStyle.secretKeyUsernameHintBlock}>
                    <input
                        name = "secretKeyUsername"
                        value = {values.secretKeyUsername}
                        placeholder="Например: Попугай"
                        type="text"
                        id="secretKeyUsernameInput"
                        onChange= {handleChange}
                        onBlur = {handleBlur}
                        onKeyPress = {props.enterKeyPressed}
                    />
                    <span className = {LoginRoomStyle.secretKeyUsernameHint} >?</span>
                    </div>
                    {touched.secretKeyUsername && errors.secretKeyUsername && <span className={LoginRoomStyle.error}>{errors.secretKeyUsername}</span>}
                </div>

                <div className = {LoginRoomStyle.fieldBlock}>
                    <label htmlFor="roomIdInput" >Введите ключ комнаты:</label>
                    <input
                        name= "roomID"
                        value = {values.roomID}
                        placeholder="Например: Мультфильм"
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
                >{props.loginBtnName || "Server not connected" }</button>
            </form>
        )}
        </Formik>
        </>
    )
}

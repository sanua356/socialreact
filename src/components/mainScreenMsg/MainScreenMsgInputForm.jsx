import React from 'react'
import MainScrMsg from './styles/messagesFrom.module.css';
import { Form, Field, Formik } from 'formik';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEnvelope, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';


const notification = { //Дефолтный обьект с оповещением (всплывающее окно) об ошибках для пользователя
    title: "Notification", //Заголовок оповещения
    message: "Notification message", //Сообщение с оповещением (инфо об ошибке)
    type: "danger", //Тип оповещения (Меняет цвет отображения)
    insert: "top", //Хз что, оно по дефолту было
    container: "top-center", //Позиционирование на экране
    dismiss: { //Настройки во время отображения
        duration: 2000, //Длительность отображения
        pauseOnHover: true, //Остановить таймер показа при наведении
        onScreen: true //Тоже хз, что но работает с ним красиво
      }
  };
let MainScreenMsgInputForm = (props) => {//Компонента, которая отображает форму ввода сообщения, кнопки взаимодействия и т.д.
    const [selectedMessagesLength, setSelectedMessagesLength] = useState(props.selectedMessagesLength); //Хук для того, чтобы кнопки взаимодействия
    //Например: изменить или удалить переходили в состояния disabled/enabled в зависимости от того, сколько выбрано сообщений
    
    useEffect (() => { //Хук, срабатывающий если количество выбранных сообщений изменилось. Он вызывает другой хук, который enable\disable кнопки.
        setSelectedMessagesLength(props.selectedMessagesLength);
    }, [props.selectedMessagesLength])

    useEffect (() => {
        if(props.errorServerMessagesNotification){
            store.addNotification({
                ...notification,
                title: "Error",
                message: props.errorServerMessagesNotification
            });
            props.clearServerMessageAfterView();
        } 
    }, [props.errorServerMessagesNotification])
    
    const validationSchema = yup.object().shape({ //Схема валидации для поля ввода сообщений.
        messageTextarea: yup.string().typeError("This field should be string").required("Message field is empty")
    }) //Валидационная схема поля ввода сообщений
    return (
        <>
        <Formik
            initialValues = {{
                messageTextarea: '' //Временная переменная хранения данных из поля ввода сообщений
            }}
            onSubmit={(values, resetForm) => { //Функция, срабатывающая при нажатии на кнопку "Send message"
                props.sendNewMessage(props.errors, props.myUsername, props.roomID, values.messageTextarea, props.usernameSecretKey,  props.messagesListLength, props.errorServerMessagesNotification);
                resetForm.setFieldValue('messageTextarea', '');
            }} //Функция отправки API к серверу с новым сообщением и отправка сообщения в UI
            validationSchema = {validationSchema} //Подключение схемы валидации к Формику
            validateOnBlur //Запуск валидации при изменении значения поля
        >   
        {({values, handleChange, isValid, handleSubmit, dirty}) => ( //Функции и переменные, которые регулируют логику взаимодействия с формой
            
            <div className={MainScrMsg.controlElementsChat}>{/* Блок со всей формой ввода (поле ввода и кнопки взаимодействия)*/} 
                <div className={MainScrMsg.controlElementsChatHeaderWithTextareaBtns}>{/* Блок с кнопками взаимодействия (изменить, удалить)*/} 
                    {/*Кнопка "Delete"*/}
                    <div 
                    disabled = {!selectedMessagesLength >= 1} /*Отключить если не выбраны сообщения*/
                    className={MainScrMsg.changeSendedMessageControlsBtns}
                    onClick={!selectedMessagesLength >= 1?
                        () => store.addNotification({
                                ...notification,
                                title: "Error",
                                message: "There are no messages selected for deletion.",
                                }): null}  /*Показать оповещение с ошибкой, если не выбраны сообщения для удаления*/
                    >
                        <span onClick={() => props.deleteMessages(props.roomID, props.selectedMessages)}>
                            <FontAwesomeIcon icon={faTrashAlt}/>
                            Delete
                        </span>
                    </div>

                    {/*Кнопка "Change"*/}
                    <div 
                    disabled = {selectedMessagesLength !== 1} /*Отключить если выбрано больше одного или не выбрано вовсе сообщения*/
                    className={MainScrMsg.changeSendedMessageControlsBtns}
                    onClick={selectedMessagesLength !== 1 /*Включить работу кнопки только если выбрано одно сообщение*/
                        ?() => store.addNotification({
                                ...notification,
                                title: "Error",
                                message: "No message selected for change.",
                                }) /*Показать оповещение с ошибкой, если сообщение для изменения не выбрано*/
                        :() => store.addNotification({
                            ...notification,
                            title: "Error",
                            message: "This functional is development.",
                            })} /*Показать оповещение с ошибкой, если выбрано сообщение. (Но функционал этой кнопки пока не готов!!!)*/
                    >
                        <span >
                            <FontAwesomeIcon icon={faEdit}/>
                            Change
                        </span>
                    </div>          
                </div>

                    <Form className={MainScrMsg.controlsBtns}>       
                        <Field  /*Поле ввода сообщений */
                        as = "textarea"
                        type = "textarea"
                        name = "messageTextarea"
                        placeholder="Enter new message..."
                        value =  {values.messageTextarea}  /*Значение поля ввода сообщений достаётся из Formik, чтобы работала yup валидация*/
                        onChange = {handleChange} /*Функция, которая срабатывает во время изменения контента в поле ввода*/
                        onKeyDown={(e) => { /*Отправить сообщение по нажатию Enter*/
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSubmit(); /*Функция отправки сообщения*/
                            }
                        }}
                        /> {/*Поле ввода сообщений с конфигурационными значениями */ }
                        
                            <button
                            disabled = {(!isValid && !dirty) || !dirty} //Отключить кнопку если форма не валидна или не тронута
                            type="submit"
                            id={MainScrMsg.sendMessageBtn}
                            onSubmit = {handleSubmit}> {/*Функция отправки сообщения*/}
                                <FontAwesomeIcon icon={faEnvelope} />
                                </button>
                             {/*Кнопка отправки сообщения на сервер */}
                    </Form>
            </div>
        )}  
        </Formik>
        <ReactNotification />
        </>
    )
}

export default MainScreenMsgInputForm;

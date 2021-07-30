import React from 'react'
import MainScrMsg from './mainScreenMsg.module.css';
import { Form, Field, Formik } from 'formik';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

function MainScreenMsgInputForm(props) {
    const [selectedMessagesLength, setSelectedMessagesLength] = useState(props.selectedMessagesLength);

    useEffect (() => {
        console.log("Message selected changed");
        setSelectedMessagesLength(props.selectedMessagesLength);
    }, [props.selectedMessagesLength])
    
    const validationSchema = yup.object().shape({
        messageTextarea: yup.string().typeError("This field should be string").required("Message field is empty")
    }) //Валидационная схема поля ввода сообщений
    return (
        <Formik
            initialValues = {{
                messageTextarea: '' //Временная переменная хранения данных из поля ввода сообщений
            }}
            onSubmit={(values, resetForm) => { //Функция, срабатывающая при нажатии на кнопку "Send message"
                props.sendNewMessage(props.errors, props.username, props.roomID, values.messageTextarea);
                resetForm.setFieldValue('messageTextarea', '');
            }} //Функция отправки API к серверу с новым сообщением и отправка сообщения в UI
            validationSchema = {validationSchema} //Подключение схемы валидации к Формику
            validateOnBlur //Запуск валидации при изменении значения поля
        >   
        {({values, handleChange, isValid, handleSubmit, dirty}) => ( //Функции и переменные, которые регулируют логику взаимодействия с формой
            
            <div className={MainScrMsg.controlElementsChat}>
                <div className={MainScrMsg.deleteAndCounterSelectedMessages}>
                    <div 
                    disabled = {!selectedMessagesLength >= 1}
                    className={MainScrMsg.changeSendedMessageControlsBtns}
                    >
                        <span onClick={() => props.deleteMessages(props.roomID, props.selectedMessages)}>
                            <FontAwesomeIcon icon={faTrashAlt}/>
                            Delete
                        </span>
                    </div>
                    <span 
                    className = {selectedMessagesLength >= 1 
                        ? MainScrMsg.deleteAndCounterSelectedMessagesVisible
                        : MainScrMsg.deleteAndCounterSelectedMessages}
                    >Messages selected: <aside>{props.selectedMessagesLength}</aside>
                    </span>
                </div>
                

                
                {/* {touched.messageTextarea && errors.messageTextarea 
                ? <span className = {MainScrMsg.errors}>
                    {errors.messageTextarea}
                    </span> 
                : null} Элемент для вывода ошибок валидации поля ввода сообщений */}

                    <Form className={MainScrMsg.controlsBtns}>       
                        <Field 
                        as = "textarea"
                        type = "textarea"
                        name = "messageTextarea"
                        placeholder="Enter new message..."
                        value =  {values.messageTextarea}
                        onChange = {handleChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                              handleSubmit();
                            }
                        }}
                        /> {/*Поле ввода сообщений с конфигурационными значениями */ }
                        
                            <button
                            disabled = {(!isValid && !dirty) || !dirty} //Отключить кнопку если форма не валидна или не тронута
                            type="submit"
                            id={MainScrMsg.sendMessageBtn}
                            onSubmit = {handleSubmit}>Send message</button>
                             {/*Кнопка отправки сообщения на сервер */}
                    </Form>

                <div 
                disabled = {selectedMessagesLength !== 1}
                className={MainScrMsg.changeSendedMessageControlsBtns}
                >
                    <span onClick={() => props.changeMessage()}>
                        <FontAwesomeIcon icon={faEdit}/>
                        Change
                    </span>
                </div>
            </div>
        )}  
        </Formik>
    )
}

export default MainScreenMsgInputForm;

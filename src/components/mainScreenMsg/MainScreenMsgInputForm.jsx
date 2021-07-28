import React from 'react'
import MainScrMsg from './mainScreenMsg.module.css';
import { Form, Field, Formik } from 'formik';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function MainScreenMsgInputForm(props) {
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
                
                {/* <div className={MainScrMsg.changeSendedMessageControlsBtns}>
                    <span onClick={() => props.deleteMessages()}>
                        <FontAwesomeIcon icon={faTrashAlt}/>
                        Delete
                    </span>
                </div> */}

                
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
                        /> {/*Поле ввода сообщений с конфигурационными значениями */ }
                        
                            <button
                            disabled = {(!isValid && !dirty) || !dirty} //Отключить кнопку если форма не валидна или не тронута
                            type="submit"
                            id={MainScrMsg.sendMessageBtn}
                            onSubmit = {handleSubmit}>Send message</button>
                             {/*Кнопка отправки сообщения на сервер */}
                    </Form>
            </div>
        )}  
        </Formik>
    )
}

export default MainScreenMsgInputForm;

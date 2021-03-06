import React from 'react';
import MainScrMsgStyle from './styles/messagesChatBubbles.module.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faExclamationTriangle, faUserSecret, faUserTie } from '@fortawesome/free-solid-svg-icons';

function messageSenderStyle(messageOwnership) {//Функция, которая добавляет класс, 
    //если сообщение в базе хранится не с ника пользователя (если оппонент, то класс, передвигающий сообщение вправо)
    if (messageOwnership === "me") {
        return MainScrMsgStyle.myMessage; //Вернуть класс, двигающий сообщение влево, если ник совпадает с моим
    } else {
        return MainScrMsgStyle.opponentMessage;//Вернуть класс, двигающий сообщение вправо, если ник не совпадает с моим
    }
}
const getMessagesUIMap = ( //Отобразить сообщения с сервера
    messagesList, //Массив сообщений с сервера, полученный через API запрос
    errors, //Переменная ошибок (если они есть)
    myUsername, //Мой ник в комнате
    selectMessageFromChat, //Переменная, указывающая, выбрано ли сообщение (например для даления). Вешает класс подстветки, если true
    selectedMessagesArray, //Массив выбранных элементов (например для удаления). Вешает класс подстветки и отправляет на сервер ID-шники сообщений после клика на кнопку удаления 
    setMessageSelected, // Функция хука, для ререндера стилей выбранного сообщения
    messageSelected = false //Изначальное состояние всех сообщений (не выбрано, например для удаления).
    ) =>{
    if (Object.keys(messagesList).length > 0) {//Проверка на присутствие сообщений в массиве (если сообщений нет, будет выведено соответствующее опопвещение).
        const mappedMessagesArray = messagesList.map((message) => //Преобразуем массив обьектов сообщений в массив JSX элементов
        <div className = 
        {`${MainScrMsgStyle.message} 
          ${messageSenderStyle(message.messageOwnership)}
          ${message.errors && MainScrMsgStyle.errorMessage}
          ${selectedMessagesArray.indexOf(message.id) !== -1 && MainScrMsgStyle.selectedMessage}`//Вешает класс для стилизации сообщения, (вправо или влево на экране) в завистимости от ответа функции
        }
        key={messagesList.indexOf(message)} //Вешаются ключии для каждого сообщения, чтобы реакт лишний раз не делал ререндер
        >
            {message.messageOwnership === 'me' && <div className={MainScrMsgStyle.messageInfo}>
                <FontAwesomeIcon icon={faUserTie} className = {"fas fa-lg"}/>
                <span className={MainScrMsgStyle.messageSender}>{message.messageSender}</span>
            </div>}
                <p
                    onClick = {() => { if(message.messageOwnership === 'me'){
                        selectMessageFromChat(message.id);//Добавляет (если его нет) и удаляет (если он есть) ID с выбранным сообщением в массив выбранных сообщений 
                        setMessageSelected(!messageSelected); //Меняет состояние хука выбранного сообщения, чтобы раюотала стилизация подстветки
                    }}}
                >   
                    {message.message} {/*Выводит отправителя и сообщение на экран */}
                    {message.errors 
                        && <span className = {MainScrMsgStyle.errorMessageIcon} title="Message not sended">
                        <FontAwesomeIcon icon ={faExclamationTriangle} className= "fas fa-md"/>
                        </span>
                    }
                </p>
                {message.messageOwnership === 'opponent' && <div className={MainScrMsgStyle.messageInfo}>
                    <FontAwesomeIcon icon={faUserSecret} className = {"fas fa-lg"}/>
                    <span className={MainScrMsgStyle.messageSender}>{message.messageSender}</span>
                </div>
                }
        </div>
        
        );
        return mappedMessagesArray; //Возвращает готовый массив JSX элементов с сообщениями для отображения
    }else{
        return(
            <div className={MainScrMsgStyle.messagesList}> 
                <p className={MainScrMsgStyle.messagesList}>{errors}</p> //Если есть ошибки, они выведутся через этот элемент
            </div>
        )
    }
}

const MessagesChatPage = React.memo((props) => { //Компонента, которая будет отрендерена. Отвечает за часть, где выводятся сообщения (без кнопок взаимодействия).
    const chatScreen = React.createRef(); //Реф на блок с сообщениями для скролла
    const [messageSelected, setMessageSelected] = useState(false); //Хук, срабатывающий, когда кликнули на сообщение

    const messages = getMessagesUIMap(
        props.messagesList,
        props.errors,
        props.myUsername,
        props.selectMessageFromChat,
        props.selectedMessages,
        setMessageSelected,
        messageSelected
);//Получить список всех сообщений с BLL
        useEffect(() => {
            if (props.messagesList.length) {
                chatScreen.current.scrollTop = chatScreen.current.scrollHeight;
            }
            
        }, [props.messagesList]); //Скролл чата вниз, когда отправилось или удалилось сообщение
    return (
        <>
        {props.messagesEmptyStatus 
        ? <div className={MainScrMsgStyle.notification}><span className = {MainScrMsgStyle.errors}>No saved messages from room.</span></div> 
        : <div className={MainScrMsgStyle.messagesList} ref ={chatScreen}>
            {props.loadedMessagesArrayLength >= 10 ? <button 
            type = "button" 
            className ={MainScrMsgStyle.loadMoreBtn} 
            onClick={() => props.loadMoreMessages(props.roomID, props.roomIsExists, props.myUsername, props.firstMessageID, props.usernameSecretKey)}
            >Load more messages</button> 
            : null}
            {messages}{/* render all messages from mapped array */}
        </div>}
        </>
    )
})

export default MessagesChatPage;

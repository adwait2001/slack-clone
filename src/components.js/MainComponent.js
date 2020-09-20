import { firestore, auth } from '../firebase';
import React, { useEffect, useState } from 'react';

function Main(props) {
    const { channels } = props;
    const [messages, setMessages] = useState([]);
    const [UserMessage, setUserMessages] = useState();

    function fetchMessages() {
        if (!channels.id) {
            return;
        }

        firestore.collection('messages').where('channel', '==', channels.id).get().then((snapshot) => {
            const messages = snapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
            });
            setMessages(messages);
        }).catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        fetchMessages();
    }, [channels]);

    function handleUserMessage(e) {
        setUserMessages(e.target.value);
    }

    function OnEnterPress(e) {
        if (e.keyCode === 13 && channels.id && UserMessage) {
            e.preventDefault();
            const data = {
                from: {
                    id: auth.currentUser.uid,
                    name: auth.currentUser.displayName
                },
                text: UserMessage,
                channel: channels.id,
                created_at: new Date(),
            };
            firestore.collection('messages').add(data).then((data) => {
                setUserMessages('');
                fetchMessages();
            })
        }
    }

    return (
        <div id="main-container">
            <div className="about-channel">
                <div className="channel-name">{channels.name}</div>
                <div className="channel-desc">{channels.description}</div>
            </div>
            <div className="messages-list">
                {messages.map((message) => (<div className="message">
                    <div className="left-block">
                        <img src="https://ca.slack-edge.com/T0188513NTW-U01867WD8GK-ga631e27835b-72" alt="" />
                    </div>
                    <div className="right-block">
                        <div className="user">
                            <div>{message.from.name}</div>
                            <span>1.21 AM</span>
                        </div>
                        <div className="user-message">{message.text}</div>
                    </div>
                </div>))}

            </div>
            <div className="chat-box">
                <textarea placeholder="Type something and press enter ..."
                    onChange={handleUserMessage}
                    onKeyDown={OnEnterPress}
                    value={UserMessage}
                ></textarea>
            </div>
        </div>
    )
}

export default Main;
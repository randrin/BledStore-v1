import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:8000"
    : window.location.host;

const ChatBox = (props) => {
  const { userInfo } = props;
  const [socket, setSocket] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const uiMessagesRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      type: "admin",
      name: "Support BledStore",
      body: "Hello There, Please ask your question ....",
    },
  ]);

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: "smooth",
      });
    }
    if (socket) {
      socket.emit("onLogin", {
        _id: userInfo._id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });
      socket.on("message", (data) => {
        setMessages([
          ...messages,
          { body: data.body, name: data.name, type: "admin" },
        ]);
      });
    }
  }, [messages, isOpen, socket]);

  const supportHandler = () => {
    setIsOpen(true);
    const sk = socketIOClient(ENDPOINT);
    setSocket(sk);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setMessages([...messages, { body: messageBody, name: userInfo.name }]);
    setMessageBody("");
    setTimeout(() => {
      socket.emit("onMessage", {
        body: messageBody,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
        _id: userInfo._id,
      });
    }, 1000);
  };
  return (
    <div className="chatbox-wrapper">
      {!isOpen ? (
        <button type="button" onClick={supportHandler} className="chatbox-btn">
          <i className="far fa-comment-dots" />
        </button>
      ) : (
        <div className="card card-body">
          <div className="row card-body-container">
            <h2 className="card-body-title">Support BlesStore</h2>
            <button
              type="button"
              onClick={closeHandler}
              className="card-body-close"
            >
              <i className="fas fa-window-close" />
            </button>
          </div>
          <ul ref={uiMessagesRef} className="card-body-messages">
            {messages.map((msg, index) => (
              <li
                key={index}
                className={`${
                  msg.type === "admin"
                    ? "message-admin-container"
                    : "message-user-container"
                }`}
              >
                <div
                  className={`${
                    msg.type === "admin"
                      ? "message-admin-content"
                      : "message-user-content"
                  }`}
                >
                  <strong>{msg.name}</strong>
                  <span>{msg.body}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="card-body-footer">
            <form onSubmit={submitHandler} className="row">
              <input
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                type="text"
                placeholder="Type your message"
              />
              <button
                type="submit"
                className={`chatbox-btn-submit ${
                  !!messageBody.length ? "opacity-one" : "opacity-half"
                }`}
                disabled={!!messageBody.length ? false : true}
              >
                Send <i className="far fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;

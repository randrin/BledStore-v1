import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";
import MessageBox from "../../../components/MessageBox";

let allUsers = [];
let allMessages = [];
let allSelectedUser = {};
const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:8000"
    : window.location.host;
export default function SupportScreen() {
  const [selectedUser, setSelectedUser] = useState({});
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  console.log("messages: ", messages);

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: "smooth",
      });
    }
    if (!socket) {
      const sk = socketIOClient(ENDPOINT);
      setSocket(sk);
      sk.emit("onLogin", {
        _id: userInfo._id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });
      sk.on("message", (data) => {
        if (allSelectedUser._id === data._id) {
          allMessages = [...allMessages, data];
        } else {
          const existUser = allUsers.find((user) => user._id === data._id);
          if (existUser) {
            allUsers = allUsers.map((user) =>
              user._id === existUser._id ? { ...user, unread: true } : user
            );
            setUsers(allUsers);
          }
        }
        setMessages(allMessages);
      });
      sk.on("updateUser", (updatedUser) => {
        const existUser = allUsers.find((user) => user._id === updatedUser._id);
        if (existUser) {
          allUsers = allUsers.map((user) =>
            user._id === existUser._id ? updatedUser : user
          );
          setUsers(allUsers);
        } else {
          allUsers = [...allUsers, updatedUser];
          setUsers(allUsers);
        }
      });
      sk.on("listUsers", (updatedUsers) => {
        allUsers = updatedUsers;
        setUsers(allUsers);
      });

      sk.on("selectUser", (user) => {
        allMessages = user.messages;
        setMessages(allMessages);
      });
    }
  }, [messages, socket, users]);
  const selectUser = (user) => {
    allSelectedUser = user;
    setSelectedUser(allSelectedUser);
    const existUser = allUsers.find((x) => x._id === user._id);
    if (existUser) {
      allUsers = allUsers.map((x) =>
        x._id === existUser._id ? { ...x, unread: false } : x
      );
      setUsers(allUsers);
    }

    // allMessages = [];
    // setMessages(allMessages);
    socket.emit("onUserSelected", user);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    allMessages = [
      ...allMessages,
      { body: messageBody, name: userInfo.name, isAdmin: true },
    ];
    setMessages(allMessages);
    setMessageBody("");
    setTimeout(() => {
      socket.emit("onMessage", {
        body: messageBody,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
        _id: selectedUser._id,
      });
    }, 1000);
  };

  return (
    <div className="row top support-wrapper">
      <div className="col-1 support-users">
        {users.filter((x) => x._id !== userInfo._id).length === 0 && (
          <MessageBox>No Online User Found</MessageBox>
        )}
        <ul>
          {users
            .filter((x) => x._id !== userInfo._id)
            .map((user) => (
              <li
                key={user._id}
                className={user._id === selectedUser._id ? "  selected" : "  "}
              >
                <button
                  className="block"
                  type="button"
                  href="#"
                  onClick={() => selectUser(user)}
                >
                  {user.name}
                </button>
                <span
                  className={
                    user.unread ? "unread" : user.online ? "online" : "offline"
                  }
                />
              </li>
            ))}
        </ul>
      </div>
      <div className="col-3 support-messages">
        {!selectedUser._id ? (
          <MessageBox>Select a user to start chat</MessageBox>
        ) : (
          <div className="support-messages-container">
            <div className="row">
              <strong>Chat with {selectedUser.name} </strong>
            </div>
            <hr />
            <ul ref={uiMessagesRef} className="support-messages-content">
              {messages.length === 0 && <li>No message.</li>}
              {messages.map((msg, index) => (
                <li
                  key={index}
                  className={`${
                    msg.isAdmin ? "message-admin" : "message-user"
                  }`}
                >
                  <div
                    className={`${
                      msg.isAdmin
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
            <div className="support-messages-footer">
              <form onSubmit={submitHandler} className="row">
                <input
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  type="text"
                  placeholder="type your message"
                />
                <button
                  type="submit"
                  disabled={!!messageBody.length ? false : true}
                  className={`chatbox-btn-submit ${
                    !!messageBody.length ? "opacity-one" : "opacity-half"
                  }`}
                >
                  Send <i className="far fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

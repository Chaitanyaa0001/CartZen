import React from 'react';
import './Sidebar.css';
import { useLogout } from '../../hooks/logout/Logout';

const Sidebar = ({ messages, onReset }) => {
  const { logout } = useLogout();

  return (
    <div className="sidebar-chat">
      <h2 className="sidebar-title">🕘 Chat History</h2>

      <div className="chat-history-list">
        {messages.length === 0 ? (
          <p className="empty-msg">No messages yet</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`history-msg ${msg.sender}`}>
              <div className="msg-text">{msg.text}</div>
              <div className="msg-time">{msg.time}</div>
            </div>
          ))
        )}
      </div>

      <button className="reset-btn" onClick={onReset}>Reset Chat</button>
      <button className="logout-btn" onClick={logout}>Logout</button>
    </div>
  );
};

export default Sidebar;

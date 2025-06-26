import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import Logo from '../../components/logo/Logo';
import Sidebar from '../../components/sidebar/Sidebar';
import { useProducts } from '../../hooks/products/useProduct';
import { toast } from 'react-toastify';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const { fetchProducts } = useProducts();
  const [showsidebar, setshowsidebar] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I'm TechBot, your AI shopping assistant. I can help you find the perfect electronics. What are you looking for today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const chatbodyref = useRef(null);

  useEffect(() => {
    if (chatbodyref.current) {
      chatbodyref.current.scrollTop = chatbodyref.current.scrollHeight;
    }
  }, [messages]);

 const handleresetchat = () => {
  setMessages([
    {
      sender: 'bot',
      text: "Hello! I'm TechBot, your AI shopping assistant. I can help you find the perfect electronics. What are you looking for today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  toast.info("Chat reset!");
};


  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Call Flask /api/chat with NLP logic
    const { botResponse, products } = await fetchProducts(input);

    let botText = botResponse;

    if (products.length > 0) {
      const productList = products
        .map((p) => `• ${p.name} - ₹${p.price.toFixed(2)}`)
        .join('\n');
      botText += `\n${productList}`;
    }

    const botMessage = {
      sender: 'bot',
      text: botText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  return (
    <div id="chat">
      {showsidebar && (
        <Sidebar messages={messages} onReset={handleresetchat} />
      )}

      <div className={`chat-page ${showsidebar ? 'shifted' : ''}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-bot-info">
            <div className="small-logo-wrapper">
              <Logo />
            </div>
            <div>
              <h3>TechBot AI</h3>
              <span className="online-dot">● Online</span>
            </div>
          </div>
          <button className="chat-history-btn" onClick={() => setshowsidebar(!showsidebar)}>Chat History</button>
        </div>

        {/* Chat Body */}
        <div className="chat-body" ref={chatbodyref}>
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              <p>{msg.text}</p>
              <span className="chat-time">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <form className="chat-input-form" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Ask me about electronics, laptops, phones..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;

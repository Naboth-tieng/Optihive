import React, { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      sendMessage(input);
      setInput("");
    }
  };

  const sendMessage = (text) => {
    const newMessage = {
      text,
      type: "user",
    };
    setMessages([...messages, newMessage]);
    // Simulate bot response (you can replace this with actual API calls)
    setTimeout(() => {
      const botResponse = {
        text: `You said: "${text}"`,
        type: "bot",
      };
      setMessages([...messages, botResponse]);
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot">
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.type === "user" ? "user" : "bot"}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <form className="chatbot-input" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={handleInput}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

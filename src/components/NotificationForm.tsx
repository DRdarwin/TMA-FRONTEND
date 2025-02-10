// src/components/NotificationForm.tsx
import React, { useState } from "react";
import axios from "axios";

const NotificationForm: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId || !message) {
      setResponseMessage("Всі поля обов'язкові.");
      return;
    }

    try {
      // Зверніть увагу: адреса бекенду може відрізнятися від localhost:5000
      const response = await axios.post(
        "http://localhost:5000/notifications/send",
        {
          userId,
          message,
        }
      );

      setResponseMessage(response.data.message || "Сповіщення надіслано!");
    } catch (error) {
      setResponseMessage("Помилка під час надсилання сповіщення.");
      console.error("Помилка відправки запиту:", error);
    }
  };

  return (
    <div>
      <h2>Надіслати сповіщення</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">ID користувача:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="message">Повідомлення:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Надіслати</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default NotificationForm;

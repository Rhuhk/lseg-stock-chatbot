import React, { useState, useEffect, useCallback, JSX, useRef } from "react";
import { Message, MessageType, StockExchange } from "../types/types";
import { LiaRobotSolid } from "react-icons/lia";
import { IoMdSend } from "react-icons/io";
import "./Chatbot.scss";
import MessageItem from "./MessageItem";
import CurrentQuestion from "./CurrentQuestion";

const Chatbot: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<Message[]>();
  const [stockExchangeList, setStockExchangeList] = useState<StockExchange[]>(
    []
  );
  const [selectedStockExchange, setSelectedStockExchange] = useState<number>();
  const [selectedStock, setSelectedStock] = useState<number>();
  const endOfContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endOfContentRef.current) {
      endOfContentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setStockExchangeList(jsonData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handlePushIntoChatHistory = useCallback(
    (
      id: number,
      type: MessageType,
      stockExchangeId?: number,
      text?: string
    ) => {
      const newMessage = {
        id,
        type,
        stockExchangeId,
        text,
      };
      setChatHistory((prev) => (prev ? [...prev, newMessage] : [newMessage]));
    },
    []
  );

  const handleSelectStockExchange = useCallback(
    (stockExchangeId: number, answer: string) => {
      const messageId = chatHistory ? chatHistory.length : 0;
      handlePushIntoChatHistory(messageId, MessageType.Question);
      handlePushIntoChatHistory(
        messageId + 1,
        MessageType.Answer,
        undefined,
        answer
      );

      setSelectedStockExchange(stockExchangeId);
    },
    [chatHistory, handlePushIntoChatHistory]
  );

  const handleSelectStock = useCallback(
    (stockId: number, stockExchangeId: number, answer: string) => {
      const messageId = chatHistory ? chatHistory.length : 0;
      handlePushIntoChatHistory(
        messageId,
        MessageType.Question,
        stockExchangeId,
        undefined
      );
      handlePushIntoChatHistory(
        messageId + 1,
        MessageType.Answer,
        undefined,
        answer
      );

      setSelectedStock(stockId);
    },
    [chatHistory, handlePushIntoChatHistory]
  );

  const handleBackToStockExchangeList = useCallback(
    (stockExchangeId?: number, questionText?: string) => {
      const messageId = chatHistory ? chatHistory.length : 0;
      handlePushIntoChatHistory(
        messageId,
        MessageType.Question,
        stockExchangeId,
        questionText
      );
      handlePushIntoChatHistory(
        messageId + 1,
        MessageType.Answer,
        undefined,
        "Back to Main Menu"
      );

      setSelectedStockExchange(undefined);
      setSelectedStock(undefined);
    },
    [chatHistory, handlePushIntoChatHistory]
  );

  const handleBackToStocksList = useCallback(
    (questionText: string) => {
      const messageId = chatHistory ? chatHistory.length : 0;
      handlePushIntoChatHistory(
        messageId,
        MessageType.Question,
        undefined,
        questionText
      );
      handlePushIntoChatHistory(
        messageId + 1,
        MessageType.Answer,
        undefined,
        "Go Back"
      );

      setSelectedStock(undefined);
    },
    [chatHistory, handlePushIntoChatHistory]
  );

  const displayChatHistory = useCallback(() => {
    if (!chatHistory || !chatHistory.length) {
      return null;
    }

    return chatHistory.map(
      (message): JSX.Element => (
        <div key={`message-${message.id}`}>
          <MessageItem
            message={message}
            stockExchangeList={stockExchangeList}
          />
        </div>
      )
    );
  }, [chatHistory, stockExchangeList]);

  return (
    <div className="chatbot-container">
      <div className="header-container">
        <h1>
          <span>
            <LiaRobotSolid />
          </span>
          LSEG chatbot
        </h1>
      </div>

      {!stockExchangeList.length ? (
        <div className="messages-container">
          <p>No stock data available.</p>
        </div>
      ) : (
        <div className="messages-container">
          <div>
            <p className="chatbot-message">
              Hello! Welcome to LSEG. I'm here to help you.
            </p>
          </div>
          <div>{displayChatHistory()}</div>
          <CurrentQuestion
            stockExchangeList={stockExchangeList}
            selectedStockExchange={selectedStockExchange}
            selectedStock={selectedStock}
            handleSelectStock={handleSelectStock}
            handleSelectStockExchange={handleSelectStockExchange}
            handleBackToStockExchangeList={handleBackToStockExchangeList}
            handleBackToStocksList={handleBackToStocksList}
          />
          <div ref={endOfContentRef} />
        </div>
      )}

      <div className="bottom-section-container">
        <p>Please pick an option.</p>
        <IoMdSend />
      </div>
    </div>
  );
};

export default Chatbot;

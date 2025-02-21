import React, { memo } from "react";
import { LiaRobotSolid } from "react-icons/lia";
import { Message, MessageType, StockExchange } from "../types/types";
import StockMenu from "./StockMenu";
import StockExchangeMenu from "./StockExchangeMenu";

interface MessageItemProps {
  message: Message;
  stockExchangeList: StockExchange[];
}

const MessageItem: React.FC<MessageItemProps> = memo(
  ({ message, stockExchangeList }) => {
    if (message.type === MessageType.Answer) {
      return (
        <div className="message-container-right">
          <p className="user-message">{message.text}</p>
        </div>
      );
    }

    if (message.text) {
      return (
        <div className="message-container-left">
          <span>
            <LiaRobotSolid />
          </span>
          <div className="message-menu-container">
            <div className="section-title-container">
              <p className="section-title stock-value">{message.text}</p>
            </div>
          </div>
        </div>
      );
    }

    if (message.stockExchangeId !== undefined) {
      return (
        <div className="message-container-left">
          <span>
            <LiaRobotSolid />
          </span>
          <StockMenu
            stockExchangeList={stockExchangeList}
            selectedStockExchange={message.stockExchangeId}
          />
        </div>
      );
    }

    return (
      <div className="message-container-left">
        <span>
          <LiaRobotSolid />
        </span>
        <StockExchangeMenu stockExchangeList={stockExchangeList} />
      </div>
    );
  }
);

export default MessageItem;

import React from "react";
import { StockExchange } from "../types/types";
import "./Chatbot.scss";

interface StockExchangeMenuProps {
  stockExchangeList: StockExchange[];
  handleOnClick?: (index: number, stockExchangeName: string) => void;
}

const StockExchangeMenu: React.FC<StockExchangeMenuProps> = ({
  stockExchangeList,
  handleOnClick,
}) => {
  return (
    <div className="message-menu-container">
      <div className="section-title-container">
        <p className="section-title">Please select a Stock Exchange.</p>
      </div>

      <div
        className={`message-menu-items-container${
          !handleOnClick ? "" : " cursor-pointer"
        }`}
      >
        {stockExchangeList.map((stockExchange, index) => (
          <button
            key={stockExchange.code}
            className="option-button"
            onClick={() => {
              if (!handleOnClick) {
                return;
              }
              handleOnClick(index, stockExchange.stockExchange);
            }}
          >
            {stockExchange.stockExchange}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StockExchangeMenu;

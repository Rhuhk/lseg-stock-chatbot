import React from "react";
import { StockExchange } from "../types/types";
import "./Chatbot.scss";

interface StockMenuProps {
  stockExchangeList: StockExchange[];
  selectedStockExchange: number;
  handleOnClick?: (
    index: number,
    selectedStockExchange: number,
    stockName: string
  ) => void;
}

const StockMenu: React.FC<StockMenuProps> = ({
  stockExchangeList,
  selectedStockExchange,
  handleOnClick,
}) => {
  return (
    <div className="message-menu-container">
      <div className="section-title-container">
        <p className="section-title">Please select a stock.</p>
      </div>

      <div
        className={`message-menu-items-container${
          !handleOnClick ? "" : " cursor-pointer stocks-container"
        }`}
      >
        {stockExchangeList[selectedStockExchange].topStocks.map(
          (stock, index) => (
            <button
              key={stock.code}
              className="option-button"
              onClick={() => {
                if (!handleOnClick) {
                  return;
                }
                handleOnClick(index, selectedStockExchange, stock.stockName);
              }}
            >
              {stock.stockName}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default StockMenu;

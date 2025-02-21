import React, { memo } from "react";
import { LiaRobotSolid } from "react-icons/lia";
import { StockExchange } from "../types/types";
import StockMenu from "./StockMenu";
import StockExchangeMenu from "./StockExchangeMenu";

interface CurrentQuestionProps {
  stockExchangeList: StockExchange[];
  selectedStockExchange: number | undefined;
  selectedStock: number | undefined;
  handleSelectStock: (
    stockId: number,
    stockExchangeId: number,
    answer: string
  ) => void;
  handleSelectStockExchange: (stockExchangeId: number, answer: string) => void;
  handleBackToStockExchangeList: (
    stockExchangeId?: number,
    questionText?: string
  ) => void;
  handleBackToStocksList: (questionText: string) => void;
}

const CurrentQuestion: React.FC<CurrentQuestionProps> = memo(
  ({
    stockExchangeList,
    selectedStockExchange,
    selectedStock,
    handleSelectStock,
    handleSelectStockExchange,
    handleBackToStockExchangeList,
    handleBackToStocksList,
  }) => {
    if (selectedStockExchange !== undefined && selectedStock !== undefined) {
      const name =
        stockExchangeList[selectedStockExchange].topStocks[selectedStock]
          .stockName;
      const price =
        stockExchangeList[selectedStockExchange].topStocks[selectedStock].price;
      const content = `Stock Price of ${name} is ${price}. Please select an option.`;

      return (
        <div className="message-container-left">
          <span>
            <LiaRobotSolid />
          </span>
          <div className="message-menu-container">
            <div className="section-title-container">
              <p className="section-title">{content}</p>
            </div>
            <div className={`message-menu-items-container cursor-pointer`}>
              <button
                className="option-button"
                onClick={() =>
                  handleBackToStockExchangeList(selectedStockExchange, content)
                }
              >
                Main Menu
              </button>
              <button
                className="option-button"
                onClick={() => handleBackToStocksList(content)}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (selectedStockExchange !== undefined) {
      return (
        <div className="message-container-left">
          <span>
            <LiaRobotSolid />
          </span>
          <div>
            <StockMenu
              stockExchangeList={stockExchangeList}
              selectedStockExchange={selectedStockExchange}
              handleOnClick={handleSelectStock}
            />

            <div className="back-button-container">
              <button
                className="option-button back-button"
                onClick={() =>
                  handleBackToStockExchangeList(selectedStockExchange)
                }
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="message-container-left">
        <span>
          <LiaRobotSolid />
        </span>
        <StockExchangeMenu
          stockExchangeList={stockExchangeList}
          handleOnClick={handleSelectStockExchange}
        />
      </div>
    );
  }
);

export default CurrentQuestion;

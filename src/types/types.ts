export interface Stock {
  code: string;
  stockName: string;
  price: number;
}

export interface StockExchange {
  code: string;
  stockExchange: string;
  topStocks: Stock[];
}

export enum MessageType {
  Answer,
  Question,
}

export interface Message {
  id: number;
  type: MessageType;
  stockExchangeId?: number;
  text?: string;
}

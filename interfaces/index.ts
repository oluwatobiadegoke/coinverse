export interface Coin {
  id: string;
  name: string;
  symbol: string;
}

export type ReformedData = {
  key: string;
  id: string;
  symbol: string;
  rank: number;
  name: string;
  price: number | string;
  oneh_change: number;
  twentyfourh_change: number;
  seven_days_change: number;
  market_cap: number | string;
  volume: number | string;
};

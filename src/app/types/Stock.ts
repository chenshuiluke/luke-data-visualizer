export type MetaData = {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Interval": string;
  "5. Output Size": string;
  "6. Time Zone": string;
};

export type TimeSeriesData = {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
};

export type TimeSeriesKey =
  | "Time Series (1min)"
  | "Time Series (5min)"
  | "Time Series (15min)"
  | "Time Series (30min)"
  | "Time Series (60min)";

export type StockData = {
  "Meta Data": MetaData;
} & {
  [key in TimeSeriesKey]?: {
    [date: string]: TimeSeriesData;
  };
};

export type IntervalNumbers = 1 | 5 | 15 | 30 | 60;

export function isTimeSeriesKey(key: any): key is TimeSeriesKey {
  return [
    "Time Series (1min)",
    "Time Series (5min)",
    "Time Series (15min)",
    "Time Series (30min)",
    "Time Series (60min)",
  ].includes(key);
}

export function isIntervalNumber(num: any): num is IntervalNumbers {
  return [1, 5, 15, 30, 60].includes(num);
}

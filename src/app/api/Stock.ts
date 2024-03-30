import { IntervalNumbers, StockData, isTimeSeriesKey } from "../types/Stock";
import CandleStickData from "../types/CandleStickData";

export class StockApi {
  private readonly baseUrl = "https://www.alphavantage.co/query";
  private readonly apiKey = `${process.env.NEXT_PUBLIC_API_KEY}`;

  public static get FILTER_OPTIONS() {
    return {
      INTERVAL_MINUTES: [1, 5, 15, 30, 60],
    };
  }

  async getIntraday(interval: IntervalNumbers = 30) {
    const response = await fetch(
      `${this.baseUrl}?function=TIME_SERIES_INTRADAY&interval=${interval}min&symbol=IBM&apikey=${this.apiKey}`,
      {
        next: {
          revalidate: 86400,
        },
      }
    );

    const data = await (response.json() as Promise<StockData>);

    const key = `Time Series (${interval}min)`;
    const result: CandleStickData[] = [];

    if (isTimeSeriesKey(key)) {
      const timeSeries = data[key];
      if (timeSeries) {
        // Ensure timeSeries is defined
        for (const [date, value] of Object.entries(timeSeries)) {
          if (value) {
            // Check that value is not undefined
            result.push({
              date,
              open: parseFloat(value["1. open"]),
              high: parseFloat(value["2. high"]),
              low: parseFloat(value["3. low"]),
              close: parseFloat(value["4. close"]),
            });
          }
        }
      }
    }
    return result;
  }
}

const api = new StockApi();

export default api;

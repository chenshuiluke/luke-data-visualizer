import CandleStickData from "./CandleStickData";

export interface TooltipParams {
  currentItem: CandleStickData;
  xAccessor: (data: CandleStickData) => Date;
}

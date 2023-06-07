import {ChartOptions, ColorType, CrosshairMode, DeepPartial, LineStyle} from 'lightweight-charts';

import {priceLineColor} from '@/components/chart/const';


export const completedChartOptions: DeepPartial<ChartOptions> = {
  layout: {
    background: {
      type: ColorType.VerticalGradient,
      topColor: '#18181a',
      bottomColor: '#010102',
    },
    fontSize: 12,
    textColor: '#d5d5d5',
  },
  crosshair: {
    mode: CrosshairMode.Normal,
    horzLine: {
      labelBackgroundColor: 'rgb(60, 63, 77)',
    },
    vertLine: {
      labelBackgroundColor: 'rgb(60, 63, 77)',
    },
  },
  grid: {
    vertLines: {
      color: 'rgba(77, 77, 77, 0.38)',
      style: LineStyle.LargeDashed,
    },
    horzLines: {
      color: 'rgba(77, 77, 77, 0.38)',
      style: LineStyle.LargeDashed,
    },
  },
  localization: {
    dateFormat: 'yyyy-MM-dd',
  },
  timeScale: {
    timeVisible: true,
    rightOffset: 12,
  },
  handleScale: {
    axisDoubleClickReset: true,
  },
};

export const simplifiedChartOptions: DeepPartial<ChartOptions> = {
  layout: {
    background: {
      type: ColorType.Solid,
      color: '#00000082',
    },
  },
  crosshair: {
    vertLine: {
      color: priceLineColor,
      style: LineStyle.Dotted,
      visible: true,
      labelVisible: false,
    },
    horzLine: {
      visible: false,
    },
  },
  grid: {
    vertLines: {
      visible: false,
    },
    horzLines: {
      visible: false,
    },
  },
  timeScale: {
    visible: false,
    rightOffset: 12,
  },
  rightPriceScale: {
    visible: false,
  },
};

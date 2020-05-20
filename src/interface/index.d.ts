import { Noop } from "@babel/types";

export interface IEchartsReactCoreProps {
  theme: string
  echarts: any
  className: string
  style: object
  shouldSetOption(prevProps: IEchartsReactCoreProps, thisProps: IEchartsReactCoreProps): boolean
  onChartReady(echartDom: HTMLElement): Noop
  showLoading: boolean
  opts: echarts.EChartOption
  onEvents: function

  // @todo
  option: any
  notMerge: boolean
  lazyUpdate: boolean

  // @todo
  loadingOption: any
}

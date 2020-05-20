import { IEchartsReactCoreProps } from './interface'
import React from 'react';
import isEqual from 'fast-deep-equal';
import { bind, clear } from 'size-sensor';
import { pick } from './utils';


class EchartsReactCore extends React.Component<IEchartsReactCoreProps, {}> {

  echartsLib: any;
  echartsElement: HTMLDivElement | HTMLCanvasElement = null;

  constructor(props: IEchartsReactCoreProps) {
    super(props);
    this.echartsLib = props.echarts; // the echarts object.
  }

  // first add
  componentDidMount() {
    this.rerender();
  }

  // update
  componentDidUpdate(prevProps) {
    // 以下属性修改的时候，需要 dispose 之后再新建
    // 1. 切换 theme 的时候
    // 2. 修改 opts 的时候
    // 3. 修改 onEvents 的时候，这样可以取消所有之前绑定的事件 issue #151
    if (
      !isEqual(prevProps.theme, this.props.theme) ||
      !isEqual(prevProps.opts, this.props.opts) ||
      !isEqual(prevProps.onEvents, this.props.onEvents)
    ) {
      this.dispose();

      this.rerender(); // 重建
      return;
    }

    // 当这些属性保持不变的时候，不 setOption
    const pickKeys = ['option', 'notMerge', 'lazyUpdate', 'showLoading', 'loadingOption'];
    if (isEqual(pick(this.props, pickKeys), pick(prevProps, pickKeys))) {
      return;
    }

    // 判断是否需要 setOption，由开发者自己来确定。默认为 true
    if (typeof this.props.shouldSetOption === 'function' && !this.props.shouldSetOption(prevProps, this.props)) {
      return;
    }

    const echartObj = this.renderEchartDom();
    // 样式修改的时候，可能会导致大小变化，所以触发一下 resize
    if (!isEqual(prevProps.style, this.props.style) || !isEqual(prevProps.className, this.props.className)) {
      try {
        echartObj.resize();
      } catch (e) {
        console.warn(e);
      }
    }
  }

  // remove
  componentWillUnmount() {
    this.dispose();
  }

  // return the echart object
  getEchartsInstance = () => this.echartsLib.getInstanceByDom(this.echartsElement) ||
    this.echartsLib.init(this.echartsElement, this.props.theme, this.props.opts);

  // dispose echarts and clear size-sensor
  dispose = () => {
    if (this.echartsElement) {
      try {
        clear(this.echartsElement);
      } catch (e) {
        console.warn(e);
      }
      // dispose echarts instance
      this.echartsLib.dispose(this.echartsElement);
    }
  };

  rerender = () => {
    const { onEvents, onChartReady } = this.props;

    const echartObj = this.renderEchartDom();
    this.bindEvents(echartObj, onEvents || {});

    // on chart ready
    if (typeof onChartReady === 'function') this.props.onChartReady(echartObj);
    // on resize
    if (this.echartsElement) {
      bind(this.echartsElement, () => {
        try {
          echartObj.resize();
        } catch (e) {
          console.warn(e);
        }
      });
    }
  };

  // bind the events
  bindEvents = (instance, events) => {
    const _bindEvent = (eventName, func) => {
      // ignore the event config which not satisfy
      if (typeof eventName === 'string' && typeof func === 'function') {
        // binding event
        // instance.off(eventName); // 已经 dispose 在重建，所以无需 off 操作
        instance.on(eventName, (param) => {
          func(param, instance);
        });
      }
    };

    // loop and bind
    for (const eventName in events) {
      if (Object.prototype.hasOwnProperty.call(events, eventName)) {
        _bindEvent(eventName, events[eventName]);
      }
    }
  };

  // render the dom
  renderEchartDom = () => {
    // init the echart object
    const echartObj = this.getEchartsInstance();
    // set the echart option
    echartObj.setOption(this.props.option, this.props.notMerge || false, this.props.lazyUpdate || false);
    // set loading mask
    if (this.props.showLoading) echartObj.showLoading(this.props.loadingOption || null);
    else echartObj.hideLoading();

    return echartObj;
  };

  render() {
    const { style, className } = this.props;
    const newStyle = {
      height: 300,
      ...style,
    };
    // for render
    return (
      <div
        ref={(e) => { this.echartsElement = e; }}
        style={newStyle}
        className={`echarts-for-react ${className}`}
      />
    );
  }
}

export default EchartsReactCore
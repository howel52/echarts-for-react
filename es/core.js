import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

// @ts-nocheck
import React, { Component } from 'react';
import isEqual from 'fast-deep-equal';
import { bind, clear } from 'size-sensor';
import { pick } from './utils';

var EchartsReactCore = /*#__PURE__*/function (_Component) {
  _inherits(EchartsReactCore, _Component);

  var _super = _createSuper(EchartsReactCore);

  function EchartsReactCore(props) {
    var _this;

    _classCallCheck(this, EchartsReactCore);

    _this = _super.call(this, props);
    _this.echartsElement = null; // return the echart object

    _this.getEchartsInstance = function () {
      return _this.echartsLib.getInstanceByDom(_this.echartsElement) || _this.echartsLib.init(_this.echartsElement, _this.props.theme, _this.props.opts);
    }; // dispose echarts and clear size-sensor


    _this.dispose = function () {
      if (_this.echartsElement) {
        try {
          clear(_this.echartsElement);
        } catch (e) {
          console.warn(e);
        } // dispose echarts instance


        _this.echartsLib.dispose(_this.echartsElement);
      }
    };

    _this.rerender = function () {
      var _this$props = _this.props,
          onEvents = _this$props.onEvents,
          onChartReady = _this$props.onChartReady;

      var echartObj = _this.renderEchartDom();

      _this.bindEvents(echartObj, onEvents || {}); // on chart ready


      if (typeof onChartReady === 'function') _this.props.onChartReady(echartObj); // on resize

      if (_this.echartsElement) {
        bind(_this.echartsElement, function () {
          try {
            echartObj.resize();
          } catch (e) {
            console.warn(e);
          }
        });
      }
    }; // bind the events


    _this.bindEvents = function (instance, events) {
      var _bindEvent = function _bindEvent(eventName, func) {
        // ignore the event config which not satisfy
        if (typeof eventName === 'string' && typeof func === 'function') {
          // binding event
          // instance.off(eventName); // 已经 dispose 在重建，所以无需 off 操作
          instance.on(eventName, function (param) {
            func(param, instance);
          });
        }
      }; // loop and bind


      for (var eventName in events) {
        if (Object.prototype.hasOwnProperty.call(events, eventName)) {
          _bindEvent(eventName, events[eventName]);
        }
      }
    }; // render the dom


    _this.renderEchartDom = function () {
      // init the echart object
      var echartObj = _this.getEchartsInstance(); // set the echart option


      echartObj.setOption(_this.props.option, _this.props.notMerge || false, _this.props.lazyUpdate || false); // set loading mask

      if (_this.props.showLoading) echartObj.showLoading(_this.props.loadingOption || null);else echartObj.hideLoading();
      return echartObj;
    };

    _this.echartsLib = props.echarts; // the echarts object.

    return _this;
  } // first add


  _createClass(EchartsReactCore, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.rerender();
    } // update

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // 以下属性修改的时候，需要 dispose 之后再新建
      // 1. 切换 theme 的时候
      // 2. 修改 opts 的时候
      // 3. 修改 onEvents 的时候，这样可以取消所有之前绑定的事件 issue #151
      if (!isEqual(prevProps.theme, this.props.theme) || !isEqual(prevProps.opts, this.props.opts) || !isEqual(prevProps.onEvents, this.props.onEvents)) {
        this.dispose();
        this.rerender(); // 重建

        return;
      } // 当这些属性保持不变的时候，不 setOption


      var pickKeys = ['option', 'notMerge', 'lazyUpdate', 'showLoading', 'loadingOption'];

      if (isEqual(pick(this.props, pickKeys), pick(prevProps, pickKeys))) {
        return;
      } // 判断是否需要 setOption，由开发者自己来确定。默认为 true


      if (typeof this.props.shouldSetOption === 'function' && !this.props.shouldSetOption(prevProps, this.props)) {
        return;
      }

      var echartObj = this.renderEchartDom(); // 样式修改的时候，可能会导致大小变化，所以触发一下 resize

      if (!isEqual(prevProps.style, this.props.style) || !isEqual(prevProps.className, this.props.className)) {
        try {
          echartObj.resize();
        } catch (e) {
          console.warn(e);
        }
      }
    } // remove

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.dispose();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          style = _this$props2.style,
          className = _this$props2.className;
      var newStyle = Object.assign({
        height: 300
      }, style); // for render

      return React.createElement("div", {
        ref: function ref(e) {
          _this2.echartsElement = e;
        },
        style: newStyle,
        className: "echarts-for-react ".concat(className)
      });
    }
  }]);

  return EchartsReactCore;
}(Component);

export default EchartsReactCore;
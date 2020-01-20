import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

//@ts-nocheck
import echarts from 'echarts';
import EchartsReactCore from './core'; // export the Component the echarts Object.

var EchartsReact = /*#__PURE__*/function (_EchartsReactCore) {
  _inherits(EchartsReact, _EchartsReactCore);

  var _super = _createSuper(EchartsReact);

  function EchartsReact(props) {
    var _this;

    _classCallCheck(this, EchartsReact);

    _this = _super.call(this, props);
    _this.echartsLib = echarts;
    return _this;
  }

  return EchartsReact;
}(EchartsReactCore);

export { EchartsReact as default };
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _echarts = _interopRequireDefault(require("echarts"));

var _core = _interopRequireDefault(require("./core"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

// export the Component the echarts Object.
var EchartsReact = /*#__PURE__*/function (_EchartsReactCore) {
  (0, _inherits2.default)(EchartsReact, _EchartsReactCore);

  var _super = _createSuper(EchartsReact);

  function EchartsReact(props) {
    var _this;

    (0, _classCallCheck2.default)(this, EchartsReact);
    _this = _super.call(this, props);
    _this.echartsLib = _echarts.default;
    return _this;
  }

  return EchartsReact;
}(_core.default);

exports.default = EchartsReact;
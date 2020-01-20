"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pick = void 0;

var pick = function pick(obj, keys) {
  var r = {};
  keys.forEach(function (key) {
    r[key] = obj[key];
  });
  return r;
};

exports.pick = pick;
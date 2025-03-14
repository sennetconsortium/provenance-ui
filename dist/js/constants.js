"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEdge = exports.SELECTOR_ID = exports.SELECTORS = exports.CLASS_NAMES = void 0;
const SELECTOR_ID = exports.SELECTOR_ID = 'provenanceTree';
const isEdge = $el => {
  return $el.data('node') === 'Edge';
};
exports.isEdge = isEdge;
const CLASS_NAMES = exports.CLASS_NAMES = {
  disabled: 'is-disabled',
  hover: 'has-hover',
  toggled: 'has-toggled'
};
const SELECTORS = exports.SELECTORS = {
  legend: {
    legendItem: '.js-legend__item',
    legendTrigger: '.js-legend--trigger'
  }
};
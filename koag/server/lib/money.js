'use strict'

const accounting = require('accounting')

// http://openexchangerates.github.io/accounting.js/
exports.accounting = accounting

/*
// Standard usage and parameters (returns number):
accounting.unformat(string, [decimal])

// Example usage:
accounting.unformat("GBP £ 12,345,678.90"); // 12345678.9

// If a non-standard decimal separator was used (eg. a comma) unformat() will need it in order to work out
// which part of the number is a decimal/float:
accounting.unformat("€ 1.000.000,00", ",") // 1000000
*/
exports.unformat = accounting.unformat

exports.toFixed = accounting.toFixed

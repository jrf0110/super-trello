/**
 * Super Trello
 */

console.log('Hello, from Super Trello!');

var trello = require('./lib/trello')();

require('./extensions/card-switcher')(trello);
require('./extensions/list-switcher')(trello);
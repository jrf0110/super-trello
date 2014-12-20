/**
 * List Switcher
 * Description:
 *   Use the arrow keys (left/right) to switch lists while
 *   a card is open (goes to the first card in the list)
 */

var utils   = require('../lib/utils');
var trello  = require('../lib/trello');

module.exports.keys = ['left', 'right'];

var left = ['left'];
var right = ['right'];

module.exports.onKey = function( key ){
  if ( !trello.cardIsOpen() ) return;

  if ( left.indexOf( key ) > -1 ){
    window.scrollTo( 0, 0 );
    trello.prevList();
  } else {
    window.scrollTo( 0, 0 );
    trello.nextList();
  }
};

module.exports.keys.forEach( function( key ){
  utils.key( key, module.exports.onKey.bind( null, key ) );
});
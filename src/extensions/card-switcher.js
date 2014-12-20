/**
 * Card Switcher
 * Description:
 *   Use the arrow keys (up/down) to go through cards in a list
 */

var utils   = require('../lib/utils');
var trello  = require('../lib/trello');

module.exports.keys = ['w', 's', 'up', 'down'];

var up = ['up'];
var down = ['down'];

module.exports.onKey = function( key ){
  if ( !trello.cardIsOpen() ) return;

  if ( up.indexOf( key ) > -1 ){
    window.scrollTo( 0, 0 );
    trello.prevCard();
  } else {
    window.scrollTo( 0, 0 );
    trello.nextCard();
  }
};

module.exports.keys.forEach( function( key ){
  utils.key( key, module.exports.onKey.bind( null, key ) );
});
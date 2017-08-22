/**
 * List Switcher
 * Description:
 *   Use the arrow keys (left/right) to switch lists while
 *   a card is open (goes to the first card in the list)
 */

var utils = require('../lib/utils');

module.exports = function(trello, options) {
  options = Object.assign({}, options, {
    left: ['shift+left'],
    right: ['shift+right'],
    keys: ['shift+left', 'shift+right'],
  });

  var keybinder = new utils.Keybinder(trello.$body[0]);

  function onKey( key ){
    if ( !trello.cardIsOpen() ) return;

    if ( options.left.indexOf( key ) > -1 ){
      window.scrollTo( 0, 0 );
      trello.prevList();
    } else {
      window.scrollTo( 0, 0 );
      trello.nextList();
    }
  }

  options.keys.forEach( function( key ){
    keybinder.bind( key, onKey.bind( null, key ) );
  });
};
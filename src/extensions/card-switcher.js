/**
 * Card Switcher
 * Description:
 *   Use the arrow keys (up/down) to go through cards in a list
 */

var utils = require('../lib/utils');

module.exports = function(trello, options) {
  options = Object.assign({}, options, {
    up: ['shift+up'],
    down: ['shift+down'],
    keys: ['shift+up', 'shift+down'],
  });

  var keybinder = new utils.Keybinder(trello.$body[0]);

  function onKey( key ){
    if ( !trello.cardIsOpen() ) return;

    if ( options.up.indexOf( key ) > -1 ){
      window.scrollTo( 0, 0 );
      trello.prevCard();
    } else {
      window.scrollTo( 0, 0 );
      trello.nextCard();
    }
  }

  options.keys.forEach( function( key ){
    keybinder.bind( key, onKey.bind( null, key ) );
  });
};
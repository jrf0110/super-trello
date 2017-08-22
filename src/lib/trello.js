/**
 * Trello
 * Captures current trello state and stuff
 */

var utils = require('./utils');

module.exports = function(options) {
  return Object.create({
    $body: utils.dom( document.body )

  , init: function(options){
      this.options = options;
      this.initLists();
      return this;
    }

  , initLists: function(){
      var this_ = this;

      this.$lists = utils.dom('.list');
      this.lists = [];

      this.$lists.each( function(){
        var $list = utils.dom(this);
        this_.lists.push( this_.getListModelFromDomNode( $list ) );
      });
    }

  , nextList: function(){
      if ( !this.cardIsOpen() ) return this;
      
      var $next = this.openCard.list.$el.next(':not(.js-add-list)');

      if ($next.length) {
        $next.find('.list-cards > :first-child')[0].click();
      }

      return this;
    }

  , prevList: function(){
      if ( !this.cardIsOpen() ) return this;
      
      var $prev = this.openCard.list.$el.prev();

      if ($prev.length) {
        $prev.find('.list-cards > :first-child')[0].click();
      }

      return this;
    }

  , prevCard: function(){
      if ( !this.cardIsOpen() ) return this;
      // console.log('prevcard');

      // Don't try and go to the next if we're already at the end of the list
      if ( this.openCard.index === 0 ) return;

      var $prev = this.openCard.$inList.prev();
      // console.log('going to ', $prev.attr('href'), $prev );
      if ($prev.length) $prev[0].click();
    }

  , nextCard: function(){
      if ( !this.cardIsOpen() ) return this;
      // console.log('nextcard');

      // Don't try and go to the next if we're already at the end of the list
      if ( this.openCard.index === this.openCard.list.length -1 ) return;

      var $next = this.openCard.$inList.next();
      // console.log('going to ', $next.attr('href'), $next );
      if ($next.length) $next[0].click();
    }

  , getListModelFromDomNode: function( $list ){
      return {
        $el:      $list
      , name:     $list.find('.js-list-name').text()
      , length:  +$list.find('.js-num-cards').text().replace( ' cards', '' )
      };
    }

  , getCardModelFromDomNode: function( $card ){
      var urlStuff    = this.parseUrl();
      var $cardInList = this.getCardInListEl( urlStuff.cardId );

      return {
        $el:        $card
      , $inList:    $cardInList
      , index:      $cardInList.prevAll().length
      , name:       $card.find('.js-card-title').text()
      , id:         urlStuff.cardId
      , url:        urlStuff.cardUrl
      , list:       this.getListModelFromDomNode( $cardInList.parents('.list-wrapper').eq(0) )
      };
    }

  , get openCard (){
      if ( !this.cardIsOpen() ){
        throw new Error('There is no open card');
      }

      return this.getCardModelFromDomNode( this.getOpenCardEl() );
    }

  , getCardInListEl: function( id ){
      return utils.dom( '[href="/c/{id}"]'.replace( '{id}', id ) );
    }

  , getOpenCardEl: function(){
      return this.$body.find('.window').eq(0);
    }

  , cardIsOpen: function( id ){
      if ( !id ){
        return this.parseUrl().cardOpen;
      }
    }

  , parseUrl: function(){
      var pathname = window.location.pathname;
      var parts = pathname.split('/');
      
      var result = {
        cardOpen: parts[1] === 'c'
      };

      if ( result.cardOpen ){
        result.cardId = parts.slice(2).join('/');
        result.cardUrl = pathname;
      }

      return result;
    }
  }).init(options);
};
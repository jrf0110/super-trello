/**
 * Trello
 * Captures current trello state and stuff
 */

var utils = require('./utils');

module.exports = Object.create({
  $body: utils.dom( document.body )

, init: function(){
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
    
    var $next = this.openCard.list.$el.next();
    $next.find('.list-cards > :first-child').click();

    return this;
  }

, prevList: function(){
    if ( !this.cardIsOpen() ) return this;
    
    var $prev = this.openCard.list.$el.prev();
    $prev.find('.list-cards > :first-child').click();

    return this;
  }

, prevCard: function(){
    if ( !this.cardIsOpen() ) return this;
    console.log('prevcard');

    // Don't try and go to the next if we're already at the end of the list
    if ( this.openCard.index === 0 ) return;

    var $prev = this.openCard.$inList.prev();
    console.log('going to ', $prev.find('a').attr('href'), $prev );
    $prev.click();
  }

, nextCard: function(){
    if ( !this.cardIsOpen() ) return this;
    console.log('nextcard');

    // Don't try and go to the next if we're already at the end of the list
    if ( this.openCard.index === this.openCard.list.length -1 ) return;

    var $next = this.openCard.$inList.next();
    console.log('going to ', $next.find('a').attr('href'), $next );
    $next.click();
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
    , list:       this.getListModelFromDomNode( $cardInList.parents('.list').eq(0) )
    };
  }

, get openCard (){
    if ( !this.cardIsOpen() ){
      throw new Error('There is no open card');
    }

    return this.getCardModelFromDomNode( this.getOpenCardEl() );
  }

, getCardInListEl: function( id ){
    return utils.dom( '[href="/c/{id}"]'.replace( '{id}', id ) )
      .parents('.list-card').eq(0);
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
}).init();
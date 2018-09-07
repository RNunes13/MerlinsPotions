$(selectors.navbar.item).on('click', e => {

  // Execute slideToggle() mobile only
  if ( $(selectors.navbar.self).hasClass('is--active') ) {

    if ( !$(e.currentTarget).is($(selectors.navbar.itemActive)) ) {
      $(selectors.navbar.itemActive).toggleClass('is--active').find('> ul').slideToggle();
    }

    $(e.currentTarget).toggleClass('is--active').find('> ul').slideToggle();

  }

})
$(selectors.header.menu).on('click', e => {
  
  $(e.currentTarget).toggleClass('js--menu-opened');
  $(selectors.header.navbar).toggleClass('is--active');
  $(selectors.header.search).toggleClass('is--active');
  $(selectors.header.logo).toggleClass('x-hidden');
  $(selectors.header.cart).toggleClass('x-hidden');

});
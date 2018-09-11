
import CacheSelectors from './__cache-selectors';

const El = CacheSelectors.navbar;
const Methods = {
  init() {
    Methods.openSubmenu();
  },

  openSubmenu() {
    El.item.on('click', (e) => {
      let itemActive = $('.js--navbar li.has--drop.is--active');

      if (El.self.hasClass('is--active')) {
        if (!$(e.currentTarget).is(itemActive)) {
          itemActive.toggleClass('is--active').find('> ul').slideToggle();
        }
        $(e.currentTarget).toggleClass('is--active').find('> ul').slideToggle();
      }
    });
  },
};

export default {
  init: Methods.init,
};

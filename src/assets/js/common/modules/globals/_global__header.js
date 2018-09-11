
import CacheSelectors from './__cache-selectors';

const El = CacheSelectors.header;
const Methods = {
    init() {
        Methods.openMenu();
    },

    openMenu() {
      El.menu.on('click', (e) => {
        $(e.currentTarget).toggleClass('js--menu-opened');
        El.navbar.toggleClass('is--active');
        El.search.toggleClass('is--active');
        El.logo.toggleClass('x-hidden');
        El.cart.toggleClass('x-hidden');
      });
    },
};

export default {
  init: Methods.init,
};

import GlobalsHeader from './_global__header.js';
import GlobalsNavbar from './_global__navbar.js';

const init = () => {
  setTimeout(() => {
      GlobalsHeader.init();
      GlobalsNavbar.init();
  }, 100);
};

export default {
  init: init,
};

import HomeMain from './_home__main.js';

const init = () => {
  setTimeout(() => {
    HomeMain.init();
  }, 100);
};

export default {
  init: init,
};

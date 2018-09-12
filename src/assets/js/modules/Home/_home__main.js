import CacheSelectors from './__cache-selectors';
import Firebase from '../../common/util/firebase.js';
import Services from '../../common/util/services.js';

const El = CacheSelectors.header;
const Methods = {
  init() {
    Methods.initFirebase();
    Methods.getPotions();
  },

  loading(loaded = false) {
    if (!loaded) {
      $(El.loading).removeClass('is--hidden');
    } else {
      $(El.loading).addClass('is--hidden');
      $(El.grid).removeClass('is--empty');
    }
  },

  initFirebase() {
    console.log('Initializing Firebase');
    Firebase.init({
      apiKey: 'AIzaSyDG-Scc3SR21j75DF3d2jWyYmv09GdZTuQ',
      authDomain: 'merlins-potions.firebaseapp.com',
      projectId: 'merlins-potions',
    });
  },

  getPotions() {
    console.log('Getting potions ...');
    this.loading();
    Firebase.get('potions')
    .then((resp) => {
      console.log('Potions received.');
      this.loadPotion(resp);
    }, (err) => {
      this.loading(true);
      console.error('There was an error getting the potions');
    });
  },

  loadPotion(aData) {
    aData.forEach((potion) => {
      let ePotion = Services.createElement('div', [{class: 'x-potion'}], El.grid);

      let eFigure = Services.createElement('figure', [{class: 'x-potion__image'}], ePotion);

      Services.createElement('img', [
        {src: 'assets/img/products/' + potion.image},
        {alt: potion.name}], eFigure);

      let eDescr = Services.createElement('div', [{class: 'x-potion__description'}], ePotion);

      Services.createElement('span', [{class: 'x-potion__description-name'}], eDescr, `${potion.name} - `);
      Services.createElement('span', [{class: 'x-potion__description-price'}], eDescr, `$${potion.price}`);
      Services.createElement('button', [{class: 'x-potion__details'}], ePotion, 'More details', {click: ()=> {
        Methods.clickEvent(potion);
      }});
    });

    this.loading(true);
  },

  clickEvent(potion) {
    console.log(potion);
  },
};

export default {
  init: Methods.init,
};

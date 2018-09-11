import CacheSelectors from './__cache-selectors';
import Firebase from '../../common/util/firebase.js';
import Services from '../../common/util/services.js';

const El = CacheSelectors.header;
const Methods = {
  init() {
    Methods.initFirebase();
    Methods.getPotions();
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
    Firebase.get('potions')
    .then((resp) => {
      this.loadPotion(resp);
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
    });
  },
};

export default {
  init: Methods.init,
};

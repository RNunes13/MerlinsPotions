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

  loading(loaded = false, images = false) {
    if (!loaded) {
      $(El.loading.potions).removeClass('is--hidden');
    } else {
      $(El.loading.potions).addClass('is--hidden');
      $(El.grid).removeClass('is--empty');
    }
  },

  loadingImages(loaded = false) {
    if (!loaded) {
      $(El.loading.image).removeClass('is--hidden');
    } else {
      $(El.loading.image).addClass('is--hidden');
      $('.x-potion__image-data').removeClass('is--hidden');
    }
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

  getImages() {
    console.log('Getting pictures of potions ...');
    El.loading.image = $('.js--potion-image .loading-image');
    this.loadingImages();
    Firebase.get('potions-images')
      .then((resp) => {
        console.log('Pictures received.');
        this.loadImages(resp);
      }, (err) => {
        this.loadingImages(true);
        console.error('There was an error getting the pictures of potions');
      });
  },

  loadPotion(aData) {
    aData.forEach((potion) => {
      let ePotion = Services.createElement('div', [
        {class: 'x-potion'}, {'data-potion-id': potion.id},
      ], El.grid);

      Services.createElement('div', [{class: 'x-potion__wishlist'}], ePotion);

      let eFigure = Services.createElement('figure', [{
        class: 'x-potion__image js--potion-image'}], ePotion);

      Services.createElement('img', [
        {src: 'assets/img/loading-potions.svg'}, {class: 'loading-image is--hidden'}], eFigure);

      Services.createElement('img', [{class: 'x-potion__image-data is--hidden'}], eFigure);

      Services.createElement('span', [{class: 'x-potion__name'}], ePotion, potion.name);

      let ePrice =Services.createElement('div', [{class: 'x-potion__price'}], ePotion);

      Services.createElement('span', [{class: 'x-potion__price-value'}], ePrice, `$${potion.price}`);
      Services.createElement('button', [{class: 'x-potion__price-buy'}], ePrice, 'Buy', {click: () => {
          Methods.clickEvent(potion);
       },
      });
    });

    this.loading(true);
    this.getImages();
  },

  loadImages(aImages) {
    console.log('Inserting the pictures ...');

    $('.js--home-grid .x-potion').each(function(x) {
      let potionId = Number($(this).attr('data-potion-id'));
      aImages.forEach((image) => {
        if (image.id === potionId) {
          $(this).find('.x-potion__image-data').attr('src', image.image);
        }
      });
    });
    this.loadingImages(true);
    console.log('Pictures inserted.');
  },

  clickEvent(potion) {
    console.log(potion);
  },
};

export default {
  init: Methods.init,
};

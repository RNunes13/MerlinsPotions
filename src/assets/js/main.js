(function() {
  'use strict';
  let firebase = new Firebase();
  let services = new Services();

  firebase.init({
    apiKey: "AIzaSyDG-Scc3SR21j75DF3d2jWyYmv09GdZTuQ",
    authDomain: "merlins-potions.firebaseapp.com",
    projectId: "merlins-potions",
  })

  firebase.get('potions')
  .then(docs => {
    //load(docs);
  })

})();
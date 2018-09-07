'use strict';
function Firebase() {

  let instance = new Object();

  function required(param) {
    throw new Error(`Parameter ${param} is required.`);
  }

  this.init = (config = required('config')) => {
    try {

      firebase.initializeApp(config);
      instance.database = firebase.firestore();
      instance.database.settings({timestampsInSnapshots: true});
      return true;

    } catch (error) {
      throw new Error(`Error -> ${error}`);
    }
  }

  this.get = (collection = required('collection')) => {

    if (!instance.database) throw new Error('Database not initialized. Use the init method to initialize it')

    // Returning a promise
    return new Promise(resolve => {
      instance.database.collection(collection).get()
      .then(querySnapshot => {
        let docs = new Array();        
        querySnapshot.forEach( doc => { docs.push(doc.data()) });
        resolve(docs);
      })
    })
  }
}
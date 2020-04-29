import * as firebase from 'firebase';

const getStructuredData = (order, querySnapshot) => {
  const structuredData = [];
  order.forEach(itemId => {
    const item = querySnapshot.docs.find(itm => (itm.id === itemId)).data();
    if (item.published === 'Publish') {
      const structuredItem = Object.assign({}, { id: itemId }, item);
      structuredData.push(structuredItem);
    }
  });
  return structuredData;
};

const getCollection = async (collectionId, cb) => {
  const ref = firebase.firestore().collection('collections').doc(collectionId);
  const collection = await ref.get();
  const order = collection.data().order.split(' | ');
  const items = await ref.collection('data').get();
  return getStructuredData(order, items);
};

const subscribeToCollection = async (collectionId, cb) => {
  let order = [];
  let querySnapshot = [];
  const ref = firebase.firestore().collection('collections').doc(collectionId);

  ref.onSnapshot(doc => {
    order = doc.data().order.split(' | ');
    if (querySnapshot.length) {
      cb(getStructuredData(order, querySnapshot));
    }
  });

  ref.collection('data').onSnapshot(_querySnapshot => {
    querySnapshot = _querySnapshot;
    if (order.length) {
      cb(getStructuredData(order, querySnapshot));
    }
  });
};

const init = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'AIzaSyCVoJ1fNik-brXSirPwXfzEzpK4HDJyIdE',
      authDomain: 'reactor-dam.firebaseapp.com',
      databaseURL: 'https://reactor-dam.firebaseio.com',
      projectId: 'reactor-dam',
      storageBucket: 'reactor-dam.appspot.com',
      messagingSenderId: '198256799515'
    });
  }
};

export default {
  init,
  getCollection,
  subscribeToCollection
};

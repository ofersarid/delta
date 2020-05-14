import firebase from 'firebase/app';
import 'firebase/firestore';

function preloadImage(url) {
  const img = new Image();
  img.src = url;
}

const getStructuredData = (order, querySnapshot, preLoad = []) => {
  const structuredData = [];
  order.forEach(itemId => {
    const item = querySnapshot.docs.find(itm => (itm.id === itemId)).data();
    if (item.published === 'Publish') {
      preLoad.forEach(key => {
        preloadImage(item[key]);
      });
      const structuredItem = Object.assign({}, { id: itemId }, item);
      structuredData.push(structuredItem);
    }
  });
  return structuredData;
};

const getCollection = async (collectionId, cb, options = {
  preLoad: []
}) => {
  const ref = firebase.firestore().collection('collections').doc(collectionId);
  const collection = await ref.get();
  const order = collection.data().order.split(' | ');
  const items = await ref.collection('data').get();
  return getStructuredData(order, items, options.preLoad);
};

const getPage = async (pageId, cb) => {
  const ref = firebase.firestore().collection('pages').doc(pageId);
  const page = await ref.get();
  return page.data().data;
};

const subscribeToCollection = async (collectionId, cb, options = {
  preLoad: []
}) => {
  let order = [];
  let querySnapshot = [];
  const ref = firebase.firestore().collection('collections').doc(collectionId);

  ref.onSnapshot(doc => {
    order = doc.data().order.split(' | ');
    if (querySnapshot.length) {
      cb(getStructuredData(order, querySnapshot, options.preLoad));
    }
  });

  ref.collection('data').onSnapshot(_querySnapshot => {
    querySnapshot = _querySnapshot;
    if (order.length) {
      cb(getStructuredData(order, querySnapshot, options.preLoad));
    }
  });
};

const subscribeToPage = async (pageId, cb) => {
  const ref = firebase.firestore().collection('pages').doc(pageId);

  ref.onSnapshot(doc => {
    cb(doc.data().data);
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
  getPage,
  subscribeToCollection,
  subscribeToPage
};

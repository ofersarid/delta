import * as firebase from 'firebase';

export const getCollection = async (collectionId, cb) => {
  const structuredData = [];
  const ref = firebase.firestore().collection('collections').doc(collectionId);
  const collection = await ref.get();
  const order = collection.data().order.split(' | ');
  const items = await ref.collection('data').get();
  order.forEach(itemId => {
    const item = items.docs.find(itm => (itm.id === itemId)).data();
    if (item.published === 'Publish') {
      const structuredItem = Object.assign({}, { id: itemId }, item);
      structuredData.push(structuredItem);
    }
  });

  return structuredData;
};

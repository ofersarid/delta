import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import reactor from 'reactor-connect';

const Index = () => {
  const data = useSelector(state => reactor.selectors.collection(state, 'my collection'));
  console.log(data);
  return (
    <Fragment >
      <h1 >Hello World!</h1 >
      <ul >
        {data.map(itm => (
          <li key={itm.id} >{itm['my-key']}</li >
        ))}
      </ul >
    </Fragment >
  );
};

export default Index;

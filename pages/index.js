import React, { Fragment } from 'react';
// import { useSelector } from 'react-redux';
// import reactor from 'reactor-connect';
import { Hero, Mo, Crew, Tools } from '../containers';

const Index = () => {
  // const data = useSelector(state => reactor.selectors.collection(state, 'my collection'));
  return (
    <Fragment >
      <Hero />
      <Mo />
      <Crew />
      <Tools />
    </Fragment >
  );
};

export default Index;

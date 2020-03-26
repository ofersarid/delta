import React, { Fragment } from 'react';
// import { useSelector } from 'react-redux';
// import reactor from 'reactor-connect';
import { Hero, Tools, Crew } from '../containers';

const Index = () => {
  // const data = useSelector(state => reactor.selectors.collection(state, 'my collection'));
  return (
    <Fragment >
      <Hero />
      <Tools />
      <Crew />
    </Fragment >
  );
};

export default Index;

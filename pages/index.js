import React, { Fragment } from 'react';
// import { useSelector } from 'react-redux';
// import reactor from 'reactor-connect';
import { Hero, Mo, Crew, Tools, Products, Contact } from '../containers';
import styles from './styles.scss';

const Index = () => {
  // const data = useSelector(state => reactor.selectors.collection(state, 'my collection'));
  return (
    <Fragment >
      <img className={styles.divider180} src="/images/180-divider.svg" />
      <Hero />
      <Mo />
      <img className={styles.divider180} src="/images/180-divider.svg" />
      <Crew />
      <Tools />
      <img className={styles.divider180} src="/images/180-divider.svg" />
      <Products />
      <Contact />
      <img className={styles.divider180} src="/images/180-divider.svg" />
    </Fragment >
  );
};

export default Index;

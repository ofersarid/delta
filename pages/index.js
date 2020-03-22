import React, { Fragment } from 'react';
// import { useSelector } from 'react-redux';
// import reactor from 'reactor-connect';
import styles from './styles.scss';

const Index = () => {
  // const data = useSelector(state => reactor.selectors.collection(state, 'my collection'));
  return (
    <Fragment >
      <section className={styles.hero} >
        <div className={styles.left} >
          <h1 >How about hiring the entire front team from the start?</h1 >
          <p >
            Hiring Senior FEDs/PMs/Designers is not an easy task, let alone forging them into an effective &#34;delta
            force&#34;.<br />
            _Delta is A team of senior-level individuals who love working together and are ready to get you to your next
            milestone fast and strong
          </p >
        </div >
        <div className={styles.right}>
          <ul className={styles.stack}>
            <li />
            <li />
            <li />
          </ul>
        </div>
      </section >
    </Fragment >
  );
};

export default Index;

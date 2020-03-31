import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './styles.scss';

class Hero extends PureComponent {
  render() {
    return (
      <section className={styles.hero} >
        <div className={styles.left} >
          <h1 >Hire an elite front team on-demand</h1 >
          <img src="/images/hero-art.svg" />
          <p >
            Hiring Senior FEDs/PMs/Designers is not an easy task, let alone forging them into an effective &#34;delta
            force&#34;.<br />
            _Delta is A team of senior-level individuals who love working together and are ready to get you to your next
            milestone fast and strong.
          </p >
        </div >
        <div className={styles.right} >
          <img src="/images/hero-art.svg" />
        </div >
      </section >
    );
  }
}

Hero.propTypes = {}; // eslint-disable-line

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Hero);

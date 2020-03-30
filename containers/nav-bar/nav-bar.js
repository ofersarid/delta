import React, { Fragment, PureComponent } from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import Link from 'next/link';
import styles from './styles.scss';

/*
 * read about links in next.js:
 * https://nextjs.org/docs/routing/introduction
 * */

class NavBar extends PureComponent {
  // scrollToTop() {
  //   document.getElementsByTagName('body').item(0).scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'start'
  //   });
  // }

  scrollToContact() {
    document.getElementById('contactSection').item(0).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  render() {
    return (
      <Fragment >
        <div className={cx(styles.navBar)} >
          <div className={styles.logo} >_DELTA</div >
          <button className={styles.contact} onClick={this.scrollToContact} >Contact</button >
        </div >
      </Fragment >
    );
  }
}

NavBar.propTypes = {};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(NavBar);

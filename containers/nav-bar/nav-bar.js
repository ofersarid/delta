import React from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Link from 'next/link';
import styles from './styles.scss';
/*
 * read about links in next.js:
 * https://nextjs.org/docs/routing/introduction
 * */

const NavBar = () => (
  <div className={cx(styles.navBar)} >
    <ul >
      <li >
        <Link href="/" >
          <a >Home</a >
        </Link >
      </li >
      <li >
        <Link href="/contact-us" >
          <a >Contact</a >
        </Link >
      </li >
    </ul >
  </div >
);

NavBar.propTypes = {};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(NavBar);

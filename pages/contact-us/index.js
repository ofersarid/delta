import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'next/router';
import { Helmet } from '../../shared';
import styles from './styles.scss';

const ContactPage = ({ router, isServer }) => { // eslint-disable-line
  return <Fragment>
    <Helmet title="contact-us" />
    <h1 className={styles.header}>Contact Us</h1 >
  </Fragment>;
};

export default compose(withRouter, connect())(ContactPage);

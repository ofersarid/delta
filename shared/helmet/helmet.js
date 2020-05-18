import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Head from 'next/head';
import PropTypes from 'prop-types';

const Helmet = ({ title = 'Delta | Hire an elite front team on-demand', description = 'When you need to get to your next business milestone quickly, hiring Senior Developers, PMs & Designers is not an simple operation. Delta is an experienced team of advanced technologists who love working together - and we are ready to drive your projects forward.', imageForSocial }) => (
  <Head >
    <meta charSet="utf-8" />
    <link rel="icon" href={`/images/favicon.ico?v=${new Date().getTime()}`} />
    <title >{title}</title >
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={imageForSocial} />
    <meta property="og:url" content="https://delta.band" />
    <meta name="description" content={description} />
    <meta
      name='viewport'
      content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
    />
    <meta httpEquiv="ScreenOrientation" content="autoRotate:disabled" />
  </Head >
);

Helmet.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};

Helmet.defaultProps = {
  title: 'Mt Title',
  description: 'My Description'
};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Helmet);

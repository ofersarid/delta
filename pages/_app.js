import React from 'react';
import { applyMiddleware, createStore, compose } from 'redux';
import LinkedInTag from 'react-linkedin-insight';
import { connect, Provider } from 'react-redux';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import { fromJS } from 'immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
// import reactor from 'reactor-connect';
import * as firebase from 'firebase';
import combined from '../combined-reducers';
import { device, GA, coupon } from '../services';
import { Helmet } from '../shared';
import { NavBar, SectionIndicator, Coupon } from '../containers';
import styles from './styles.scss';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyCVoJ1fNik-brXSirPwXfzEzpK4HDJyIdE',
    authDomain: 'reactor-dam.firebaseapp.com',
    databaseURL: 'https://reactor-dam.firebaseio.com',
    projectId: 'reactor-dam',
    storageBucket: 'reactor-dam.appspot.com',
    messagingSenderId: '198256799515'
  });
}

const makeStore = (initialState, options) => {
  const store = createStore(combined, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
  return store;
};

class MyApp extends App {
  static async getInitialProps({ ctx }) {
    await ctx.store.dispatch(coupon.actions.getCoupons());
    if (ctx.req) {
      // mimic device on server
      ctx.store.dispatch(device.actions.ssr(ctx.req.headers['user-agent']));
    }
    return {};
  }

  componentDidMount() {
    GA.init();
    GA.logPageView();
    GA.viewedPage();
    this.linkedInTracker();
  }

  linkedInTracker() {
    const partnerId = '2075473';
    const conversionId = '2075473';
    LinkedInTag.init(partnerId);
    LinkedInTag.track(conversionId);
  }

  render() {
    const { Component, pageProps, store, isServer } = this.props;
    return (
      <Provider store={store} >
        <Helmet title="Delta | Hire an elite front team on-demand" description="When you need to get to your next business milestone quickly, hiring Senior Developers, PMs & Designers is not an simple operation.
        Delta is an experienced team of advanced technologists who love working together - and we are ready to drive
        your projects forward." imageForSocial="/images/delta-logo-social-square.png" />
        <div className={styles.app} >
          <NavBar />
          <Component {...pageProps} isServer={isServer} />
          <SectionIndicator />
          <Coupon />
        </div >
      </Provider >
    );
  }
}

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  withRedux(makeStore, {
    serializeState: state => state.toJS(),
    deserializeState: state => fromJS(state)
  }),
  connect(mapStateToProps, mapDispatchToProps),
  device.HOC
)(MyApp);

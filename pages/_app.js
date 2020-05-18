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
import combined from '../combined-reducers';
import { device, GA, coupon, home, crew } from '../services';
import { Helmet } from '../shared';
import { NavBar, SectionIndicator, Coupon } from '../containers';
import reactor from '../reator-utils';
import styles from './styles.scss';

reactor.init();

const makeStore = (initialState, options) => {
  const store = createStore(combined, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
  return store;
};

class MyApp extends App {
  static async getInitialProps({ ctx }) {
    try {
      const couponsData = await reactor.getCollection('oDTLBA1YbbmT6kchgGEc');
      const homePageData = await reactor.getPage('Wm27z1OYTccUlUlkSMBS');
      const crewData = await reactor.getCollection('wwA1VyCIcWOIJnpZhaR4', { preLoad: ['pic', 'picMobile', 'icon'] });
      ctx.store.dispatch(coupon.actions.setCoupons(couponsData));
      ctx.store.dispatch(home.actions.update(homePageData));
      ctx.store.dispatch(crew.actions.update(crewData));
      if (ctx.req) {
        // mimic device on server
        ctx.store.dispatch(device.actions.ssr(ctx.req.headers['user-agent']));
      }
    } catch (err) {
      console.error(err);
    }
    return {};
  }

  componentDidMount() {
    GA.init();
    GA.logPageView();
    GA.viewedPage();
    this.linkedInTracker();
    reactor.subscribeToCollection('wwA1VyCIcWOIJnpZhaR4', this.props.updateCrew, { preLoad: ['pic', 'picMobile', 'icon'] });
    reactor.subscribeToCollection('oDTLBA1YbbmT6kchgGEc', this.props.setCoupons);
    reactor.subscribeToPage('Wm27z1OYTccUlUlkSMBS', this.props.updateHomePage);
  }

  linkedInTracker() {
    const partnerId = '2075473';
    const conversionId = '2075473';
    LinkedInTag.init(partnerId);
    LinkedInTag.track(conversionId);
  }

  render() {
    const { Component, pageProps, store, homeData } = this.props;
    return (
      <Provider store={store} >
        <Helmet title={homeData ? homeData.get('tabTitle') : undefined} description={homeData ? homeData.get('metaDescription') : undefined} imageForSocial="/images/delta-logo-social-square.png" />
        <div className={styles.app} >
          <NavBar />
          <Component {...pageProps} />
          <SectionIndicator />
          <Coupon />
        </div >
      </Provider >
    );
  }
}

const mapStateToProps = state => ({
  homeData: home.selectors.data(state),
});

const mapDispatchToProps = dispatch => ({
  setCoupons: data => dispatch(coupon.actions.setCoupons(data)),
  updateHomePage: data => dispatch(home.actions.update(data)),
  updateCrew: data => dispatch(crew.actions.update(data))
});

export default compose(
  withRedux(makeStore, {
    serializeState: state => state.toJS(),
    deserializeState: state => fromJS(state)
  }),
  connect(mapStateToProps, mapDispatchToProps),
  device.HOC
)(MyApp);

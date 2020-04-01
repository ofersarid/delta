import React from 'react';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import { fromJS } from 'immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reactor from 'reactor-connect';
import combined from '../combined-reducers';
import { device, GA, CursorComp } from '../services';
import { Helmet } from '../shared';
import reactorConfig from '../reactor.config';
import { NavBar } from '../containers';
import styles from './styles.scss';

const makeStore = (initialState, options) => {
  const store = createStore(combined, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
  return store;
};

class MyApp extends App {
  static async getInitialProps({ ctx }) {
    if (reactorConfig.userId) {
      const reactorReady = ctx.store.getState().getIn(['reactor', 'ready']);
      if (!reactorReady) {
        await ctx.store.dispatch(reactor.actions.fetch(reactorConfig.userId));
        if (ctx.req) {
          // mimic device on server
          ctx.store.dispatch(device.actions.ssr(ctx.req.headers['user-agent']));
        }
      }
      return {};
    }
    return {};
  }

  componentDidMount() {
    GA.init();
    GA.logPageView();
  }

  render() {
    const { Component, pageProps, store, isServer } = this.props;
    return (
      <Provider store={store} >
        <Helmet title="Delta Front Team" description="Hire an elite front team on-demand" />
        <div className={styles.app} id="top" >
          <NavBar />
          <Component {...pageProps} isServer={isServer} />
        </div >
        <CursorComp />
      </Provider >
    );
  }
}

export default compose(
  withRedux(makeStore, {
    serializeState: state => state.toJS(),
    deserializeState: state => fromJS(state)
  }),
  device.HOC
)(MyApp);

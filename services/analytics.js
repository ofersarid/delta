import ReactGA from 'react-ga';

const isDev = () => {
  return Boolean(window.location.host.match(/^localhost/));
};

const init = () => {
  console.log('GA init');
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  ReactGA.initialize('UA-150924142-2', {
    debug: true,
    titleCase: false,
    gaOptions: {
      userId: id
    }
  });
};

const logPageView = () => {
  console.log(`Logging pageview for ${window.location.pathname}`);
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

//
// const logEvent = (category = '', action = '', ) => {
//   if (category && action) {
//     ReactGA.event({
//       category,
//       action
//     });
//   }
// };

const viewedPage = (viewer) => {
  if (viewer) {
    console.log(`Logging viewer: ${viewer}`);
    ReactGA.event({
      category: isDev() ? 'test' : 'investor',
      action: 'viewed page',
    });
  }
};

const contactUs = (viewer) => {
  if (viewer) {
    console.log(`Logging contact us by: ${viewer}`);
    ReactGA.event({
      category: isDev() ? 'test' : 'investor',
      action: 'clicked contact us',
    });
  }
};

const send = (viewer) => {
  if (viewer) {
    console.log(`Logging send by: ${viewer}`);
    ReactGA.event({
      category: isDev() ? 'test' : 'investor',
      action: 'clicked on send',
    });
  }
};

// const logException = (description = '', fatal = false) => {
//   if (description) {
//     ReactGA.exception({
//       description,
//       fatal
//     });
//   }
// };

export default {
  init,
  viewedPage,
  contactUs,
  send,
  logPageView,
};

# React-redux-reactor-nextjs
A boilerplate for building a **server-side-rendered** website with React, Redux, Reactor &amp; Next.js
<br/><br/>

## About the tech
We are using the [Next.js](https://nextjs.org/) platform for developing our website.<br/>
Please refer to there [Docs](https://nextjs.org/docs/getting-started) for a complete comperhention about the usage of this plaform.<br/>
Also you will have to learn how to use [React](https://reactjs.org/)/[React-Redux](https://react-redux.js.org/)/[SASS](https://sass-lang.com/) & [CSS-modules](https://github.com/css-modules/css-modules)
<br/><br/>

## Before you start
let's install some dev tools.
1. [Redux Devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
2. [Immutable JS formmater](https://chrome.google.com/webstore/detail/immutablejs-object-format/hgldghadipiblonfkkicmgcbbijnpeog)
3. [React Devtools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
<br/><br/>

## Steps
1. Fork
2. Clone your your forked project:  `git clone: {your forked project's url} `
3. Install dependencies `yarn`
4.  Run dev: `npm run dev`
5. Open your browser at `localhost:3000`
<br/><br/>

## Connecting to the Reactor CMS
Go to the `reactor.config` file and change the `userId` to the ID string that was provided to you by Reactor.
```$xslt
module.exports = {
  userId: 'your_reactor_id',
};
```
Now, access the data via the provided selectors like so:
```$xslt
// index.js

import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import reactor from 'reactor-connect';

const HomePage = () => {
  const data = useSelector(state => reactor.selectors.collection(state, 'my collection'));
  console.log(data);
  return (
    <Fragment >
      <h1 >Hello World!</h1 >
      <ul >
        {data.map(itm => (
          <li key={itm.id} >{itm['my-key']}</li >
        ))}
      </ul >
    </Fragment >
  );
};

export default HomePage;
```
<br/><br/>

## In the box
### Some utility components (located in the `shared`  folder)
1. `<Helmet />` - for changing the tab title and description of each page (you can set the defaults inside the file, just update the `defaultProps` section)

### Some utility services (located in the `services`  folder)
1. `device` - This service will automatically maintain the state of the device even if the window will be resized by the user. It is hooked the the Redux store and can be accessed via `device.selectors.type`  and `device.selectors.oreintation`. you must Use the `connect` function provided by `react-redux` and pass it to the state objects like so:
```
import services from '[path to services folder]';

const MyPage = ({ type, orientation }) => (
	<div>
		Device type: ${type}
		Device orientation: ${orientation}
	</div>
)

const mapStateToProps = state => ({  
	  type: device.selectors.type(state),  
	  orientation: device.selectors.oreintation(state),  
});

export default connect(mapStateToProps)(MyPage);
```

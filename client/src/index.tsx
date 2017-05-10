import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Needed for react-mdl with create-react-app
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

import { Grid } from 'react-mdl';
import { Provider } from 'react-redux';
import { store } from './store';

import { MenuBar } from './components';

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <Grid>
      <MenuBar />
    </Grid>
  </Provider>,
  document.getElementById('root')
);

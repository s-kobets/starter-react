import React from 'react';
import { Provider } from 'react-redux';

import Content from '../components/Content'
import Menu from '../components/Menu'
import store from '../store'
import '../css/app.css';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store} >
        <div>
          <Menu />
          <Content />
        </div>
      </Provider>
    );
  }
}

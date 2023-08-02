import { render } from '@folio/jest-config-stripes/testing-library/react';

import { reducer as formReducer } from 'redux-form';
import {
  createStore,
  combineReducers,
} from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Tags from './index';

jest.unmock('@folio/stripes/smart-components');

jest.mock('@folio/stripes/smart-components', () => ({
  ...jest.requireActual('@folio/stripes/smart-components'),
  Settings: jest.fn(() => 'Settings'),
}));

const store = createStore(combineReducers({ form: formReducer }));
const history = createMemoryHistory();

const renderTags = (props = {}) => render(
  <Provider store={store}>
    <Router history={history}>
      <Tags
        {...props}
      />
    </Router>
  </Provider>
);

describe('Tags', () => {
  it('should render component', () =>{
    const { getByText } = renderTags({});

    expect(getByText('Settings')).toBeDefined();
  });
});

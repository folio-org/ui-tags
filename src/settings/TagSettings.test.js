import { render } from '@folio/jest-config-stripes/testing-library/react';
import { reducer as formReducer } from 'redux-form';
import {
  createStore,
  combineReducers,
} from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import TagSettings from './TagSettings';

const store = createStore(combineReducers({ form: formReducer }));
const history = createMemoryHistory();

const renderTagSettings = (props = {}) => render(
  <Provider store={store}>
    <Router history={history}>
      <TagSettings
        label="Tags label"
        {...props}
      />
    </Router>
  </Provider>
);

describe('Tag Settings', () => {
  it('should render ConfigManager component ', () => {
    const { getByText } = renderTagSettings();

    expect(getByText('Tags label')).toBeInTheDocument();
  });
});

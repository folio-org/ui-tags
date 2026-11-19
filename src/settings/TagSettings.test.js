import { act } from 'react';

import {
  useOkapiKy,
  useStripes,
} from '@folio/stripes/core';
import { render } from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';

import { reducer as formReducer } from 'redux-form';
import {
  createStore,
  combineReducers,
} from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import TagSettings from './TagSettings';
import buildStripes from '../../test/jest/__mock__/stripesCore.mock';

const store = createStore(combineReducers({ form: formReducer }));
const history = createMemoryHistory();

const mockKy = {
  post: jest.fn(),
  put: jest.fn(),
};

const mockMutator = {
  settings: {
    POST: jest.fn().mockResolvedValue({}),
    PUT: jest.fn().mockResolvedValue({}),
  },
};

const buildMockStripes = (records = []) => {
  const mockStripes = buildStripes({
    connect: (Component) => (props) => {
      const mockResources = {
        settings: {
          hasLoaded: true,
          records,
        },
      };

      return <Component {...props} resources={mockResources} mutator={mockMutator} stripes={mockStripes} />;
    },
    user: {
      perms: {
        'ui-tags.settings.all': true,
      },
    },
  });

  return mockStripes;
};

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

const toggleFlagAndSave = async ({ getByText, getByRole }) => {
  const getCheckbox = () => getByRole('checkbox', { name: 'ui-tags.settings.enableTags' });

  expect(getCheckbox()).toBeChecked();

  await act(async () => userEvent.click(getCheckbox()));
  expect(getCheckbox()).not.toBeChecked();

  expect(getByText('stripes-core.button.save')).toBeEnabled();
  await act(async () => userEvent.click(getByText('stripes-core.button.save')));
};

describe('Tag Settings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useOkapiKy.mockReturnValue(mockKy);
  });

  it('should render ConfigManager component', () => {
    useStripes.mockReturnValue(buildMockStripes());

    const { getByText } = renderTagSettings();

    expect(getByText('Tags label')).toBeInTheDocument();
  });

  describe('when changing the flag and saving', () => {
    it('should create the setting via the settings API and not call the configurations API', async () => {
      useStripes.mockReturnValue(buildMockStripes());

      await toggleFlagAndSave(renderTagSettings());

      expect(mockMutator.settings.POST).toHaveBeenCalledWith(expect.objectContaining({ value: false }));
      expect(mockKy.post).not.toHaveBeenCalled();
      expect(mockKy.put).not.toHaveBeenCalled();
    });

    it('should update an existing setting via the settings API and not call the configurations API', async () => {
      const existingSettingId = 'existing-setting-id';

      useStripes.mockReturnValue(buildMockStripes([{
        items: [{
          id: existingSettingId,
          value: true,
          scope: 'ui-tags.tags.manage',
          key: 'tags_enabled',
        }],
      }]));

      await toggleFlagAndSave(renderTagSettings());

      expect(mockMutator.settings.PUT).toHaveBeenCalledWith(expect.objectContaining({
        id: existingSettingId,
        value: false,
      }));
      expect(mockKy.post).not.toHaveBeenCalled();
      expect(mockKy.put).not.toHaveBeenCalled();
    });
  });
});

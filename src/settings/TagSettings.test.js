import { act } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

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
  get: jest.fn(),
  post: jest.fn().mockReturnValue({
    json: jest.fn().mockResolvedValue({}),
  }),
  put: jest.fn().mockReturnValue({
    json: jest.fn().mockResolvedValue({}),
  }),
};

const mockGetConfigs = (configs = []) => mockKy.get.mockReturnValue({
  json: jest.fn().mockResolvedValue({ configs, totalRecords: configs.length }),
});

const mockStripes = buildStripes({
  connect: (Component) => (props) => {
    const mockResources = {
      settings: {
        hasLoaded: true,
        records: [],
      },
    };

    const mockMutator = {
      settings: {
        POST: jest.fn().mockResolvedValue({}),
        PUT: jest.fn().mockResolvedValue({}),
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

const queryClient = new QueryClient();

const renderTagSettings = (props = {}) => render(
  <Provider store={store}>
    <Router history={history}>
      <QueryClientProvider client={queryClient}>
        <TagSettings
          label="Tags label"
          {...props}
        />
      </QueryClientProvider>
    </Router>
  </Provider>
);

describe('Tag Settings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetConfigs();
    useOkapiKy.mockReturnValue(mockKy);
    useStripes.mockReturnValue(mockStripes);
  });

  it('should render ConfigManager component ', () => {
    const { getByText } = renderTagSettings();

    expect(getByText('Tags label')).toBeInTheDocument();
  });

  describe('when changing the flag and saving', () => {
    it('should POST to the configurations API when there is no entry there yet', async () => {
      const { getByText, getByRole } = renderTagSettings();

      expect(getByRole('checkbox', { name: 'ui-tags.settings.enableTags' })).toBeChecked();

      await act(async () => userEvent.click(getByRole('checkbox', { name: 'ui-tags.settings.enableTags' })));
      expect(getByRole('checkbox', { name: 'ui-tags.settings.enableTags' })).not.toBeChecked();

      expect(getByText('stripes-core.button.save')).toBeEnabled();
      await act(async () => userEvent.click(getByText('stripes-core.button.save')));

      expect(mockKy.get).toHaveBeenCalledWith('configurations/entries', {
        searchParams: { query: '(module==TAGS and configName==tags_enabled)' },
      });
      expect(mockKy.post).toHaveBeenCalledWith('configurations/entries', {
        json: {
          configName: 'tags_enabled',
          enabled: true,
          module: 'TAGS',
          value: 'false',
        },
      });
      expect(mockKy.put).not.toHaveBeenCalled();
    });

    it('should PUT to the configurations API using the id of its own entry', async () => {
      const existingSettingId = 'existing-setting-id';
      const existingConfigId = 'existing-config-id';

      mockGetConfigs([{
        id: existingConfigId,
        module: 'TAGS',
        configName: 'tags_enabled',
        enabled: true,
        value: 'true',
        metadata: { createdDate: '2026-01-01T00:00:00.000+00:00' },
      }]);

      const mockStripesWithExistingSetting = buildStripes({
        connect: (Component) => (props) => {
          const mockResources = {
            settings: {
              hasLoaded: true,
              records: [{
                items: [{
                  id: existingSettingId,
                  value: true,
                  scope: 'ui-tags.tags.manage',
                  key: 'tags_enabled',
                }],
              }],
            },
          };

          const mockMutator = {
            settings: {
              POST: jest.fn().mockResolvedValue({}),
              PUT: jest.fn().mockResolvedValue({}),
            },
          };

          return <Component {...props} resources={mockResources} mutator={mockMutator} stripes={mockStripesWithExistingSetting} />;
        },
        user: {
          perms: {
            'ui-tags.settings.all': true,
          },
        },
      });

      useStripes.mockReturnValue(mockStripesWithExistingSetting);

      const { getByText, getByRole } = renderTagSettings();

      expect(getByRole('checkbox', { name: 'ui-tags.settings.enableTags' })).toBeChecked();

      await act(async () => userEvent.click(getByRole('checkbox', { name: 'ui-tags.settings.enableTags' })));
      expect(getByRole('checkbox', { name: 'ui-tags.settings.enableTags' })).not.toBeChecked();

      expect(getByText('stripes-core.button.save')).toBeEnabled();
      await act(async () => userEvent.click(getByText('stripes-core.button.save')));

      expect(mockKy.put).toHaveBeenCalledWith(`configurations/entries/${existingConfigId}`, {
        json: {
          id: existingConfigId,
          configName: 'tags_enabled',
          enabled: true,
          module: 'TAGS',
          value: 'false',
        },
      });
      expect(mockKy.post).not.toHaveBeenCalled();
    });
  });
});

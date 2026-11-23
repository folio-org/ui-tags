import { useMutation } from 'react-query';
import { useIntl } from 'react-intl';

import {
  useCallout,
  useOkapiKy,
} from '@folio/stripes/core';

import {
  TAGS_KEY,
} from '../constants';

const MODULE = 'TAGS';
const CONFIGURATIONS_PATH = 'configurations/entries';

/**
 * Custom hook to handle saving tag settings to configurations API for backward compatibility.
 * This will be removed in future releases once all UI modules have migrated to settings API (FOLIO-4343).
 *
 * The entry in mod-configuration is independent from the one in mod-settings (different ids, and it may not
 * exist at all), so it is looked up right before writing and the request method is chosen from the result.
 */
export const useConfigurationSave = () => {
  const ky = useOkapiKy();
  const callout = useCallout();
  const intl = useIntl();

  const mutation = useMutation({
    mutationFn: async (setting) => {
      const { configs } = await ky.get(CONFIGURATIONS_PATH, {
        searchParams: { query: `(module==${MODULE} and configName==${TAGS_KEY})` },
      }).json();
      const existing = { ...configs?.[0] };

      delete existing.metadata;

      // mod-configuration stores values as strings
      const body = {
        ...existing,
        module: MODULE,
        configName: TAGS_KEY,
        value: String(setting.value),
        enabled: true,
      };

      return existing.id
        ? ky.put(`${CONFIGURATIONS_PATH}/${existing.id}`, { json: body })
        : ky.post(CONFIGURATIONS_PATH, { json: body });
    },
    onError: () => {
      callout.sendCallout({
        type: 'error',
        message: intl.formatMessage({ id: 'ui-tags.settings.saveError' }),
      });
    },
  });

  return {
    saveConfiguration: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
};

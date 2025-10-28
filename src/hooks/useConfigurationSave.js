import { useRef } from 'react';
import { useMutation } from 'react-query';
import { useIntl } from 'react-intl';

import {
  useCallout,
  useOkapiKy,
} from '@folio/stripes/core';

import {
  TAGS_KEY,
} from '../constants';

const ACTION = {
  POST: 'post',
  PUT: 'put',
};

const MODULE = 'TAGS';

/**
 * Custom hook to handle saving tag settings to configurations API for backward compatibility.
 * This will be removed in future releases once all UI modules have migrated to settings API (FOLIO-4343).
 */
export const useConfigurationSave = () => {
  const ky = useOkapiKy();
  const callout = useCallout();
  const intl = useIntl();
  const action = useRef(ACTION.POST);

  const mutation = useMutation({
    mutationFn: (setting) => {
      const body = {
        id: setting.id,
        module: MODULE,
        configName: TAGS_KEY,
        value: setting.value,
        enabled: true,
      };

      const endpoint = action.current === ACTION.PUT
        ? `configurations/entries/${setting.id}`
        : 'configurations/entries';

      return ky[action.current](endpoint, { json: body });
    },
    onError: () => {
      callout.sendCallout({
        type: 'error',
        message: intl.formatMessage({ id: 'ui-tags.settings.saveError' }),
      });
    },
  });

  const setAction = (hasId) => {
    action.current = hasId ? ACTION.PUT : ACTION.POST;
  };

  return {
    saveConfiguration: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
    setAction,
  };
};

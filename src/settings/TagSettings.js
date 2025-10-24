import {
  useMemo,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Field } from 'redux-form';

import {
  Checkbox,
  Col,
  Row,
} from '@folio/stripes/components';
import { ConfigManager } from '@folio/stripes/smart-components';
import {
  useOkapiKy,
  useStripes,
} from '@folio/stripes/core';

import {
  TAGS_SCOPE,
  TAGS_KEY,
} from '../constants';

const propTypes = {
  label: PropTypes.string,
};

const TagSettings = ({ label }) => {
  const stripes = useStripes();
  const intl = useIntl();
  const ky = useOkapiKy();
  const ConfigManagerConnected = useMemo(() => stripes.connect(ConfigManager), [stripes]);
  const action = useRef('post');

  const getInitialValues = (settings) => {
    action.current = settings[0]?.id ? 'put' : 'post';

    const value = !settings.length || settings[0].value;
    return { tags_enabled: value };
  };

  // Save the flag in configurations API as well for backward compatibility.
  // This will be removed in future releases once all UI modules have migrated to settings API (FOLIO-4343).
  const handleAfterSave = async (setting) => {
    const body = {
      id: setting.id,
      module: 'TAGS',
      configName: TAGS_KEY,
      value: setting.value,
      enabled: true,
    };

    try {
      const endpoint = action.current === 'put'
        ? `configurations/entries/${setting.id}`
        : 'configurations/entries';

      await ky[action.current](endpoint, { json: body });
    } catch (error) {
      console.error('Error saving configuration', error); // eslint-disable-line no-console
    }
  };

  return (
    <ConfigManagerConnected
      getInitialValues={getInitialValues}
      label={label}
      scope={TAGS_SCOPE}
      configName={TAGS_KEY}
      onAfterSave={handleAfterSave}
    >
      <Row>
        <Col xs={12}>
          <Field
            component={Checkbox}
            type="checkbox"
            id="tags_enabled"
            name="tags_enabled"
            label={intl.formatMessage({ id: 'ui-tags.settings.enableTags' })}
            disabled={!stripes?.user?.perms['ui-tags.settings.all']}
          />
        </Col>
      </Row>
    </ConfigManagerConnected>
  );
};

TagSettings.propTypes = propTypes;

export default TagSettings;

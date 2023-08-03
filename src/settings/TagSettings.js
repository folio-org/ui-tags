import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Field } from 'redux-form';

import {
  Checkbox,
  Col,
  Row,
} from '@folio/stripes/components';
import { ConfigManager } from '@folio/stripes/smart-components';
import { useStripes } from '@folio/stripes/core';

const propTypes = {
  label: PropTypes.string,
};

const TagSettings = ({ label }) => {
  const stripes = useStripes();
  const intl = useIntl();
  const ConfigManagerConnected = useMemo(() => stripes.connect(ConfigManager), [stripes]);

  const getInitialValues = (settings) => {
    const value = !settings.length || settings[0].value === 'true';
    return { tags_enabled: value };
  };

  return (
    <ConfigManagerConnected
      getInitialValues={getInitialValues}
      label={label}
      moduleName="TAGS"
      configName="tags_enabled"
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

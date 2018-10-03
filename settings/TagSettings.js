import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Checkbox, Col, Row } from '@folio/stripes/components';
import { ConfigManager } from '@folio/stripes/smart-components';

class TagSettings extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
      intl: PropTypes.object.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.configManager = props.stripes.connect(ConfigManager);
  }

  // eslint-disable-next-line class-methods-use-this
  getInitialValues(settings) {
    const value = settings.length && settings[0].value === 'true';
    return { tags_enabled: value };
  }

  render() {
    return (
      <this.configManager
        getInitialValues={this.getInitialValues}
        label={this.props.label}
        moduleName="TAGS"
        configName="tags_enabled"
      >
        <Row>
          <Col xs={12}>
            <Field
              component={Checkbox}
              id="tags_enabled"
              name="tags_enabled"
              label={this.props.stripes.intl.formatMessage({ id: 'ui-tags.settings.enableTags' })}
            />
          </Col>
        </Row>
      </this.configManager>
    );
  }
}

export default TagSettings;

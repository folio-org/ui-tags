import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import { Checkbox, Col, Row } from '@folio/stripes/components';
import { ConfigManager } from '@folio/stripes/smart-components';
// import '../test/jest/__mock__';

class TagSettings extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.configManager = props.stripes.connect(ConfigManager);
  }

  // eslint-disable-next-line class-methods-use-this
  getInitialValues(settings) {
    const value = !settings.length || settings[0].value === 'true';
    return { tags_enabled: value };
  }

  render() {
    console.log('config manager ', this.configManager);
    console.log('Row ', Row);
    console.log('FormattedMessage ', FormattedMessage);
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
              type="checkbox"
              id="tags_enabled"
              name="tags_enabled"
              label={<FormattedMessage id="ui-tags.settings.enableTags" />}
            />
          </Col>
        </Row>
      </this.configManager>
    );
  }
}

export default TagSettings;

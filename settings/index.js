import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Settings } from '@folio/stripes/smart-components';

import TagSettings from './TagSettings';

export default class Tags extends React.Component {
  constructor(props) {
    super(props);

    this.pages = [
      {
        route: 'general',
        label: <FormattedMessage id="ui-tags.settings.general.label" />,
        component: TagSettings,
      }
    ];
  }

  render() {
    return (
      <Settings
        {...this.props}
        pages={this.pages}
        paneTitle={<FormattedMessage id="ui-tags.settings.index.paneTitle" />}
      />
    );
  }
}

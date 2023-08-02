import React, { createRef } from 'react';
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

  // eslint-disable-next-line react/sort-comp
  paneTitleRef = createRef();

  componentDidMount() {
    if (this.paneTitleRef.current) {
      this.paneTitleRef.current.focus();
    }
  }

  render() {
    return (
      <Settings
        {...this.props}
        paneTitleRef={this.paneTitleRef}
        pages={this.pages}
        paneTitle={<FormattedMessage id="ui-tags.settings.index.paneTitle" />}
      />
    );
  }
}

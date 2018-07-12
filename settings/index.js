import React from 'react';
import Settings from '@folio/stripes-components/lib/Settings';
import { stripesShape } from '@folio/stripes-core/src/Stripes';

import TagSettings from './TagSettings';

class Tags extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
  }

  constructor(props) {
    super(props);

    const formatMsg = this.props.stripes.intl.formatMessage;

    this.sections = [
      {
        label: formatMsg({ id: 'ui-tags.settings.general.label' }),
        pages: [
          {
            route: 'tags',
            label: formatMsg({ id: 'ui-tags.settings.tags.label' }),
            component: TagSettings,
          },
        ],
      },
    ];
  }

  render() {
    return (
      <Settings
        {...this.props}
        pages={this.pages}
        paneTitle={this.props.stripes.intl.formatMessage({ id: 'ui-tags.settings.index.paneTitle' })}
      />
    );
  }
}

export default Tags;

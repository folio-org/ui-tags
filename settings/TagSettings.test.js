import React from 'react';
import { render } from '@testing-library/react';
import {
  screen,
} from '@testing-library/dom';
import { noop } from 'lodash';
import { Form } from 'react-final-form';
import '../test/jest/__mock__';

import { ConfigManager } from '@folio/stripes/smart-components';

import TagSettings from './TagSettings';

const mockedStripes = {
  connect: jest.fn(component => component),
};

const renderTagSettings = () => (
  render(
    <Form
      onSubmit={noop}
      render={() => (
        <TagSettings
          label="tags"
          stripes={mockedStripes}
        />
      )}
    />
  )
);

describe('Tag Settings', () => {
  afterEach(() => {
    ConfigManager.mockClear();
  });

  it('render tag settings', () => {
    renderTagSettings();

    expect(ConfigManager).toHaveBeenCalledWith(expect.objectContaining({
      label: 'tags',
      moduleName: 'TAGS',
      configName: 'tags_enabled',
    }), {});

    expect(screen.getByText('tags')).toBeDefined();
  });
});

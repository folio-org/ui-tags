import React from 'react';
import { render } from '@testing-library/react';
import {
  screen,
} from '@testing-library/dom';
import { Field } from 'redux-form';
import '../test/jest/__mock__';

// import { ConfigManager } from '@folio/stripes/smart-components';

import TagSettings from './TagSettings';

jest.mock('redux-form', () => ({
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  Field: jest.fn(({ ...rest }) => <input {...rest} />),
}));

const mockedStripes = {
  connect: jest.fn(component => component),
};


describe('Tag Settings', () => {
  // afterEach(() => {
  //   ConfigManager.mockClear();
  //   Field.mockClear();
  // });

  it.only('renders ConfigManager component ', () => {
    const { getByText } = render(<TagSettings
      label="tags"
      stripes={mockedStripes}
    />);
    expect(getByText('ConfigManager')).toBeInTheDocument();
  });

  // it('render tag settings', () => {
  //   render(<TagSettings
  //     label="tags"
  //     stripes={mockedStripes}
  //   />);

  //   expect(ConfigManager).toHaveBeenCalledWith(expect.objectContaining({
  //     label: 'tags',
  //     moduleName: 'TAGS',
  //     configName: 'tags_enabled',
  //   }), {});

  //   // expect(screen.getByText('tags_enabled')).toBeDefined();
  //   expect(screen.getByRole('input', { name: 'tags_enabled' })).toBeDefined();
  // });
});

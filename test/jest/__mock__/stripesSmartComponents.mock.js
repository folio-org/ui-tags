import React from 'react';

jest.mock('@folio/stripes/smart-components', () => ({
  AddressEdit: jest.fn(() => null),
  ConfigManager: jest.fn(({ children, ...rest }) => <div {...rest}>{children}</div>), // jest.fn(({ children }) => <div>{children}</div>),
  Settings: jest.fn(({
    pages,
    paneTitle,
  }) => (
    <>
      <span>
        {paneTitle}
      </span>
      <span>
        {pages[0].route}
      </span>
      <span>
        {pages[0].label}
      </span>
    </>
  )),
}), { virtual: true });

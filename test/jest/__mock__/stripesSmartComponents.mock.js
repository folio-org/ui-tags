import React from 'react';

jest.mock('@folio/stripes/smart-components', () => ({
  ...jest.requireActual('@folio/stripes/smart-components'),
  AddressEdit: jest.fn(() => <div>AddressEdit</div>),
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
  // ChangeDueDateDialog: jest.fn(() => <div data-testid="change-duedate-dialog">ChangeDueDateDialog</div>),
  // DueDatePicker: () => <div data-testid="due-date-picker">DueDatePicker</div>,
}));

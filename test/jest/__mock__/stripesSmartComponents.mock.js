jest.mock('@folio/stripes/smart-components', () => ({
  ...jest.requireActual('@folio/stripes/smart-components'),
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
}));

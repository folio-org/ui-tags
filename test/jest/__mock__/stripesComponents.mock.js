jest.mock('@folio/stripes/components', () => ({
  ...jest.requireActual('@folio/stripes/components'),
  Icon: jest.fn((props) => (props && props.children ? props.children : <span />)),
  icons: {},
}));

jest.mock('@folio/stripes-components/util/currencies', () => {
  return {};
});

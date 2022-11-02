
jest.mock('@folio/stripes/components', () => ({
  ...jest.requireActual('@folio/stripes/components'),
  AutoSuggest: jest.fn(() => ({ input }) => <input {...input} />),
  Badge: jest.fn((props) => (
    <span>
      <span>{props.children}</span>
    </span>
  )),
  Checkbox: jest.fn((props) => (
    <label htmlFor="id">
      {props.label}
      <input id="id" type="checkbox" {...props} />
    </label>
  )),
  Col: jest.fn(({ children, ...rest }) => <div {...rest}>{children}</div>),
  Icon: jest.fn((props) => (props && props.children ? props.children : <span />)),
  icons: {},
  Label: jest.fn(({ children, ...rest }) => (
    <span {...rest}>{children}</span>
  )),
  Row: jest.fn(({ children, ...rest }) => <div {...rest}>{children}</div>),
}));

jest.mock('@folio/stripes-components/util/currencies', () => {
  return {};
});

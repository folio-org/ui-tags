
jest.mock('@folio/stripes/components', () => ({
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
  Row: jest.fn(({ children, ...rest }) => <div {...rest}>{children}</div>),
}));


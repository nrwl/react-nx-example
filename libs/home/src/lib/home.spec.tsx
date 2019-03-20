import * as React from 'react';
import { render, cleanup } from 'react-testing-library';

import { Home } from './home';

describe('Home', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { getByText } = render(<Home />);
    expect(getByText('home works!')).toBeTruthy();
  });
});

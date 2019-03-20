import * as React from 'react';
import { render, cleanup } from 'react-testing-library';

import { Gifs } from './gifs';

describe('Gifs', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { getByText } = render(<Gifs />);
    expect(getByText('gifs works!')).toBeTruthy();
  });
});

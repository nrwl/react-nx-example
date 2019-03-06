import * as React from 'react';
import { render, cleanup } from 'react-testing-library';

import { Home } from './home';

describe('Home', () => {
  afterEach(cleanup);

  test('Rendering', async () => {
    const { container } = render(<Home/>);
    expect(container.innerHTML).toMatch(/It works!/);
  });
});

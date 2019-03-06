import * as React from 'react';
import { render, cleanup } from 'react-testing-library';

import { Gifs } from './gifs';

describe('Gifs', () => {
  afterEach(cleanup);

  test('Rendering', async () => {
    const { container } = render(<Gifs/>);
    expect(container.innerHTML).toMatch(/It works!/);
  });
});

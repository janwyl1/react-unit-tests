import { describe, expect, it } from 'vitest';

import { render, screen, userEvent } from '../../test-utils';
import Counter from './Counter';

describe('Counter basic example', () => {
  it('Increments counter when button is clicked', async () => {
    render(<Counter />);
    expect(
      screen.getByRole('button', {
        name: 'count is: 1',
      })
    );

    userEvent.click(screen.getByRole('button'));

    expect(
      await screen.findByRole('button', {
        name: 'count is: 1',
      })
    );
  });
});

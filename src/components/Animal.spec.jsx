import { describe, expect, it } from 'vitest';

import { render, screen, userEvent, waitFor } from '../../test-utils';
import Animal from './Animal';

describe('Animal useEffect example', () => {
  it('Animal details are visible when component first renders', async () => {
    render(
      <Animal apiUrl="https://zoo-animal-api.herokuapp.com/animals/rand" />
    );
    const name = await screen.findByText('Masai Giraffe');
    const latinName = await screen.findByText(
      /latin name: giraffa camelopardalis tippelskirchi/i
    ); // can pass a regex instead of a string to ignore case
    const type = await screen.findByText('Mammal');
    const habitat = await screen.findByText('Habitat: Savanna and woodland');
    const weight = await screen.findByText('Weight: 1200lbs - 4250lbs');
    const lifespan = await screen.findByText('Lifespan: 13 years');
    const animalImage = await screen.findByAltText(
      'a cute looking Masai Giraffe'
    );

    expect(name).toBeVisible();
    expect(latinName).toBeVisible();
    expect(type).toBeVisible();
    expect(habitat).toBeVisible();
    expect(weight).toBeVisible();
    expect(lifespan).toBeVisible();
    expect(animalImage).toBeVisible();
  });

  it('Error message displayed if no data is returned', async () => {
    render(<Animal apiUrl="https://zoo-animal-api.herokuapp.com/invalid" />);
    expect(
      await screen.findByText('Sorry there was a problem fetching the data')
    ).toBeVisible();
  });

  it('Loading message appears while data is being fetched', async () => {
    render(
      <Animal apiUrl="https://zoo-animal-api.herokuapp.com/animals/rand" />
    );
    const LoadingTxt = screen.getByText('Loading...');
    expect(LoadingTxt).toBeVisible();
  });

  it('Loading message disappears when data has been fetched', async () => {
    render(
      <Animal apiUrl="https://zoo-animal-api.herokuapp.com/animals/rand" />
    );
    const LoadingTxt = screen.getByText('Loading...');
    await waitFor(() => expect(LoadingTxt).not.toBeVisible());
    expect(screen.getByRole('button', { name: 'Exterminate' })).toBeVisible();
  });

  it('Deletes the animal when exterminate button is pressed', async () => {
    render(
      <Animal apiUrl="https://zoo-animal-api.herokuapp.com/animals/rand" />
    );
    const exterminateBtn = await screen.findByRole('button', {
      name: 'Exterminate',
    });
    userEvent.click(exterminateBtn);
    expect(await screen.findByText('😭 You monster! Fetch a new animal?'));
    expect(await screen.findByRole('button', { name: 'New Animal' }));
  });
});

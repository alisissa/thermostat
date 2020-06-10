import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import Thermostat from './Thermostat';

describe('<Thermostat />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<Thermostat />);
    const thermostat = getByTestId('Thermostat');

    expect(thermostat).toBeInTheDocument();
  });
});

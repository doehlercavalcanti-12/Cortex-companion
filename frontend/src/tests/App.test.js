import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../../App';

describe('App', () => {
  it('renders the home screen title', () => {
    const { getByText } = render(<App />);
    expect(getByText('Cortex Companion')).toBeTruthy();
  });
});

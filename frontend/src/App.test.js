import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Has Omni-Life Header', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText('Omni-Life');
  expect(linkElement).toBeInTheDocument();
});

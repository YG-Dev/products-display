import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

test('renders initial app', async () => {
  const user = userEvent;

  render(<App />);
  const inputElement = screen.getByLabelText(/product ID/i);
  expect(inputElement).toBeInTheDocument();

  user.type(inputElement, '22');
  expect(inputElement).toHaveValue(22); // Numeric value

  const returnedContent = screen.getByRole('alert'); // Displays alert message
  expect(returnedContent).toBeInTheDocument();
});

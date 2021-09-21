import { render, screen } from '@testing-library/react';
import App from './App';
import axios from 'axios';

const mockData = [
  { username: 'Laurie', email: 'lauriedlevy@gmail.com' }, 
  { username: 'Ella', email: 'ellarose@gmail.com' },
  { username: 'Mum', email: 'sandy@yahoo.com' },
  { username: 'Andy Levy', email: 'andylevy@gmail.com' },
  { username: 'Dad', email: 'aimelevy@gmail.com' }
];

test('should render App elements', async () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /mern app/i})
  expect(heading).toBeInTheDocument();

  await(() => {
    jest.spyOn(axios, 'get').mockResponseValue(mockData);
  });

});

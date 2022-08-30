import React from 'react';
import {
  BrowserRouter,
} from "react-router-dom";
import { render, screen } from '@testing-library/react';
import '@app/index.css';
import App from './App';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from '@plugins/QueryClient';
import {
  RecoilRoot,
} from 'recoil';

test('renders learn react link', () => {
  render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>
          <App />
          <ReactQueryDevtools initialIsOpen />
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>
  );

  const linkElement = screen.getByText(/Redeemer Pace/i);
  
  expect(linkElement).toBeInTheDocument();
});

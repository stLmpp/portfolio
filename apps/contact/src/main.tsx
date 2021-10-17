import { StrictMode } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { App } from './app/app';

declare global {
  interface Window {
    _stlmppDestroyReactApp?(): void;
  }
}

const element = document.getElementById('react-app')!;

render(
  <StrictMode>
    <App />
  </StrictMode>,
  element
);

window._stlmppDestroyReactApp = () => unmountComponentAtNode(element);

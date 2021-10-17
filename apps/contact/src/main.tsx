import { StrictMode } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { App } from './app/app';

declare global {
  interface Window {
    _stlmppDestroyReactApp?(): void;
    _stlmppCreateReactApp?(): void;
  }
}

const getElement = () => document.getElementById('react-app')!;
window._stlmppCreateReactApp = () =>
  render(
    <StrictMode>
      <App />
    </StrictMode>,
    getElement()
  );
window._stlmppDestroyReactApp = () => unmountComponentAtNode(getElement());

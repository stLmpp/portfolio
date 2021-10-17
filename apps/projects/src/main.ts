import App from './App.svelte';

declare global {
  interface Window {
    _stlmppDestroySvelteApp?(): void;
    _stlmppCreateSvelteApp?(): void;
  }
}

window._stlmppCreateSvelteApp = () => {
  const app = new App({
    target: document.getElementById('svelte-app')!,
  });
  window._stlmppDestroySvelteApp = () => app.$destroy();
};

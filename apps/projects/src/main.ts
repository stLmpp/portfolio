import App from './App.svelte';

declare global {
  interface Window {
    _stlmppDestroySvelteApp?(): void;
  }
}

const app = new App({
  target: document.getElementById('svelte-app')!,
  props: {
    name: 'projects',
  },
});

window._stlmppDestroySvelteApp = () => app.$destroy();

export default app;

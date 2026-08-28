import '@testing-library/jest-dom';

// Polyfill navigator.clipboard for test environment
if (!navigator.clipboard) {
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: async () => Promise.resolve(),
    },
    writable: true,
  });
}

// Polyfill HTMLMediaElement methods for jsdom
if (typeof window !== 'undefined') {
  window.HTMLMediaElement.prototype.play = () => Promise.resolve();
  window.HTMLMediaElement.prototype.pause = () => {};
  window.HTMLMediaElement.prototype.load = () => {};
}


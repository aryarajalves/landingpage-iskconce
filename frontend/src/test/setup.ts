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

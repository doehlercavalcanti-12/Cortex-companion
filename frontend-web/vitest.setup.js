import '@testing-library/jest-dom/vitest';

// Ensure vitest fails tests on unhandled promise rejections to catch async security issues
globalThis.addEventListener('unhandledrejection', (event) => {
  event.preventDefault();
  throw event.reason;
});

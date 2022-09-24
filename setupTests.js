import '@testing-library/jest-dom';

// we need to polyfill fetch for our tests as its a browser api and not available in node.js (yet)
import { fetch } from 'cross-fetch';
global.fetch = fetch;

// Init mock service worker to intercept requests
// See: https://vitest.dev/guide/mocking.html#requests
import { server } from './src/mocks/server';
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

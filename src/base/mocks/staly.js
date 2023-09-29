export const stalyInstanceMock = {
  init: jest.fn(),
  trackPageview: jest.fn()
};

export const StalyMock = jest.fn(() => stalyInstanceMock);

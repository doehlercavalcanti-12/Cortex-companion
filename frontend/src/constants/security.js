export const AUTH_PROVIDERS = {
  OAUTH: 'oauth',
  JWT: 'jwt',
};

export const RATE_LIMIT = {
  windowMs: 60 * 1000,
  maxRequests: 30,
};

export const API_SCOPES = Object.freeze([
  'profile:read',
  'profile:write',
  'payments:read',
]);

// Desenvolvimento

export const environment = {
    production: false,
    apiUrl: 'http://localhost:9003',
    tokenWhitelistedDomains: [ new RegExp('localhost:9003') ],
    tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
  };
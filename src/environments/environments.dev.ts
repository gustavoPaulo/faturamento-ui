// Desenvolvimento

export const environment = {
    production: false,
    faturamentoApiUrl: 'http://localhost:9001',
    userApiUrl: 'http://localhost:9002',
    tokenWhitelistedDomains: [ new RegExp('localhost:9001'), new RegExp('localhost:9002') ],
    tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
  };
export const authConfig = {
  jwt: {
    secret_token: process.env.APP_SECRET || 'default',
    expires_in_token: '15m',
    secret_refresh_token: '125c41faf66e2c351bff02def3b22cab',
    expires_in_refresh_token: '30d',
    expires_refresh_token_days: 30,
  },
};

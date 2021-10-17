import { commonEnvironment } from '@stlmpp-portfolio/common';

export const environment = {
  production: true,
  github: commonEnvironment.githubUrl + '/home',
  api: 'http://localhost:3000/api',
};

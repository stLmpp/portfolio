// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

import { commonEnvironment } from '@stlmpp-portfolio/common';

export const environment = {
  production: false,
  githubUrl: commonEnvironment.githubUrl + '/contact',
};

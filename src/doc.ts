import swaggerDoc from 'swagger-jsdoc';
import {url} from './cfg';

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Rest API',
      version: '1.0.0',
    },
    schemes: ['http'],
    servers: [{url}],
  },
  apis: [
    `${__dirname}/type/*.ts`,
    `${__dirname}/route/*.ts`,
    './dist/type/*.js',
    './dist/route/*.js',
  ],
};

export const doc = swaggerDoc(options);

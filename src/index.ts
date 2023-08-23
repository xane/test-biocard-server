import express, {urlencoded, json} from 'express';
//import {urlencoded, json} from 'body-parser';
import swaggerUi from 'swagger-ui-express';

import {port, url} from './cfg';
import {dbinit} from './db';
import {doc} from './doc';

import {RouterList, RouterItem, RouterItemEdit} from './route';

const app = express();

app.use(urlencoded({extended: true}));
app.use(json());
app.use((req, _, next) => {
  console.log(req.method, req.path, req.body);
  next();
});
app.use(RouterList);
app.use(RouterItem);
app.use(RouterItemEdit);
app.use('/doc/', swaggerUi.serve, swaggerUi.setup(doc));

const init = async () => {
  await dbinit();

  app.listen(port, () => {
    console.log('Web:', `${url}/api/`);
    console.log('Doc:', `${url}/doc/`);
  });
};

init();

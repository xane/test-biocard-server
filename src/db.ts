import {connect} from 'mongoose';
import {dburl} from './cfg';

export const dbinit = async () =>
  connect(dburl)
    .then(() => {
      console.log('DB: Connected');
    })
    .catch(e => console.warn('DB: Error', e));

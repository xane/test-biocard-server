import {Schema, Types, model} from 'mongoose';
import {TypeDriver} from '../type';

export const ModelDriver = model(
  'drivers',
  new Schema<TypeDriver>({
    driverId: {type: String, required: true, unique: true, index: true},
    name: String,
    url: String,
    givenName: String,
    familyName: String,
    dateOfBirth: String,
    nationality: String,
  }),
);

import {Request, Response, NextFunction} from 'express';
import {object, string, number, ObjectShape} from 'yup';

const rxUrl =
  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
const rxDate = /^\d{4}-\d{2}-\d{2}$/;

const validName = (label: string) => string().min(2).max(45).label(label);

type TParams = {
  shape: ObjectShape;
  path?: 'query' | 'params' | 'body';
};

interface IRequest extends Request {
  validData?: object;
}

export const validateRequest =
  ({shape, path = 'query'}: TParams) =>
  async (req: IRequest, res: Response, next: NextFunction) => {
    const schema = object().shape(shape);

    try {
      const validData = await schema.validate(req[path]);
      req.validData = validData;
      next();
    } catch (e: any) {
      console.warn('validateRequest()', e);
      res.status(400).json({type: e?.name, message: e?.message});
    }
  };

export const validateQueryPage = validateRequest({
  shape: {
    page: number().nullable().default(0),
  },
});

export const validateQueryID = validateRequest({
  shape: {
    id: string()
      .required()
      .matches(/^[a-z-_]*$/),
  },
  path: 'params',
});

export const validatePostEdit = validateRequest({
  shape: {
    givenName: validName('Given Name').required(),
    familyName: validName('Family Name').required(),
    url: string().matches(rxUrl),
    dateOfBirth: string().matches(rxDate),
    nationality: string().label('Nationality'),
  },
  path: 'body',
});

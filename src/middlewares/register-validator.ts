import { check, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

let paramsCompany: any = [
    check('nit_company').isLength({ min: 9, max: 15 }),
    check('email_company').isEmail(),
    check('name_company').isLength({ min: 1, max: 100 }),
    check('password_company').isLength({ min: 8, max: 40 }),
    check('national_line_company').isLength({ min: 1, max: 20 }),
    check('foundation_company').isLength({ min: 1, max: 40 }),
    check('description_company').isLength({ min: 1, max: 255 }),
];


let paramsProvider: any = [
    check('document_provider').isLength({ min: 7, max: 10 }),
    check('name_provider').isLength({ min: 1, max: 50 }),
    check('last_name_provider').isLength({ min: 1, max: 40 }),
    check('email_provider').isEmail(),
    check('password_provider').isLength({ min: 1, max: 40 }),
    check('nit_company').isLength({ min: 1, max: 15 }),
    check('city_provider').isLength({ min: 1, max: 25 }),
    check('neighborhood').isLength({ min: 1, max: 40 }),
    check('street').isLength({ min: 1, max: 30 }),
    check('number_street').isLength({ min: 1, max: 25 }),
    check('number_provider').isLength({ min: 1, max: 15 }),
];


let paramsGrocer: any = [
    check('document_grocer').isLength({ min: 10, max: 10 }),
    check('name_grocer').isLength({ min: 1, max: 40 }),
    check('last_name_grocer').isLength({ min: 1, max: 40 }),
    check('email_grocer').isEmail(),
    check('name_store').isLength({ min: 1, max: 50 }),
    check('city_grocer').isLength({ min: 1, max: 25 }),
    check('password_grocer').isLength({ min: 8, max: 40 }),
    check('neighborhood').isLength({ min: 4, max: 40 }),
    check('street').isLength({ min: 1, max: 30 }),
    check('number_street').isLength({ min: 1, max: 25 }),
    check('apartment').isLength({ min: 1, max: 25 }),
    check('number_grocer').isLength({ min: 1, max: 15 }),
];



function validatorParams(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}

export default {
    paramsProvider,
    paramsGrocer,
    paramsCompany,
    validatorParams
}
import { check, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express'

let params = (email: string, password: string) => {
    return [
        check(email)
            .isEmail()
            .isLength({ max: 50 }),
        check(password).exists().isLength({ min: 8, max: 100 })
    ]
}

function validatorParams(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

export default {
    params,
    validatorParams
}